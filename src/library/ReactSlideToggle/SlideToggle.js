/*
  _state_ is used to minimize expensive re-renderings.
  We don't want to update the state for every requestAnimationFrame
  this.state is updated on toggle state change, used easing and duration.
*/

import React from 'react';
//import PropTypes from 'prop-types';

const log = console.log.bind(console);
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
const FUNCTION = 'function';

const cubicInOut = t =>
  t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;

export default class SlideToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    easeIn: cubicInOut,
    easeOut: cubicInOut,
    collapsed: false,
  };

  // static propTypes = {
  //   duration: PropTypes.number,
  //   easeIn: PropTypes.oneOfType([PropTypes.func]),
  //   easeOut: PropTypes.oneOfType([PropTypes.func]),
  //   collapsed: PropTypes.bool,
  // };

  constructor(props) {
    super(props);

    this._state_ = {
      collasibleElement: null,
      isAnimating: false,
      toggleState: this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED,
    };

    const duration = this.setDuration(this.props.duration);
    const { easeInName } = this.setEaseFunction({ easeIn: this.props.easeIn });
    const { easeOutName } = this.setEaseFunction({
      easeOut: this.props.easeOut,
    });

    this.state = {
      toggleState: this._state_.toggleState,
      duration,
      easeInName,
      easeOutName,
    };
  }

  setCollapsibleElement = element => {
    if (!element) {
      warn('no element in setCollapsibleElement');
      return;
    }
    this._state_.collasibleElement = element;
    if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      this.setCollapsedState();
    } else if (this._state_.toggleState === TOGGLE.EXPANDED) {
      this.setExpandedState();
    }
  };

  onToggle = () => {
    const update_State_ = ({ toggleState, display, isReverse }) => {
      this._state_.isAnimating = true;
      this._state_.toggleState = toggleState;
      if (typeof display !== undefined) {
        this._state_.collasibleElement.style.display = display;
      }
      const now = new Date().getTime();
      if (isReverse) {
        const { duration, startAnimationTime } = this._state_;
        const elapsedTime = Math.min(duration, now - startAnimationTime);
        const subtract = Math.max(0, duration - elapsedTime);
        this._state_.startAnimationTime = now - subtract;
      } else {
        this._state_.boxHeight = this._state_.collasibleElement.clientHeight;
        this._state_.startAnimationTime = now;
      }
    };

    if (this._state_.toggleState === TOGGLE.EXPANDED) {
      update_State_({ toggleState: TOGGLE.COLLAPSING });
      this.setState({
        toggleState: TOGGLE.COLLAPSING,
        isAnimating: this._state_.isAnimating,
      });
      this.collapse();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      update_State_({ toggleState: TOGGLE.EXPANDING, display: '' });
      this.setState({
        toggleState: TOGGLE.EXPANDING,
        isAnimating: this._state_.isAnimating,
      });
      this.expand();
    } else if (this._state_.toggleState === TOGGLE.EXPANDING) {
      update_State_({ toggleState: TOGGLE.COLLAPSING, isReverse: true });
      this.setState({
        toggleState: TOGGLE.COLLAPSING,
        isAnimating: this._state_.isAnimating,
      });
      this.collapse();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSING) {
      update_State_({
        toggleState: TOGGLE.EXPANDING,
        display: '',
        isReverse: true,
      });
      this.setState({
        toggleState: TOGGLE.EXPANDING,
        isAnimating: this._state_.isAnimating,
      });
      this.expand();
    }
  };

  setDuration = duration => {
    const durationNumber = parseInt(duration, 10) || 0;
    this._state_.duration = durationNumber;
    return durationNumber;
  };

  getFunctionName(fn) {
    return /function ([^(]*)/.exec(fn + '')[1];
  }

  setEaseFunction = ({ easeIn, easeOut }) => {
    const result = {};
    if (typeof easeIn === FUNCTION) {
      this._state_.easeIn = easeIn;
      result.easeInName = this.getFunctionName(easeIn);
    }
    if (typeof easeOut === FUNCTION) {
      this._state_.easeOut = easeOut;
      result.easeOutName = this.getFunctionName(easeOut);
    }
    return result;
  };

  setCollapsedState = () => {
    this._state_.collasibleElement.style.display = 'none';
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.COLLAPSED;
    this._state_.isAnimating = false;
    this.setState({
      toggleState: TOGGLE.COLLAPSED,
      isAnimating: this._state_.isAnimating,
    });
  };

  collapse = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (this._state_.toggleState !== TOGGLE.COLLAPSING) {
      return;
    }

    const { duration, easeIn, startAnimationTime, boxHeight } = this._state_;
    const now = new Date().getTime();
    const elapsedTime = Math.min(duration, now - startAnimationTime);
    const range = elapsedTime / duration;
    const progress = 1 - easeIn(range);
    const currentHeightValue = Math.round(boxHeight * progress);

    if (elapsedTime < duration) {
      this._state_.collasibleElement.style.height = `${currentHeightValue}px`;
      this._state_.timeout = this.nextTick(this.collapse);
    } else {
      this.setCollapsedState();
    }
  };

  setExpandedState = () => {
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.EXPANDED;
    this._state_.isAnimating = false;
    this.setState({
      toggleState: TOGGLE.EXPANDED,
      isAnimating: this._state_.isAnimating,
    });
  };

  expand = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (this._state_.toggleState !== TOGGLE.EXPANDING) {
      return;
    }

    const { duration, startAnimationTime, easeOut, boxHeight } = this._state_;
    const now = new Date().getTime();
    const elapsedTime = Math.min(duration, now - startAnimationTime);
    const range = elapsedTime / duration;
    const progress = easeOut(range);
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
    if (nextProps.easeIn !== this.props.easeIn) {
      const { easeInName } = this.setEaseFunction({
        easeIn: nextProps.easeIn,
      });
      this.setState({ easeInName });
    }
    if (nextProps.easeOut !== this.props.easeOut) {
      const { easeOutName } = this.setEaseFunction({
        easeOut: nextProps.easeOut,
      });
      this.setState({ easeOutName });
    }
    if (nextProps.duration !== this.props.duration) {
      const duration = this.setDuration(nextProps.duration);
      this.setState({ duration });
    }
  }

  render() {
    return this.props.render({
      onToggle: this.onToggle,
      setCollasibleElement: this.setCollapsibleElement,
      state: this.state,
    });
  }

  componentWillUnmount() {
    cAF(this._state_.timeout);
  }
}
