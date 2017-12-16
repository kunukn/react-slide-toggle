import React, { Component } from 'react';

class ReactSlideToggle extends Component {
  render() {
    return (
      <div className="react-slide-toggle">
        {this.props.children}
      </div>
    );
  }
}

export default ReactSlideToggle;
