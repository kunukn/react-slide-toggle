## about

React version of jQuery.slideToggle. JavaScript animation where height is set on every requestAnimationFrame.
The toggle direction can be reversed during the movement.

[![npm version](https://img.shields.io/npm/v/react-slide-toggle.svg?style=flat-square)](https://www.npmjs.com/package/react-slide-toggle)
[![npm downloads](https://img.shields.io/npm/dm/react-slide-toggle.svg?style=flat-square)](https://www.npmjs.com/package/react-slide-toggle)

If you are looking for a CSS transition based alternative, then use this instead
https://github.com/kunukn/react-collapse

## demo

- https://codepen.io/kunukn/full/wpepGz/ - cdn example
- https://codesandbox.io/s/4x01lklqm7 - npm example

## size

- UMD minified size 6.9Kb (gzipped 2.3Kb)

- UMD ES2015 minified size 5.9Kb (gzipped 1.9Kb)

## setup / local demo

- git clone or download
- npm install
- npm start

## info

Default easing is cubicInOut. You can reverse the toggle before the movement completes. Ease in-out works best visually when reverse toggling is to be used.

This should be A11Y friendly, you can test the tabindex by tabbing. The collapsed items should be skipped due to usage of display:none (inert functionality)

JS animation is used for best animation control and possibility of adding interpolation or using advanged easing configuration which you can't with CSS alone. This triggers browser reflows on every requestAnimationFrame. If you have a very long page this might not be the best option to use.

## usage example

Look in App component for inspiration. Apply the styling as needed.

```js
// Component example, simple - render prop
import SlideToggle from "react-slide-toggle";
// or
const SlideToggle = require("react-slide-toggle");

// Add CSS: .my-collapsible__content { overflow: hidden;}
// Apply optional padding to .my-collapsible__content-inner
<SlideToggle
  render={({ onToggle, setCollapsibleElement }) => (
    <div className="my-collapsible">
      <button className="my-collapsible__toggle" onClick={onToggle}>
        toggle
      </button>
      <div className="my-collapsible__content" ref={setCollapsibleElement}>
        <div className="my-collapsible__content-inner">Collapsible content</div>
      </div>
    </div>
  )}
/>;
```

```js
// Component example, simple - function as child
import SlideToggle from "react-slide-toggle";

// Add CSS: .my-collapsible__content { overflow: hidden;}
// Apply optional padding to .my-collapsible__content-inner
<SlideToggle>
  {({ onToggle, setCollapsibleElement }) => (
    <div className="my-collapsible">
      <button className="my-collapsible__toggle" onClick={onToggle}>
        toggle
      </button>
      <div className="my-collapsible__content" ref={setCollapsibleElement}>
        <div className="my-collapsible__content-inner">Collapsible content</div>
      </div>
    </div>
  )}
</SlideToggle>;
```

```js
// Component usage example with all options
import SlideToggle from "react-slide-toggle";
import BezierEasing from "bezier-easing"; // optional

const bezierEaseInOutQuart = BezierEasing(0.77, 0, 0.175, 1);

<SlideToggle
  duration={280 /* default 300 */}
  easeCollapse={bezierEaseInOutQuart /* default cubicInOut */}
  easeExpand={bezierEaseInOutQuart /* default cubicInOut */}
  collapsed /* default falsy */
  irreversible /* default falsy */
  noDisplayStyle /* default falsy */
  bestPerformance /* default falsy */
  whenReversedUseBackwardEase /* default falsy */
  interpolateOnReverse /* default falsy */
  offsetHeight /* default scrollHeight */
  onExpanded={({ hasReversed }) => {
    /* optional event hook */
  }}
  onExpanding={({ range, progress, hasReversed }) => {
    /* optional event hook */
  }}
  onCollapsed={({ hasReversed }) => {
    /* optional event hook */
  }}
  onCollapsing={({ range, progress, hasReversed }) => {
    /* optional event hook */
  }}
  render={({
    onToggle,
    setCollapsibleElement,
    toggleState,
    isMoving,
    hasReversed,
    range /* linear value between [0 and 1] */,
    progress /* easing result value between [0 and 1] */
  }) => {
    /* optional logic here */

    /*
      markup example
      where setCollapsibleElement, onToggle and progress are used
    */
    return (
      <div className="slide-toggle">
        <div className="slide-toggle__header">
          <button className="slide-toggle__button" onClick={onToggle}>
            toggle
          </button>
        </div>
        <div className="slide-toggle__box" ref={setCollapsibleElement}>
          <div
            className="slide-toggle__box-inner"
            style={{ opacity: Math.max(0.5, progress) }}
          >
            Collapsible content
          </div>
        </div>
      </div>
    );
  }}
/>;
```

## properties

- duration - movement duration in milli seconds
- easeCollapse - function which generates a value between [0 and 1]
- easeExpand - function which generates a value between [0 and 1]
- collapsed - start in collapsed mode
- irreversible - you can't reverse direction during movement
- noDisplayStyle - skip adding display:none on collapsed
- bestPerformance - don't apply setState for every frame update. Disables range and progress update
- whenReversedUseBackwardEase - play backwards on reverse toggling
- interpolateOnReverse - avoid jumpy height changes when easeCollapse and easeExpand gives far different height position on reverse toggling.
- onExpanded - event hook
- onExpanding - event hook
- onCollapsed - event hook
- onCollapsing - event hook
- render - render callback
- children - render callback
- offsetHeight - use offsetHeight HTML element calculation

## cdn

https://unpkg.com/react-slide-toggle/

```html
<script src="//unpkg.com/react-slide-toggle/dist/ReactSlideToggle.js">
  <script>
  <script>
  var SlideToggle = window.ReactSlideToggle;
</script>
```

## npm

https://www.npmjs.com/package/react-slide-toggle

## provide your own markup

The component provides the functionality.
Minimum requirement is to bind the collapsible element with `setCollapsibleElement`.
Use the `onToggle` function to toggle the collapsible element.

## provide your own easing functions

Look for examples in the App component

```js
import eases from "eases";
import BezierEasing from "bezier-easing";
```

To minimize the component size, no default easing library has been added.

You can see examples of JS-easing library usage here

- eases https://codepen.io/kunukn/full/mpVJOm/
- BezierEasing https://codepen.io/kunukn/full/YYNqyj/

## design goals

- flexible - provide your own markup, styling and easing
- interruptible - can be reversed during movement
- simple api with event hooks
- inert - when collapsed you should tab over the collapsed component
- minimal in size
- availability - from cdn or npm install
- generate range and progress [0;1] values which can be used for further custom animation
- JS is used over CSS transition on purpose to enable possible interpolation or other custom math calculations

## library implementation details

- Used life-cycle are `componentWillUnmount` and `render`
- Extends `React.Component`
- Uses `setState`

## local development

- git clone or download
- npm install
- npm run build
- The build files are now in the dist folder
