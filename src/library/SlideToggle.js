/*
  _state_ is internal state for sync and rendering control.
  setState is async and I need sync control because timing is important
  and because I need to control what is to be re-rendered.
*/

import React from "react";
//import PropTypes from 'prop-types';

// Support browser or node env
const root = typeof window !== "undefined" ? window : global;
const rAF = root.requestAnimationFrame
  ? root.requestAnimationFrame.bind(root)
  : callback => root.setTimeout(callback, 16);
const cAF = root.cancelAnimationFrame
  ? root.cancelAnimationFrame.bind(root)
  : root.clearInterval.bind(root);

const TOGGLE = Object.freeze({
  EXPANDED: "EXPANDED",
  COLLAPSED: "COLLAPSED",
  EXPANDING: "EXPANDING",
  COLLAPSING: "COLLAPSING"
});

const easeInOutCubic = t =>
  t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;

const util = {
  isMoving: toggleState =>
    toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING,
  clamp: ({ value, max = 1, min = 0 }) => {
    if (value > max) return max;
    if (value < min) return min;
    return value;
  },
  now: () => Date.now(),
  sanitizeDuration: duration => Math.max(0, parseInt(+duration, 10) || 0),
  interpolate: ({ next, prev }) => {
    /*
      If the diff in the next rAF is big, it can seem jumpy when reversing the toggling
      This is heuristic approach to minimize the diff value by interpolating.
    */
    const diff = Math.abs(next - prev);
    let interpolated = next;
    if (diff > 0.15) {
      /* heuristic value */
      if (next > prev) interpolated -= diff * 0.75;
      /* heuristic value */ else
        interpolated += diff * 0.75; /* heuristic value */
    }
    return interpolated;
  }
};

export default class SlideToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    easeCollapse: easeInOutCubic,
    easeExpand: easeInOutCubic
  };

  // Internal state
  _state_ = {
    collapsibleElement: null,
    toggleState: this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED
  };

  GET_HEIGHT = this.props.offsetHeight ? "offsetHeight" : "scrollHeight";

  // React state
  state = {
    toggleState: this._state_.toggleState,
    hasReversed: false,
    range: this.props.collapsed ? 0 : 1,
    progress: this.props.collapsed ? 0 : 1
  };

  render() {
    const data = {
      onToggle: this.onToggle, // deprecated
      toggle: this.onToggle,
      setCollapsibleElement: this.setCollapsibleElement,
      toggleState: this.state.toggleState,
      hasReversed: this.state.hasReversed,
      isMoving: util.isMoving(this.state.toggleState),
      range: this.state.range,
      progress: this.state.progress
    };

    if (typeof this.props.children === "function")
      return this.props.children(data);
    if (this.props.render) return this.props.render(data);

    return this.props.children;
  }

  getCollapsible = () => this._state_.collapsibleElement;

  updateCollapsible = (attr, value) => {
    if (this.getCollapsible()) {
      this._state_.collapsibleElement.style[attr] = value;
    }
  };

  setCollapsibleElement = element => {
    this._state_.collapsibleElement = element;
    if(this._state_.collapsibleElement){
      this._state_.collapsibleElement.style.overflow = 'hidden';
    }
    if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      this.setCollapsedState({ initialState: true });
    }
  };

  onToggle = () => {
    if (this.props.irreversible && util.isMoving(this._state_.toggleState)) {
      return;
    }

    const invokeCollapsing = () => {
      this.props.onCollapsing &&
        this.props.onCollapsing({
          range: this.state.range,
          progress: this.state.progress,
          hasReversed: this.state.hasReversed
        });

      this.collapse();
    };
    const invokeExpanding = () => {
      this.props.onExpanding &&
        this.props.onExpanding({
          range: this.state.range,
          progress: this.state.progress,
          hasReversed: this.state.hasReversed
        });

      this.expand();
    };

    const updateInternalState = ({ toggleState, display, hasReversed }) => {
      this._state_.toggleState = toggleState;
      this._state_.hasReversed = !!hasReversed;

      if (display !== undefined && !this.props.noDisplayStyle) {
        this.updateCollapsible("display", display);
      }

      const now = util.now();

      if (hasReversed) {
        const { startTime } = this._state_;
        const duration = util.sanitizeDuration(this.props.duration);
        const elapsedTime = Math.min(duration, now - startTime);
        const subtract = Math.max(0, duration - elapsedTime);
        this._state_.startTime = now - subtract;
      } else {
        const collapsible = this.getCollapsible();
        if (collapsible && collapsible.style.height) {
          this.updateCollapsible("height", null);
        }
        this._state_.boxHeight = collapsible ? collapsible[this.GET_HEIGHT] : 0;
        this._state_.startTime = now;
        this._state_.startDirection = toggleState;
      }

      this.setState({
        toggleState: this._state_.toggleState,
        hasReversed: this._state_.hasReversed
      });
    };

    switch (this._state_.toggleState) {
      case TOGGLE.EXPANDED:
        updateInternalState({ toggleState: TOGGLE.COLLAPSING });
        invokeCollapsing();
        break;
      case TOGGLE.COLLAPSED:
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: ""
        });
        invokeExpanding();
        break;
      case TOGGLE.EXPANDING:
        updateInternalState({
          toggleState: TOGGLE.COLLAPSING,
          hasReversed: true
        });
        invokeCollapsing();
        break;
      case TOGGLE.COLLAPSING:
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: "",
          hasReversed: true
        });
        invokeExpanding();
        break;
    }
  };

  setExpandedState = () => {
    this._state_.progress = 1;
    this._state_.toggleState = TOGGLE.EXPANDED;
    this.updateCollapsible("height", null);
    this.setState({
      toggleState: TOGGLE.EXPANDED,
      range: 1,
      progress: this._state_.progress
    });
    if (this.props.onExpanded) {
      this.props.onExpanded({
        hasReversed: this.state.hasReversed
      });
    }
  };

  expand = () => {
    if (this._state_.toggleState !== TOGGLE.EXPANDING) {
      return;
    }

    const duration = util.sanitizeDuration(this.props.duration);
    if (duration <= 0) {
      this.setExpandedState();
      return;
    }

    const { startTime } = this._state_;
    const elapsedTime = Math.min(duration, util.now() - startTime);

    if (elapsedTime >= duration) {
      this.setExpandedState();
    } else {
      const { startDirection, toggleState, boxHeight } = this._state_;
      const range = util.clamp({ value: elapsedTime / duration });

      let progress;
      if (
        this.props.whenReversedUseBackwardEase &&
        startDirection !== toggleState
      ) {
        progress = 1 - this.props.easeCollapse(1 - range);
      } else {
        progress = this.props.easeExpand(range);
      }

      if (!this.props.bestPerformance) {
        this.setState({
          range,
          progress
        });
      }

      if (this.props.interpolateOnReverse && this._state_.hasReversed) {
        progress = util.interpolate({
          next: progress,
          prev: this._state_.progress
        });
      }

      const currentHeightValue = Math.round(boxHeight * progress);
      this._state_.progress = progress;
      this.updateCollapsible("height", `${currentHeightValue}px`);
      this.nextTick(this.expand);
    }
  };

  setCollapsedState = ({ initialState } = {}) => {
    this._state_.progress = 0;
    this._state_.toggleState = TOGGLE.COLLAPSED;

    if (!this.props.noDisplayStyle) {
      this.updateCollapsible("display", "none");
      this.updateCollapsible("height", null);
    } else {
      this.updateCollapsible("height", "0px");
    }

    this.setState({
      toggleState: TOGGLE.COLLAPSED,
      range: 0,
      progress: this._state_.progress
    });
    if (!initialState && this.props.onCollapsed)
      this.props.onCollapsed({
        hasReversed: this.state.hasReversed
      });
  };

  collapse = () => {
    if (this._state_.toggleState !== TOGGLE.COLLAPSING) {
      return;
    }
    const duration = util.sanitizeDuration(this.props.duration);
    if (duration <= 0) {
      this.setCollapsedState();
      return;
    }

    const { startTime } = this._state_;
    const elapsedTime = Math.min(duration, util.now() - startTime);

    if (elapsedTime >= duration) {
      this.setCollapsedState();
    } else {
      const { startDirection, boxHeight, toggleState } = this._state_;
      const range = 1 - util.clamp({ value: elapsedTime / duration });

      const {
        whenReversedUseBackwardEase,
        easeExpand,
        easeCollapse
      } = this.props;

      let progress;
      if (whenReversedUseBackwardEase && startDirection !== toggleState) {
        progress = easeExpand(range);
      } else {
        progress = 1 - easeCollapse(1 - range);
      }

      if (!this.props.bestPerformance) {
        this.setState({
          range,
          progress
        });
      }

      if (this.props.interpolateOnReverse && this._state_.hasReversed) {
        progress = util.interpolate({
          next: progress,
          prev: this._state_.progress
        });
      }

      const currentHeightValue = Math.round(boxHeight * progress);
      this._state_.progress = progress;
      this._state_.timeout = this.nextTick(this.collapse);
      this.updateCollapsible("height", `${currentHeightValue}px`);
    }
  };

  nextTick = callback => {
    this._state_.timeout = rAF(callback);
  };

  componentDidMount() {
    this.props.onMount &&
      this.props.onMount({
        toggleState: this.state.toggleState,
        toggle: this.onToggle
      });
  }

  componentWillUnmount() {
    this.props.onUnmount &&
      this.props.onUnmount({
        toggleState: this.state.toggleState
      });
    this._state_.timeout && cAF(this._state_.timeout);
  }
}

// SlideToggle.propTypes = {
//   render: PropTypes.func,
//     children: PropTypes.func,
//     duration: PropTypes.number,
//     irreversible: PropTypes.bool,
//     whenReversedUseBackwardEase: PropTypes.bool,
//     noDisplayStyle: PropTypes.bool,
//     bestPerformance: PropTypes.bool,
//     interpolateOnReverse: PropTypes.bool,
//     easeCollapse: PropTypes.func,
//     easeExpand: PropTypes.func,
//     collapsed: PropTypes.bool,
//     onExpanded: PropTypes.func,
//     onExpanding: PropTypes.func,
//     onCollapsed: PropTypes.func,
//     onCollapsing: PropTypes.func,
//     scrollHeight: PropTypes.bool,
// }
