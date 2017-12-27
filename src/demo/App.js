import React from 'react';
import { SlideToggle } from '../library/ReactSlideToggle';

import eases from 'eases'; // example, provide your own easing fn
import BezierEasing from 'bezier-easing'; // example, provide your own easing fn

const easeNames = Object.keys(eases);

const easeInOutQuart = t =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);
const easing_077_0_0175_1 = val => bezierEaseInOutQuart(val);

const getRandomEase = () => {
  const index = Math.floor(Math.random() * easeNames.length);
  return eases[easeNames[index]];
};

export default class App extends React.Component {
  state = { duration: 1000 };

  render() {
    const generateMarkup = ({ onToggle, setCollasibleElement, state }) => (
      <div className="slide-toggle">
        <div className="slide-toggle__header">
          <button className="slide-toggle__button" onClick={onToggle}>
            toggle
          </button>
        </div>
        <div className="slide-toggle__box" ref={setCollasibleElement}>
          <div className="slide-toggle__box-inner">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
            <button onClick={() => window.alert('test tabindex')}>
              dummy button
            </button>
          </div>
        </div>
        <pre>
          {(() => {
            return JSON.stringify(state, null, 2);
          })()}
        </pre>
      </div>
    );

    const components = [];

    true && components.push(
      <SlideToggle
        key={components.length}
        duration={this.state.duration}
        easeIn={easeInOutQuart}
        easeOut={easeInOutQuart}
        collapsed={Math.random() > 0.5 ? true : false}
        render={generateMarkup}
      />
    );


    for (let i = 0; i < 4; i++) {
      const ease = getRandomEase();
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration}
          easeIn={ease}
          easeOut={ease}
          collapsed={Math.random() > 0.5 ? true : false}
          render={generateMarkup}
        />
      );
    }

    false && components.push(
      <SlideToggle
        key={components.length}
        duration={this.state.duration}
        easeIn={eases['sineInOut']}
        easeOut={eases['sineInOut']}
        collapsed={Math.random() > 0.5 ? true : false}
        render={generateMarkup}
      />
    );

    true && components.push(
      <SlideToggle
        key={components.length}
        duration={this.state.duration}
        easeIn={easing_077_0_0175_1}
        easeOut={easing_077_0_0175_1}
        collapsed={Math.random() > 0.5 ? true : false}
        render={generateMarkup}
      />
    );

    true && components.push(
      <SlideToggle
        key={components.length}
        duration={this.state.duration}
        easeIn={eases['elasticIn']}
        easeOut={eases['elasticOut']}
        collapsed={Math.random() > 0.5 ? true : false}
        render={generateMarkup}
      />
    );


    components.push(
      <SlideToggle
        key={components.length}
        duration={this.state.duration}
        easeIn={easeInOutQuart}
        easeOut={easeInOutQuart}
        collapsed={Math.random() > 0.5 ? true : false}
        render={generateMarkup}
      />
    );

    return (
      <div className="app">
        <button
          className="app__button"
          onClick={() => {
            this.setState({ duration: ~~(Math.random() * 800 + 200) });
          }}
        >
          Randomize
        </button>
        <div className="ease-names">
          <div>Ease names ({easeNames.length}):</div>
          {easeNames.map((name, index) => <span key={index}>{name} </span>)}
        </div>
        {components}
      </div>
    );
  }
}
