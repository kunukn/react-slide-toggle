import React from 'react';
import ReactDOM from 'react-dom';
const SlideToggle = require('library/SlideToggle');

import eases from 'eases'; // example, provide your own easing fn

const log = console.log.bind(console);

export default class App extends React.Component {
  render() {
    return (
      <div className="app">
        <SlideToggle
          duration={'500'}
          render={({ onToggle, setCollapsibleElement }) => (
            <div className="my-collapsible">
              <button className="btn" onClick={onToggle}>
                toggle
              </button>
              <div
                className="my-collapsible-content"
                ref={setCollapsibleElement}
              >
                <div>Collapsible content
                <button className="btn" onClick={onToggle}>toggle</button>
                </div>
              </div>
            </div>
          )}
        />

        <SlideToggle
          collapsed
          duration={'500'}
          render={({ onToggle, setCollapsibleElement }) => (
            <div className="my-collapsible">
              <button className="btn" onClick={onToggle}>
                toggle
              </button>
              <div
                className="my-collapsible-content"
                ref={setCollapsibleElement}
              >
                <div>Collapsible content
                <button className="btn" onClick={onToggle}>toggle</button>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}
