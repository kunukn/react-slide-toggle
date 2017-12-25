React version of jQuery.slideToggle. JavaScript animation where height is set on every requestAnimationFrame.

## Demo

* yarn
* yarn start

## cdn

https://unpkg.com/react-slide-toggle/

## npm 

https://www.npmjs.com/package/react-slide-toggle


## Provide your own easing functions

Look for examples in the App component

```js
import eases from 'eases';
import BezierEasing from 'bezier-easing';
```

## Usage example

Look in App component for inspiration


```js
import { SlideToggle } from 'ReactSlideToggle';
import BezierEasing from 'bezier-easing';

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);

// Component usage
<SlideToggle
  duration={300}
  easeIn={bezierEaseInOutQuart}
  easeOut={bezierEaseInOutQuart}
  collapsed={false}
  render={({ onToggle, setCollasibleElement, state }) => (
    <div className="slide-toggle">
      <div className="slide-toggle__header">
        <button className="slide-toggle__button" onClick={onToggle}>
          toggle
        </button>
      </div>
      <div className="slide-toggle__box" ref={setCollasibleElement}>
        <div className="slide-toggle__box-inner">
          Lorem Ipsum.
        </div>
      </div>
    </div>
  )}
/>
```
