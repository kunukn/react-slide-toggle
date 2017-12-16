import React from 'react';
import PropTypes from 'prop-types';
import eases from 'eases';

const log = console.log.bind(console);
//log(Object.keys(eases));

const TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING',
};

class ReactSlideToggle extends React.Component {
  constructor(props) {
    super(props);

    this._state_ = {
      boxElement: null,
      isAnimating: false,
      toggleState: this.props.toggleState || TOGGLE.EXPANDED,
    };

    this.updateDuration(this.props.duration);
    this.updateEaseFunction(this.props.ease);

    this.state = {
      toggleState: TOGGLE.EXPANDED,
      duration: this._state_.duration,
    };
  }

  setBoxElement = element => {
    this._state_.boxElement = element || null;
    if (element && this._state_.toggleState === TOGGLE.COLLAPSED) {
      this.setCollapsedState();
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
        this._state_.boxElement.style.display = display;
      }
      this._state_.boxHeight = this._state_.boxElement.clientHeight;
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

  updateDuration = duration => {
    this._state_.duration = parseInt(duration, 10) || 0;
  };

  updateEaseFunction = ease => {
    if (typeof ease === 'string') {
      this._state_.ease = eases[ease];
    } else if (typeof ease === 'function') {
      this._state_.ease = ease;
    }
  };

  setCollapsedState = () => {
    this._state_.boxElement.style.display = 'none';
    this._state_.boxElement.style.height = '';
    this._state_.toggleState = TOGGLE.COLLAPSED;
    this._state_.isAnimating = false;
    this.setState({ toggleState: TOGGLE.COLLAPSED });
  };

  collapse = () => {
    if (!this._state_.boxElement) {
      log('no boxElement');
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
      this._state_.boxElement.style.height = `${currentHeightValue}px`;
      this._state_.timeout = this.nextTick(this.collapse);
    } else {
      this.setCollapsedState();
    }
  };

  setExpandedState = () => {
    this._state_.boxElement.style.height = '';
    this._state_.toggleState = TOGGLE.EXPANDED;
    this._state_.isAnimating = false;
    this.setState({ toggleState: TOGGLE.EXPANDED });
  };

  expand = () => {
    if (!this._state_.boxElement) {
      log('no boxElement');
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
      this._state_.boxElement.style.height = `${currentHeightValue}px`;
      this._state_.timeout = this.nextTick(this.expand);
    } else {
      this.setExpandedState();
    }
  };

  nextTick = callback => {
    return setTimeout(callback, 16);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.ease !== this.props.ease) {
      this.updateEaseFunction(nextProps.ease);
    }
    if (nextProps.duration !== this.props.duration) {
      this.updateDuration(nextProps.duration);
      this.setState({ duration: this._state_.duration });
    }
  }

  render() {
    return this.props.render({
      onToggle: this.onToggle,
      setBoxElement: this.setBoxElement,
      state: this.state,
    });
  }

  componentDidMount() {}

  componentDidUpdate() {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }
}

ReactSlideToggle.propTypes = {
  duration: PropTypes.number,
  ease: PropTypes.oneOf(Object.keys(eases)),
  toggleState: PropTypes.oneOf([TOGGLE.COLLAPSED, TOGGLE.EXPANDED]),
};

ReactSlideToggle.defaultProps = {
  duration: 500,
  ease: 'quartInOut',
  toggleState: TOGGLE.EXPANDED,
};

export default ReactSlideToggle;
