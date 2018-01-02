/*
  _state_ is for minimizing potential expensive re-renderings.
  Don't update the state for every requestAnimationFrame.
*/

import React from 'react';
//import PropTypes from 'prop-types';

//const log = console.log.bind(console);
const warn = console.warn.bind(console);

const rAF = window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : callback => window.setTimeout(callback, 16);
const cAF = window.cancelAnimationFrame
  ? window.cancelAnimationFrame.bind(window)
  : window.clearInterval.bind(window);

const TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING',
};

const easeInOutCubic = t =>
  t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;

export default class SlideToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    easeCollapse: easeInOutCubic,
    easeExpand: easeInOutCubic,
  };

  // static propTypes = {
  //   render: PropTypes.func,
  //   duration: PropTypes.number,
  //   irreversible: PropTypes.bool,
  //   easeCollapse: PropTypes.func,
  //   easeExpand: PropTypes.func,
  //   collapsed: PropTypes.bool,
  //   onExpanded: PropTypes.func,
  //   onExpanding: PropTypes.func,
  //   onCollapsed: PropTypes.func,
  //   onCollapsing: PropTypes.func,
  // };

  constructor(props) {
    super(props);

    this._state_ = {
      collasibleElement: null,
      toggleState: this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED,
      duration: this.sanitizeDuration(this.props.duration),
    };

    this.state = {
      toggleState: this._state_.toggleState,
      isReverse: false,
    };
  }

  render() {
    return this.props.render({
      onToggle: this.onToggle,
      setCollasibleElement: this.setCollapsibleElement,
      toggleState: this.state.toggleState,
      isReverse: this.state.isReverse,
      isMoving: this.isMoving(this.state.toggleState),
    });
  }

  isMoving(toggleState) {
    return (
      toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING
    );
  }

  setCollapsibleElement = element => {
    if (!element) {
      warn('no element in setCollapsibleElement');
      return;
    }
    this._state_.collasibleElement = element;
    if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      this.setCollapsedState({ initialState: true });
    } else if (this._state_.toggleState === TOGGLE.EXPANDED) {
      this.setExpandedState({ initialState: true });
    }
  };

  now() {
    return new Date().getTime();
  }

  onToggle = () => {

    if (this.props.irreversible && this.isMoving(this._state_.toggleState)) {
      return;
    }

    const update_State_ = ({ toggleState, display, isReverse }) => {
      this._state_.toggleState = toggleState;
      this._state_.isReverse = !!isReverse;

      if (display !== undefined) {
        this._state_.collasibleElement.style.display = display;
      }
      const now = this.now();
      if (isReverse) {
        const { duration, startTime } = this._state_;
        const elapsedTime = Math.min(duration, now - startTime);
        const subtract = Math.max(0, duration - elapsedTime);
        this._state_.startTime = now - subtract;
      } else {
        this._state_.boxHeight = this._state_.collasibleElement.clientHeight;
        this._state_.startTime = now;
      }

      this.setState({
        toggleState: this._state_.toggleState,
        isReverse: this._state_.isReverse,
      });
    };

    if (this._state_.toggleState === TOGGLE.EXPANDED) {
      update_State_({ toggleState: TOGGLE.COLLAPSING });
      this.props.onCollapsing && this.props.onCollapsing();
      this.collapse();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      update_State_({ toggleState: TOGGLE.EXPANDING, display: '' });
      this.props.onExpanding && this.props.onExpanding();
      this.expand();
    } else if (this._state_.toggleState === TOGGLE.EXPANDING) {
      update_State_({ toggleState: TOGGLE.COLLAPSING, isReverse: true });
      this.props.onCollapsing && this.props.onCollapsing();
      this.collapse();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSING) {
      update_State_({
        toggleState: TOGGLE.EXPANDING,
        display: '',
        isReverse: true,
      });
      this.props.onExpanding && this.props.onExpanding();
      this.expand();
    }
  };

  sanitizeDuration(duration) {
    return Math.max(parseInt(duration, 10) || 1, 1);
  }

  setCollapsedState = ({ initialState } = {}) => {
    this._state_.collasibleElement.style.display = 'none';
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.COLLAPSED;
    this.setState({
      toggleState: TOGGLE.COLLAPSED,
    });
    !initialState && this.props.onCollapsed && this.props.onCollapsed();
  };

  collapse = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (this._state_.toggleState !== TOGGLE.COLLAPSING) {
      return;
    }

    const { duration, startTime, boxHeight } = this._state_;
    const elapsedTime = Math.min(duration, this.now() - startTime);
    const range = elapsedTime / duration;
    const ease = this.props.easeCollapse;
    const progress = 1 - ease(range);
    const currentHeightValue = Math.round(boxHeight * progress);

    if (elapsedTime < duration) {
      this._state_.collasibleElement.style.height = `${currentHeightValue}px`;
      this._state_.timeout = this.nextTick(this.collapse);
    } else {
      this.setCollapsedState();
    }
  };

  setExpandedState = ({ initialState } = {}) => {
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.EXPANDED;
    this.setState({
      toggleState: TOGGLE.EXPANDED,
    });
    !initialState && this.props.onExpanded && this.props.onExpanded();
  };

  expand = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (this._state_.toggleState !== TOGGLE.EXPANDING) {
      return;
    }

    const { duration, startTime, boxHeight } = this._state_;
    const elapsedTime = Math.min(duration, this.now() - startTime);
    const range = elapsedTime / duration;
    const ease = this.props.easeExpand;
    const progress = ease(range);
    const currentHeightValue = Math.round(boxHeight * progress);

    if (elapsedTime < duration) {
      this._state_.collasibleElement.style.height = `${currentHeightValue}px`;
      this.nextTick(this.expand);
    } else {
      this.setExpandedState();
    }
  };

  nextTick = callback => {
    this._state_.timeout = rAF(callback);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.duration !== this.props.duration) {
      this._state_.duration = this.sanitizeDuration(nextProps.duration);
    }
  }

  componentWillUnmount() {
    cAF(this._state_.timeout);
  }
}
