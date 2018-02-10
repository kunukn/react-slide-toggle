import React from 'react'; // eslint-disable-line import/no-extraneous-dependencies

// Support browser or node env
const root = typeof window !== 'undefined' ? window : global;
const rAF = root.requestAnimationFrame
  ? root.requestAnimationFrame.bind(root)
  : callback => root.setTimeout(callback, 16);
// const cAF = root.cancelAnimationFrame
//   ? root.cancelAnimationFrame.bind(root)
//   : root.clearInterval.bind(root);

const TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING',
};
// const GET_HEIGHT = 'offsetHeight';
const TRANSITION_END = 'transitionend';
const AEL = 'addEventListener';
const REL = 'removeEventListener';
const BCR = 'getBoundingClientRect';

const util = {
  isMoving: toggleState =>
    toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING,
  now: () => new Date().getTime(),
};

class SlideToggle extends React.Component {
  static defaultProps = {
    duration: 300,
  };

  constructor(props) {
    super(props);

    this._state_ = {
      collasibleElement: null,
      toggleState: this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED,
    };

    this.state = {
      toggleState: this._state_.toggleState,
    };
  }

  render() {
    const data = {
      onToggle: this.onToggle,
      setCollapsibleElement: this.setCollapsibleElement,
      toggleState: this.state.toggleState,
      isMoving: util.isMoving(this.state.toggleState),
    };

    return this.props.render ? this.props.render(data) : null;
  }

  setCollapsibleElement = element => {
    if (!element) {
      return;
    }
    this._state_.collasibleElement = element;

    if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      this.setCollapsedState({ initialState: true });
    } else if (this._state_.toggleState === TOGGLE.EXPANDED) {
      this.setExpandedState({ initialState: true });
    }
  };

  onToggle = () => {
    
    if(util.isMoving(this._state_.toggleState)){
      return;
    }

    const updateInternalState = ({ toggleState, display }) => {
      this._state_.toggleState = toggleState;

      if (display !== undefined && !this.props.noDisplayStyle) {
        this._state_.collasibleElement.style.display = display;
      }

      this.setState({
        toggleState: this._state_.toggleState,
      });
    };

    if (this._state_.toggleState === TOGGLE.EXPANDED) {
      updateInternalState({ toggleState: TOGGLE.COLLAPSING });
      this.collapse();
    } else if (this._state_.toggleState === TOGGLE.COLLAPSED) {
      updateInternalState({
        toggleState: TOGGLE.EXPANDING,
        display: null,
      });
      this.expand();
    }
  };

  setExpandedState = () => {
    this._state_.toggleState = TOGGLE.EXPANDED;
    this._state_.collasibleElement.style.maxHeight = null;

    this.setState({
      toggleState: TOGGLE.EXPANDED,
    });
  };

  expand = () => {
    if (this._state_.toggleState !== TOGGLE.EXPANDING) {
      return;
    }

    const element = this._state_.collasibleElement;

    const transitionEvent = event => {
      if (event.propertyName === 'max-height') {
        element[REL](TRANSITION_END, transitionEvent);
        this.setExpandedState();
      }
    };
  
    const elTransitionBackup = element.style.transition;
    element.style.transition = 'max-height 0s !important';
  
    rAF(() => {
      /*
        Same level of nested rAF as collapse to synchronize timing of animation.
      */
  
      element.style.maxHeight = null;
      const { height } = element[BCR](); // trigger reflow
      // const height = element.scrollHeight;
  
      element.style.maxHeight = '0px';
  
      element.style.transition = elTransitionBackup;
      element[AEL](TRANSITION_END, transitionEvent);
  
      rAF(() => {
        element.style.maxHeight = `${height}px`;
      });
    });
  };

  setCollapsedState = () => {
    if (!this.props.noDisplayStyle) {
      this._state_.collasibleElement.style.display = 'none';
      this._state_.collasibleElement.style.maxHeight = null;
    }else{
      this._state_.collasibleElement.style.maxHeight = '0px';
    }
    this._state_.toggleState = TOGGLE.COLLAPSED;
    this.setState({
      toggleState: TOGGLE.COLLAPSED,
    });
  };

  collapse = () => {
    if (this._state_.toggleState !== TOGGLE.COLLAPSING) {
      return;
    }
    const element = this._state_.collasibleElement;
    const elTransitionBackup = element.style.transition;
    element.style.transition = 'max-height 0s !important';
  
    const { height } = element[BCR](); // trigger reflow, applies style updates
  
    if (height === 0) {
      this.setCollapsedState();
    }
  
    const transitionEvent = event => {
      if (event.propertyName === 'max-height') {
        element[REL](TRANSITION_END, transitionEvent);
        this.setCollapsedState();
      }
    };
  
    rAF(() => {
      element.style.maxHeight = `${height}px`;
      element.style.transition = elTransitionBackup;
      element[AEL](TRANSITION_END, transitionEvent);
      rAF(() => {
        element.style.maxHeight = '0px';
      });
    });
 };

}

module.exports = SlideToggle;
