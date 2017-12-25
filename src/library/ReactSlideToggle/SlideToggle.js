/*
  _state_ is used to minimize expensive re-renderings.
  We don't want to update the state for every requestAnimationFrame
  this.state is updated on toggle state change, used easing and duration.
*/

import React from 'react';
import eases from 'eases';
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

class SlideToggle extends React.Component {
  static defaultProps = {
    duration: 300,
    ease: 'quartInOut',
    collapsed: false,
  };

  constructor(props) {
    super(props);

    this._state_ = {
      collasibleElement: null,
      isAnimating: false,
      toggleState: this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED,
    };

    this.setDuration(this.props.duration);
    const easeName = this.setEaseFunction(this.props.ease);

    this.state = {
      toggleState: this._state_.toggleState,
      duration: this._state_.duration,
      easeName,
    };
  }

  setCollapsibleElement = element => {
    if (!element) {
      warn('no element in setCollapsibleElement');
    }
    this._state_.collasibleElement = element || null;
    if (element) {
      if (this._state_.toggleState === TOGGLE.COLLAPSED) {
        this.setCollapsedState();
      } else if (this._state_.toggleState === TOGGLE.EXPANDED) {
        this.setExpandedState();
      }
    }
  };

  onToggle = () => {
    if (this._state_.isAnimating) {
      log('working.. please wait - isAnimating true');
      return;
    }

    const updateState = ({ toggleState, display }) => {
      this._state_.isAnimating = true;
      this._state_.toggleState = toggleState;
      if (typeof display !== undefined) {
        this._state_.collasibleElement.style.display = display;
      }
      this._state_.boxHeight = this._state_.collasibleElement.clientHeight;
      this._state_.startAnimationTime = new Date().getTime();
    };

    if (this._state_.toggleState === TOGGLE.EXPANDED) {
      updateState({ toggleState: TOGGLE.COLLAPSING });
      this.setState({ toggleState: TOGGLE.COLLAPSING });
      this.collapse();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      updateState({ toggleState: TOGGLE.EXPANDING, display: '' });
      this.setState({ toggleState: TOGGLE.EXPANDING });
      this.expand();
    } else {
      log('error onToggle');
    }
  };

  setDuration = duration => {
    this._state_.duration = parseInt(duration, 10) || 0;
  };

  setEaseFunction = ease => {
    if (typeof ease === 'string') {
      this._state_.ease = eases[ease];
      return ease;
    } else if (typeof ease === 'function') {
      this._state_.ease = ease;
      return 'custom function';
    }
  };

  setCollapsedState = () => {
    this._state_.collasibleElement.style.display = 'none';
    this._state_.collasibleElement.style.height = '';
    this._state_.toggleState = TOGGLE.COLLAPSED;
    this._state_.isAnimating = false;
    this.setState({ toggleState: TOGGLE.COLLAPSED });
  };

  collapse = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }

    const duration = this._state_.duration;
    const now = new Date().getTime();
    const elapsedTime = Math.min(
      duration,
      now - this._state_.startAnimationTime
    );
    const range = elapsedTime / duration;
    const progress = 1 - this._state_.ease(range);
    const currentHeightValue = Math.round(this._state_.boxHeight * progress);

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
    this.setState({ toggleState: TOGGLE.EXPANDED });
  };

  expand = () => {
    if (!this._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }

    const duration = this._state_.duration;
    const now = new Date().getTime();
    const elapsedTime = Math.min(
      duration,
      now - this._state_.startAnimationTime
    );
    const range = elapsedTime / duration;
    const progress = this._state_.ease(range);
    const currentHeightValue = Math.round(this._state_.boxHeight * progress);

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
    if (nextProps.ease !== this.props.ease) {
      const easeName = this.setEaseFunction(nextProps.ease);
      this.setState({ easeName });
    }
    if (nextProps.duration !== this.props.duration) {
      this.setDuration(nextProps.duration);
      this.setState({ duration: this._state_.duration });
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

// SlideToggle.propTypes = {
//   duration: PropTypes.number,
//   ease: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
//   collapsed: PropTypes.bool,
// };

export default SlideToggle;
