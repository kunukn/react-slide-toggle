import React from 'react';
import { SlideToggle } from '../library/ReactSlideToggle';

import eases from 'eases'; // example, provide your own easing fn
import BezierEasing from 'bezier-easing'; // example, provide your own easing fn

const log = console.log.bind(console);

const easeNames = Object.keys(eases);

const easeInOutQuart = t =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);

const getRandomEase = () => {
  const index = Math.floor(Math.random() * easeNames.length);
  return eases[easeNames[index]];
};

export default class App extends React.Component {
  state = { duration: 1000 };

  generateMarkup = ({ easeCollapseName, easeExpandName } = {}) => ({
    onToggle,
    setCollasibleElement,
    toggleState,
    isMoving,
    hasReversed,
    boxHeight,
    updateBoxHeight,
  }) => (
    <div className="slide-toggle">
      <div className="slide-toggle__header">
        <button className="slide-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="slide-toggle__box" ref={setCollasibleElement}>
        <div className="slide-toggle__box-inner">
          <p>
            Default easing is cubicInOut. You can reverse the toggle before the
            movement completes. Ease in-out works best when reverse toggling is
            to be used.
          </p>
          <p>
            This should be A11Y friendly, you can test the tabindex by tabbing.
            The collapsed items should be skipped due to usage of display:none
          </p>
          <p>
            JS animation is used for best animation control and possible easing
            configuration. This triggers browser reflows on every
            requestAnimationFrame. If you have a very long page this might not
            be the best option to use.
          </p>
          <button onClick={() => window.alert('test tabindex')}>
            dummy button
          </button>
        </div>
      </div>

      <div className="state-values">
        <div>
          <span>toggleState:</span>
          <span>{toggleState}</span>
        </div>
        <div>
          <span>isMoving:</span>
          <span>{isMoving + ''}</span>
        </div>
        <div>
          <span>easeCollapse:</span>
          <span>{easeCollapseName}</span>
        </div>
        <div>
          <span>easeExpand:</span>
          <span>{easeExpandName}</span>
        </div>
        <div>
          <span>hasReversed:</span>
          <span>{hasReversed + ''}</span>
        </div>
        <div>
          <span>boxHeight:</span>
          <span>{boxHeight + 'px'}</span>
        </div>
      </div>
    </div>
  );

  render() {
    const components = [];

    1 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration}
          collapsed
          onExpanded={() => log('onExpanded')}
          onCollapsed={() => log('onCollapsed')}
          onCollapsing={() => log('onCollapsing')}
          onExpanding={() => log('onExpanding')}
          render={this.generateMarkup({
            easeCollapseName: 'default',
            easeExpandName: 'default',
          })}
        />
      );

    1 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration}
          easeCollapse={eases['easeIn']}
          easeExpand={eases['bounceOut']}
          collapsed={Math.random() > 0.5 ? true : false}
          render={this.generateMarkup({
            easeCollapseName: 'easeIn',
            easeExpandName: 'bounceOut',
          })}
        />
      );

    1 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration * 2}
          easeCollapse={eases['bounceOut']}
          easeExpand={eases['bounceOut']}
          collapsed
          whenReversedUseBackwardEase
          render={this.generateMarkup({
            easeCollapseName: 'bounceOut',
            easeExpandName: 'bounceOut',
          })}
        />
      );

    1 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration}
          easeCollapse={bezierEaseInOutQuart}
          easeExpand={bezierEaseInOutQuart}
          collapsed={Math.random() > 0.5 ? true : false}
          render={this.generateMarkup({
            easeCollapseName: this.fnName(bezierEaseInOutQuart),
            easeExpandName: this.fnName(bezierEaseInOutQuart),
          })}
        />
      );

    if (1)
      for (let i = 0; i < 4; i++) {
        const ease = getRandomEase();
        const name = this.fnName(ease);
        components.push(
          <SlideToggle
            key={components.length}
            collapsed
            whenReversedUseBackwardEase
            duration={this.state.duration}
            easeCollapse={ease}
            easeExpand={ease}
            render={this.generateMarkup({
              easeCollapseName: name,
              easeExpandName: name,
            })}
          />
        );
      }

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
        <div className="ease-names">
          <div>Ease names ({easeNames.length}):</div>
          {easeNames.map((name, index) => <span key={index}>{name} </span>)}
        </div>
        {components}
      </div>
    );
  }

  getFunctionName(fn) {
    return /function ([^(]*)/.exec(fn + '')[1];
  }

  fnName = fn => this.getFunctionName(fn);
}
