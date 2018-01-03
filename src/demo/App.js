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
    isReverse,
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
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
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
          <span>isReverse:</span>
          <span>{isReverse + ''}</span>
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

    if (0)
      for (let i = 0; i < 4; i++) {
        const ease = getRandomEase();
        const name = this.fnName(ease);
        components.push(
          <SlideToggle
            key={components.length}
            duration={this.state.duration}
            easeCollapse={ease}
            easeExpand={ease}                        
            collapsed={Math.random() > 0.5 ? true : false}
            render={this.generateMarkup({
              easeCollapseName: name,
              easeExpandName: name,
            })}
          />
        );
      }

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
        <div>{this.state.duration}</div>
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
