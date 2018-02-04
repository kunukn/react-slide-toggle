import React from 'react';
import ReactDOM from 'react-dom';
//import { SlideToggle } from 'library/ReactSlideToggle';
const { SlideToggle } = require('library/ReactSlideToggle');
//import { SlideToggle } from 'react-slide-toggle';

import eases from 'eases'; // example, provide your own easing fn
import BezierEasing from 'bezier-easing'; // example, provide your own easing fn

const log = console.log.bind(console);

const defaultEase = eases['cubicInOut'];

export default class App extends React.Component {
  state = { duration: 1000 };

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <button
            className="app__button"
            onClick={() => {
              this.setState({ duration: ~~(Math.random() * 800 + 200) });
            }}
          >
            Randomize duration
          </button>
          <span>{this.state.duration}</span>
        </header>
        <SlideToggle
          duration={this.state.duration}
          render={({ onToggle, setCollapsibleElement }) => (
            <div className="my-collapsible-component">
              <button className="btn" onClick={onToggle}>
                toggle
              </button>
              <div
                className="my-collapsible-content"
                ref={setCollapsibleElement}
              >
                <div>Collapsible content</div>
              </div>
            </div>
          )}
        />
      </div>
    );
  }

  getFunctionName(fn) {
    return /function ([^(]*)/.exec(fn + '')[1];
  }

  fnName = fn => this.getFunctionName(fn);
}
