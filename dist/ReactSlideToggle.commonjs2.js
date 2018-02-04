module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 _state_ is internal state for sync and rendering control.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 setState is async and I need sync control because timing is important 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 and because I need to control what is to be re-rendered.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

// eslint-disable-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types'; // eslint-disable-line import/no-extraneous-dependencies

// Support browser or node env
var root = typeof window !== 'undefined' ? window : global;
var rAF = root.requestAnimationFrame ? root.requestAnimationFrame.bind(root) : function (callback) {
  return root.setTimeout(callback, 16);
};
var cAF = root.cancelAnimationFrame ? root.cancelAnimationFrame.bind(root) : root.clearInterval.bind(root);

var TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING'
};
var GET_HEIGHT = 'offsetHeight';

var easeInOutCubic = function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
};

var util = {
  isMoving: function isMoving(toggleState) {
    return toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING;
  },
  now: function now() {
    return new Date().getTime();
  }
};

var SlideToggle = function (_React$Component) {
  _inherits(SlideToggle, _React$Component);

  // static propTypes = {
  //   render: PropTypes.func,
  //   duration: PropTypes.number,
  //   irreversible: PropTypes.bool,
  //   whenReversedUseBackwardEase: PropTypes.bool,
  //   noDisplayStyle: PropTypes.bool,
  //   easeCollapse: PropTypes.func,
  //   easeExpand: PropTypes.func,
  //   collapsed: PropTypes.bool,
  // };

  function SlideToggle(props) {
    _classCallCheck(this, SlideToggle);

    var _this = _possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

    _this.setCollapsibleElement = function (element) {
      if (!element) {
        return;
      }
      _this._state_.collasibleElement = element;
      _this._state_.boxHeight = element[GET_HEIGHT];

      if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        _this.setCollapsedState({ initialState: true });
      } else if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        _this.setExpandedState({ initialState: true });
      }
    };

    _this.onToggle = function () {
      var updateInternalState = function updateInternalState(_ref) {
        var toggleState = _ref.toggleState,
            display = _ref.display,
            hasReversed = _ref.hasReversed;

        _this._state_.toggleState = toggleState;
        _this._state_.hasReversed = !!hasReversed;

        if (display !== undefined && !_this.props.noDisplayStyle) {
          _this._state_.collasibleElement.style.display = display;
        }

        var now = util.now();

        if (hasReversed) {
          var startTime = _this._state_.startTime;

          var duration = +_this.props.duration;
          var elapsedTime = Math.min(duration, now - startTime);
          var subtract = Math.max(0, duration - elapsedTime);
          _this._state_.startTime = now - subtract;
        } else {
          _this._state_.boxHeight = _this._state_.collasibleElement[GET_HEIGHT];
          _this._state_.startTime = now;
          _this._state_.startDirection = toggleState;
        }

        _this.setState({
          toggleState: _this._state_.toggleState
        });
      };

      if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        updateInternalState({ toggleState: TOGGLE.COLLAPSING });
        _this.collapse();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: ''
        });
        _this.expand();
      } else if (_this._state_.toggleState === TOGGLE.EXPANDING) {
        updateInternalState({
          toggleState: TOGGLE.COLLAPSING,
          hasReversed: true
        });
        _this.collapse();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSING) {
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: '',
          hasReversed: true
        });
        _this.expand();
      }
    };

    _this.setExpandedState = function () {
      _this._state_.collasibleElement.style.height = null;
      _this._state_.toggleState = TOGGLE.EXPANDED;
      _this.setState({
        toggleState: TOGGLE.EXPANDED
      });
    };

    _this.expand = function () {
      if (_this._state_.toggleState !== TOGGLE.EXPANDING) {
        return;
      }

      var duration = +_this.props.duration;
      if (duration <= 0) {
        _this.setExpandedState();
        return;
      }

      var startTime = _this._state_.startTime;

      var elapsedTime = Math.min(duration, util.now() - startTime);

      if (elapsedTime >= duration) {
        _this.setExpandedState();
      } else {
        var boxHeight = _this._state_.boxHeight;

        var range = elapsedTime / duration;
        var progress = _this.props.easeExpand(range);
        var currentHeightValue = Math.round(boxHeight * progress);
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this.nextTick(_this.expand);
      }
    };

    _this.setCollapsedState = function () {
      if (!_this.props.noDisplayStyle) {
        _this._state_.collasibleElement.style.display = 'none';
      }
      _this._state_.collasibleElement.style.height = null;
      _this._state_.toggleState = TOGGLE.COLLAPSED;
      _this.setState({
        toggleState: TOGGLE.COLLAPSED
      });
    };

    _this.collapse = function () {
      if (_this._state_.toggleState !== TOGGLE.COLLAPSING) {
        return;
      }
      var duration = +_this.props.duration;
      if (duration <= 0) {
        _this.setCollapsedState();
        return;
      }

      var startTime = _this._state_.startTime;

      var elapsedTime = Math.min(duration, util.now() - startTime);

      if (elapsedTime >= duration) {
        _this.setCollapsedState();
      } else {
        var boxHeight = _this._state_.boxHeight;

        var range = 1 - elapsedTime / duration;
        var easeCollapse = _this.props.easeCollapse;

        var progress = 1 - easeCollapse(1 - range);
        var currentHeightValue = Math.round(boxHeight * progress);
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this._state_.timeout = _this.nextTick(_this.collapse);
      }
    };

    _this.nextTick = function (callback) {
      _this._state_.timeout = rAF(callback);
    };

    _this._state_ = {
      collasibleElement: null,
      toggleState: _this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED
    };

    _this.state = {
      toggleState: _this._state_.toggleState
    };
    return _this;
  }

  _createClass(SlideToggle, [{
    key: 'render',
    value: function render() {
      var data = {
        onToggle: this.onToggle,
        setCollapsibleElement: this.setCollapsibleElement,
        toggleState: this.state.toggleState,
        isMoving: util.isMoving(this.state.toggleState)
      };

      return this.props.render ? this.props.render(data) : null;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cAF(this._state_.timeout);
    }
  }]);

  return SlideToggle;
}(_react2.default.Component);

SlideToggle.defaultProps = {
  duration: 300,
  easeCollapse: easeInOutCubic,
  easeExpand: easeInOutCubic
};


module.exports = SlideToggle;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })
/******/ ]);