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

const cubicInOut = t =>
  t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;

export default class SlideToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    easeIn: cubicInOut,
    easeOut: cubicInOut,
    collapsed: false,
    onExpanded: null,
    onExpanding: null,
    onCollapsed: null,
    onCollapsing: null,
  };

  // static propTypes = {
  //   duration: PropTypes.number,
  //   easeIn: PropTypes.oneOfType([PropTypes.func]),
  //   easeOut: PropTypes.oneOfType([PropTypes.func]),
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
      this.setCollapsedState();
    } else if (this._state_.toggleState === TOGGLE.EXPANDED) {
      this.setExpandedState();
    }
  };

  now() {
    return new Date().getTime();
  }

  onToggle = () => {
    const update_State_ = ({ toggleState, display, isReverse }) => {
      this._state_.toggleState = toggleState;
      this._state_.isReverse = !!isReverse;

      if (typeof display !== undefined) {
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

  setDuration = duration => {
    this._state_.duration = this.sanitizeDuration(duration);
  };

  sanitizeDuration(duration) {
    return Math.max(parseInt(duration, 10) || 1);
  }

  setCollapsedState = () => {
    this._state_.collasibleElement.style.display = 'none';
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.COLLAPSED;
    this.setState({
      toggleState: TOGGLE.COLLAPSED,
    });
    this.props.onCollapsed && this.props.onCollapsed();
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
    const { easeIn } = this.props;
    const elapsedTime = Math.min(duration, this.now() - startTime);
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
    this.setState({
      toggleState: TOGGLE.EXPANDED,
    });
    this.props.onExpanded && this.props.onExpanded();
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
    const { easeOut } = this.props;
    const elapsedTime = Math.min(duration, this.now() - startTime);
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
    if (nextProps.duration !== this.props.duration) {
      this.setDuration(nextProps.duration);
    }
  }

  componentWillUnmount() {
    cAF(this._state_.timeout);
  }
}
