(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactSlideToggle"] = factory(require("react"));
	else
		root["ReactSlideToggle"] = factory(root["React"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

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

var easeInOutCubic = function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 0.5 * Math.pow(2 * t - 2, 3) + 1;
};

var util = {
  isMoving: function isMoving(toggleState) {
    return toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING;
  },
  clamp: function clamp(_ref) {
    var value = _ref.value,
        _ref$max = _ref.max,
        max = _ref$max === undefined ? 1 : _ref$max,
        _ref$min = _ref.min,
        min = _ref$min === undefined ? 0 : _ref$min;

    if (value > max) return max;
    if (value < min) return min;
    return value;
  },
  now: function now() {
    return new Date().getTime();
  },
  sanitizeDuration: function sanitizeDuration(duration) {
    return Math.max(0, parseInt(+duration, 10) || 0);
  },
  interpolate: function interpolate(_ref2) {
    var next = _ref2.next,
        prev = _ref2.prev;

    /*
      If the diff in the next rAF is big, it can seem jumpy when reversing the togling
      This is heuristic approach to minimize the diff value by interpolating.
    */
    var diff = Math.abs(next - prev);
    var interpolated = next;
    if (diff > 0.15) {
      /* heuritic value */
      if (next > prev) interpolated -= diff * 0.75; /* heuritic value */
      else interpolated += diff * 0.75; /* heuritic value */
    }
    return interpolated;
  }
};

var SlideToggle = function (_React$Component) {
  _inherits(SlideToggle, _React$Component);

  // static propTypes = {
  //   render: PropTypes.func,
  //   children: PropTypes.func,
  //   duration: PropTypes.number,
  //   irreversible: PropTypes.bool,
  //   whenReversedUseBackwardEase: PropTypes.bool,
  //   noDisplayStyle: PropTypes.bool,
  //   bestPerformance: PropTypes.bool,
  //   interpolateOnReverse: PropTypes.bool,
  //   easeCollapse: PropTypes.func,
  //   easeExpand: PropTypes.func,
  //   collapsed: PropTypes.bool,
  //   onExpanded: PropTypes.func,
  //   onExpanding: PropTypes.func,
  //   onCollapsed: PropTypes.func,
  //   onCollapsing: PropTypes.func,
  //   scrollHeight: PropTypes.bool,
  // };

  function SlideToggle(props) {
    _classCallCheck(this, SlideToggle);

    var _this = _possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

    _this.getCollapsible = function () {
      return _this._state_.collapsibleElement;
    };

    _this.updateCollapsible = function (attr, value) {
      if (_this.getCollapsible()) {
        _this._state_.collapsibleElement.style[attr] = value;
      }
    };

    _this.setCollapsibleElement = function (element) {
      _this._state_.collapsibleElement = element;
      if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        _this.setCollapsedState({ initialState: true });
      }
    };

    _this.onToggle = function () {
      if (_this.props.irreversible && util.isMoving(_this._state_.toggleState)) {
        return;
      }

      var invokeCollapsing = function invokeCollapsing() {
        if (_this.props.onCollapsing) {
          _this.props.onCollapsing({
            range: _this.state.range,
            progress: _this.state.progress,
            hasReversed: _this.state.hasReversed
          });
        }
        _this.collapse();
      };
      var invokeExpanding = function invokeExpanding() {
        if (_this.props.onExpanding) {
          _this.props.onExpanding({
            range: _this.state.range,
            progress: _this.state.progress,
            hasReversed: _this.state.hasReversed
          });
        }
        _this.expand();
      };

      var updateInternalState = function updateInternalState(_ref3) {
        var toggleState = _ref3.toggleState,
            display = _ref3.display,
            hasReversed = _ref3.hasReversed;

        _this._state_.toggleState = toggleState;
        _this._state_.hasReversed = !!hasReversed;

        if (display !== undefined && !_this.props.noDisplayStyle) {
          _this.updateCollapsible('display', display);
        }

        var now = util.now();

        if (hasReversed) {
          var startTime = _this._state_.startTime;

          var duration = util.sanitizeDuration(_this.props.duration);
          var elapsedTime = Math.min(duration, now - startTime);
          var subtract = Math.max(0, duration - elapsedTime);
          _this._state_.startTime = now - subtract;
        } else {
          var collapsible = _this.getCollapsible();
          if (collapsible && collapsible.style.height) {
            _this.updateCollapsible('height', null);
          }
          _this._state_.boxHeight = collapsible ? collapsible[_this.GET_HEIGHT] : 0;
          _this._state_.startTime = now;
          _this._state_.startDirection = toggleState;
        }

        _this.setState({
          toggleState: _this._state_.toggleState,
          hasReversed: _this._state_.hasReversed
        });
      };

      if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        updateInternalState({ toggleState: TOGGLE.COLLAPSING });
        invokeCollapsing();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: ''
        });
        invokeExpanding();
      } else if (_this._state_.toggleState === TOGGLE.EXPANDING) {
        updateInternalState({
          toggleState: TOGGLE.COLLAPSING,
          hasReversed: true
        });
        invokeCollapsing();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSING) {
        updateInternalState({
          toggleState: TOGGLE.EXPANDING,
          display: '',
          hasReversed: true
        });
        invokeExpanding();
      }
    };

    _this.setExpandedState = function () {
      _this._state_.progress = 1;
      _this._state_.toggleState = TOGGLE.EXPANDED;
      _this.updateCollapsible('height', null);
      _this.setState({
        toggleState: TOGGLE.EXPANDED,
        range: 1,
        progress: _this._state_.progress
      });
      if (_this.props.onExpanded) {
        _this.props.onExpanded({
          hasReversed: _this.state.hasReversed
        });
      }
    };

    _this.expand = function () {
      if (_this._state_.toggleState !== TOGGLE.EXPANDING) {
        return;
      }

      var duration = util.sanitizeDuration(_this.props.duration);
      if (duration <= 0) {
        _this.setExpandedState();
        return;
      }

      var startTime = _this._state_.startTime;

      var elapsedTime = Math.min(duration, util.now() - startTime);

      if (elapsedTime >= duration) {
        _this.setExpandedState();
      } else {
        var _this$_state_ = _this._state_,
            startDirection = _this$_state_.startDirection,
            toggleState = _this$_state_.toggleState,
            boxHeight = _this$_state_.boxHeight;

        var range = util.clamp({ value: elapsedTime / duration });

        var progress = void 0;
        if (_this.props.whenReversedUseBackwardEase && startDirection !== toggleState) {
          progress = 1 - _this.props.easeCollapse(1 - range);
        } else {
          progress = _this.props.easeExpand(range);
        }

        if (!_this.props.bestPerformance) {
          _this.setState({
            range: range,
            progress: progress
          });
        }

        if (_this.props.interpolateOnReverse && _this._state_.hasReversed) {
          progress = util.interpolate({
            next: progress,
            prev: _this._state_.progress
          });
        }

        var currentHeightValue = Math.round(boxHeight * progress);
        _this._state_.progress = progress;
        _this.updateCollapsible('height', currentHeightValue + 'px');
        _this.nextTick(_this.expand);
      }
    };

    _this.setCollapsedState = function () {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          initialState = _ref4.initialState;

      _this._state_.progress = 0;
      _this._state_.toggleState = TOGGLE.COLLAPSED;

      if (!_this.props.noDisplayStyle) {
        _this.updateCollapsible('display', 'none');
        _this.updateCollapsible('height', null);
      } else {
        _this.updateCollapsible('height', '0px');
      }

      _this.setState({
        toggleState: TOGGLE.COLLAPSED,
        range: 0,
        progress: _this._state_.progress
      });
      if (!initialState && _this.props.onCollapsed) _this.props.onCollapsed({
        hasReversed: _this.state.hasReversed
      });
    };

    _this.collapse = function () {
      if (_this._state_.toggleState !== TOGGLE.COLLAPSING) {
        return;
      }
      var duration = util.sanitizeDuration(_this.props.duration);
      if (duration <= 0) {
        _this.setCollapsedState();
        return;
      }

      var startTime = _this._state_.startTime;

      var elapsedTime = Math.min(duration, util.now() - startTime);

      if (elapsedTime >= duration) {
        _this.setCollapsedState();
      } else {
        var _this$_state_2 = _this._state_,
            startDirection = _this$_state_2.startDirection,
            boxHeight = _this$_state_2.boxHeight,
            toggleState = _this$_state_2.toggleState;

        var range = 1 - util.clamp({ value: elapsedTime / duration });

        var _this$props = _this.props,
            whenReversedUseBackwardEase = _this$props.whenReversedUseBackwardEase,
            easeExpand = _this$props.easeExpand,
            easeCollapse = _this$props.easeCollapse;


        var progress = void 0;
        if (whenReversedUseBackwardEase && startDirection !== toggleState) {
          progress = easeExpand(range);
        } else {
          progress = 1 - easeCollapse(1 - range);
        }

        if (!_this.props.bestPerformance) {
          _this.setState({
            range: range,
            progress: progress
          });
        }

        if (_this.props.interpolateOnReverse && _this._state_.hasReversed) {
          progress = util.interpolate({
            next: progress,
            prev: _this._state_.progress
          });
        }

        var currentHeightValue = Math.round(boxHeight * progress);
        _this._state_.progress = progress;
        _this._state_.timeout = _this.nextTick(_this.collapse);
        _this.updateCollapsible('height', currentHeightValue + 'px');
      }
    };

    _this.nextTick = function (callback) {
      _this._state_.timeout = rAF(callback);
    };

    _this._state_ = {
      collapsibleElement: null,
      toggleState: _this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED
    };

    _this.GET_HEIGHT = props.scrollHeight ? 'scrollHeight' : 'offsetHeight';

    _this.state = {
      toggleState: _this._state_.toggleState,
      hasReversed: false,
      range: _this.props.collapsed ? 0 : 1,
      progress: _this.props.collapsed ? 0 : 1
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
        hasReversed: this.state.hasReversed,
        isMoving: util.isMoving(this.state.toggleState),
        range: this.state.range,
        progress: this.state.progress
      };

      if (this.props.children) return this.props.children(data);
      if (this.props.render) return this.props.render(data);

      return null;
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
exports.default = SlideToggle;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SlideToggle = __webpack_require__(2).default;

module.exports = {
  SlideToggle: SlideToggle
};

// export { default as SlideToggle } from './SlideToggle';

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ })
/******/ ]);
});