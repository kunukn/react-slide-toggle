import React from 'react';
import ReactDOM from 'react-dom';
//import { SlideToggle } from 'library/ReactSlideToggle';
const { SlideToggle } = require('library/ReactSlideToggle');
//import { SlideToggle } from 'react-slide-toggle';

import eases from 'eases'; // example, provide your own easing fn
import BezierEasing from 'bezier-easing'; // example, provide your own easing fn

const log = console.log.bind(console);

const easeNames = Object.keys(eases);

const easeInOutQuart = t =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);
const defaultEase = eases['cubicInOut'];

const getRandomEase = () => {
  const index = Math.floor(Math.random() * easeNames.length);
  return eases[easeNames[index]];
};

const ToggleText = () => 'Toggle';

const ProgressBar = ({ progress }) => {
  return (
    <span className="progress-bar">
      <span
        className="progress-bar__inner"
        style={{
          transform: `scaleX(${progress})`,
        }}
      />
    </span>
  );
};

export default class App extends React.Component {
  state = { duration: 1000 };

  generateMarkup = ({
    easeCollapseName,
    easeExpandName,
    easeCollapse,
    easeExpand,
    className = '',
  } = {}) => ({
    onToggle,
    setCollapsibleElement,
    toggleState,
    isMoving,
    hasReversed,
    range,
    progress,
  }) => (
    <div
      className={
        'slide-toggle ' + className + ' ' + (toggleState || '').toLowerCase()
      }
    >
      <div className="slide-toggle__header">
        <button className="slide-toggle__toggle" onClick={onToggle}>
          <ToggleText />
        </button>
        <ProgressBar progress={progress} />
      </div>
      <div className="slide-toggle__box" ref={setCollapsibleElement}>
        <div
          className="slide-toggle__box-inner"
          style={{ opacity: Math.max(0.5, range) }}
        >
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
          <button onClick={onToggle}>
            <ToggleText />
          </button>
        </div>
      </div>

      <div className="state-values">
        <div>
          <span>toggleState:</span>
          <span>{toggleState}</span>
        </div>
        <div>
          <span>range:</span>
          <span>{range.toFixed(2)}</span>
        </div>
        <div>
          <span>progress:</span>
          <span>{progress.toFixed(2)}</span>
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
          interpolateOnReverse
          irreversible
          onCollapsed={() => log('onCollapsed')}
          onCollapsing={() => log('onCollapsing')}
          onExpanding={() => log('onExpanding')}
          onExpanded={() => log('onExpanded')}
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
          interpolateOnReverse
          easeCollapse={eases['quartOut']}
          easeExpand={eases['bounceOut']}
          onExpanded={({ hasReversed }) => {
            if (!hasReversed) {
              const el = ReactDOM.findDOMNode(this).querySelector(
                '.-extra-anim .slide-toggle__box-inner'
              );
              if (el) {
                let anim = document.createElement('div');
                let anim2 = document.createElement('div');
                let anim3 = document.createElement('div');
                let anim4 = document.createElement('div');
                let anim5 = document.createElement('div');
                const bcr = el.getBoundingClientRect();
                anim.className = 'bounce-anim';
                anim2.className = 'bounce-anim';
                anim3.className = 'bounce-anim';
                anim4.className = 'bounce-anim';
                anim5.className = 'bounce-anim';
                anim.style.left = Math.random() * bcr.width + 'px';
                anim2.style.left = Math.random() * bcr.width + 'px';
                anim3.style.left = Math.random() * bcr.width + 'px';
                anim4.style.left = Math.random() * bcr.width + 'px';
                anim5.style.left = Math.random() * bcr.width + 'px';
                el.appendChild(anim);
                el.appendChild(anim2);
                el.appendChild(anim3);
                el.appendChild(anim4);
                el.appendChild(anim5);
                setTimeout(() => {
                  /* cleanup */
                  anim && el.removeChild(anim);
                  anim2 && el.removeChild(anim2);
                  anim3 && el.removeChild(anim3);
                  anim4 && el.removeChild(anim4);
                  anim5 && el.removeChild(anim5);
                }, 1000);
              }
            }
          }}
          collapsed={Math.random() > 0.5 ? true : false}
          render={this.generateMarkup({
            className: '-extra-anim',
            easeCollapseName: 'quartOut',
            easeExpandName: 'bounceOut',
            easeCollapse: eases['quartOut'],
            easeExpand: eases['bounceOut'],
          })}
        />
      );

    1 &&
      components.push(
        <SlideToggle
          key={components.length}
          duration={this.state.duration * 2}
          easeCollapse={eases['expoOut']}
          easeExpand={eases['expoOut']}
          collapsed
          interpolateOnReverse
          render={this.generateMarkup({
            easeCollapseName: 'expoOut interpolate',
            easeExpandName: 'expoOut interpolate',
            easeCollapse: eases['expoOut'],
            easeExpand: eases['expoOut'],
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
            easeCollapse: eases['bounceOut'],
            easeExpand: eases['bounceOut'],
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
            easeCollapse: bezierEaseInOutQuart,
            easeExpand: bezierEaseInOutQuart,
            className: '-header-height',
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
