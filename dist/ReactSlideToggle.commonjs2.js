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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function bounceOut(t) {
  var a = 4.0 / 11.0
  var b = 8.0 / 11.0
  var c = 9.0 / 10.0

  var ca = 4356.0 / 361.0
  var cb = 35442.0 / 1805.0
  var cc = 16061.0 / 1805.0

  var t2 = t * t

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72
}

module.exports = bounceOut

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SlideToggle = __webpack_require__(3);

Object.defineProperty(exports, 'SlideToggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SlideToggle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(4);

var _react2 = _interopRequireDefault(_react);

var _eases = __webpack_require__(5);

var _eases2 = _interopRequireDefault(_eases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 _state_ is used to minimize expensive re-renderings.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 We don't want to update the state for every requestAnimationFrame
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 this.state is updated on toggle state change, used easing and duration.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */

//import PropTypes from 'prop-types';

var log = console.log.bind(console);
var warn = console.warn.bind(console);

var rAF = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function (callback) {
  return window.setTimeout(callback, 16);
};
var cAF = window.cancelAnimationFrame ? window.cancelAnimationFrame.bind(window) : window.clearInterval.bind(window);

var TOGGLE = {
  EXPANDED: 'EXPANDED',
  COLLAPSED: 'COLLAPSED',
  EXPANDING: 'EXPANDING',
  COLLAPSING: 'COLLAPSING'
};
var STRING = 'string';
var FUNCTION = 'function';
var CUSTOM_FUNCTION_NAME = 'custom function';

var SlideToggle = function (_React$Component) {
  _inherits(SlideToggle, _React$Component);

  // static propTypes = {
  //   duration: PropTypes.number,
  //   easeIn: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  //   easeOut: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  //   collapsed: PropTypes.bool,
  // };

  function SlideToggle(props) {
    _classCallCheck(this, SlideToggle);

    var _this = _possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

    _initialiseProps.call(_this);

    _this._state_ = {
      collasibleElement: null,
      isAnimating: false,
      toggleState: _this.props.collapsed ? TOGGLE.COLLAPSED : TOGGLE.EXPANDED
    };

    var duration = _this.setDuration(_this.props.duration);

    var _this$setEaseFunction = _this.setEaseFunction({ easeIn: _this.props.easeIn }),
        easeInName = _this$setEaseFunction.easeInName;

    var _this$setEaseFunction2 = _this.setEaseFunction({
      easeOut: _this.props.easeOut
    }),
        easeOutName = _this$setEaseFunction2.easeOutName;

    _this.state = {
      toggleState: _this._state_.toggleState,
      duration: duration,
      easeInName: easeInName,
      easeOutName: easeOutName
    };
    return _this;
  }

  _createClass(SlideToggle, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.easeIn !== this.props.easeIn) {
        var _setEaseFunction = this.setEaseFunction({
          easeIn: nextProps.easeIn
        }),
            easeInName = _setEaseFunction.easeInName;

        this.setState({ easeInName: easeInName });
      }
      if (nextProps.easeOut !== this.props.easeOut) {
        var _setEaseFunction2 = this.setEaseFunction({
          easeOut: nextProps.easeOut
        }),
            easeOutName = _setEaseFunction2.easeOutName;

        this.setState({ easeOutName: easeOutName });
      }
      if (nextProps.duration !== this.props.duration) {
        var duration = this.setDuration(nextProps.duration);
        this.setState({ duration: duration });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.render({
        onToggle: this.onToggle,
        setCollasibleElement: this.setCollapsibleElement,
        state: this.state
      });
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
  easeIn: 'quartInOut',
  easeOut: 'quartInOut',
  collapsed: false
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.setCollapsibleElement = function (element) {
    if (!element) {
      warn('no element in setCollapsibleElement');
      return;
    }
    _this2._state_.collasibleElement = element;
    if (_this2._state_.toggleState === TOGGLE.COLLAPSED) {
      _this2.setCollapsedState();
    } else if (_this2._state_.toggleState === TOGGLE.EXPANDED) {
      _this2.setExpandedState();
    }
  };

  this.onToggle = function () {
    if (_this2._state_.isAnimating) {
      log('working.. please wait - isAnimating true');
      return;
    }

    var update_State_ = function update_State_(_ref) {
      var toggleState = _ref.toggleState,
          display = _ref.display;

      _this2._state_.isAnimating = true;
      _this2._state_.toggleState = toggleState;
      if ((typeof display === 'undefined' ? 'undefined' : _typeof(display)) !== undefined) {
        _this2._state_.collasibleElement.style.display = display;
      }
      _this2._state_.boxHeight = _this2._state_.collasibleElement.clientHeight;
      _this2._state_.startAnimationTime = new Date().getTime();
    };

    if (_this2._state_.toggleState === TOGGLE.EXPANDED) {
      update_State_({ toggleState: TOGGLE.COLLAPSING });
      _this2.setState({ toggleState: TOGGLE.COLLAPSING });
      _this2.collapse();
    } else if (_this2._state_.toggleState === TOGGLE.COLLAPSED) {
      update_State_({ toggleState: TOGGLE.EXPANDING, display: '' });
      _this2.setState({ toggleState: TOGGLE.EXPANDING });
      _this2.expand();
    }
  };

  this.setDuration = function (duration) {
    var durationNumber = parseInt(duration, 10) || 0;
    _this2._state_.duration = durationNumber;
    return durationNumber;
  };

  this.setEaseFunction = function (_ref2) {
    var easeIn = _ref2.easeIn,
        easeOut = _ref2.easeOut;

    var result = {};
    if ((typeof easeIn === 'undefined' ? 'undefined' : _typeof(easeIn)) === STRING) {
      _this2._state_.easeIn = _eases2.default[easeIn];
      result.easeInName = easeIn;
    }
    if ((typeof easeOut === 'undefined' ? 'undefined' : _typeof(easeOut)) === STRING) {
      _this2._state_.easeOut = _eases2.default[easeOut];
      result.easeOutName = easeOut;
    }
    if ((typeof easeIn === 'undefined' ? 'undefined' : _typeof(easeIn)) === FUNCTION) {
      _this2._state_.easeIn = easeIn;
      result.easeInName = CUSTOM_FUNCTION_NAME;
    }
    if ((typeof easeOut === 'undefined' ? 'undefined' : _typeof(easeOut)) === FUNCTION) {
      _this2._state_.easeOut = easeOut;
      result.easeOutName = CUSTOM_FUNCTION_NAME;
    }
    return result;
  };

  this.setCollapsedState = function () {
    _this2._state_.collasibleElement.style.display = 'none';
    _this2._state_.collasibleElement.style.height = '';
    _this2._state_.toggleState = TOGGLE.COLLAPSED;
    _this2._state_.isAnimating = false;
    _this2._state_.range = 0;
    _this2._state_.progress = 0;
    _this2.setState({ toggleState: TOGGLE.COLLAPSED });
  };

  this.collapse = function () {
    if (!_this2._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (_this2._state_.toggleState !== TOGGLE.COLLAPSING) {
      return;
    }

    var _state_ = _this2._state_,
        duration = _state_.duration,
        easeIn = _state_.easeIn,
        startAnimationTime = _state_.startAnimationTime,
        boxHeight = _state_.boxHeight;

    var now = new Date().getTime();
    var elapsedTime = Math.min(duration, now - startAnimationTime);
    var range = elapsedTime / duration;
    var progress = 1 - easeIn(range);
    var currentHeightValue = Math.round(boxHeight * progress);

    if (elapsedTime < duration) {
      _this2._state_.collasibleElement.style.height = currentHeightValue + 'px';
      _this2._state_.timeout = _this2.nextTick(_this2.collapse);
      _this2._state_.range = range;
      _this2._state_.progress = progress;
    } else {
      _this2.setCollapsedState();
    }
  };

  this.setExpandedState = function () {
    _this2._state_.collasibleElement.style.height = '';
    _this2._state_.toggleState = TOGGLE.EXPANDED;
    _this2._state_.isAnimating = false;
    _this2._state_.range = 0;
    _this2._state_.progress = 0;
    _this2.setState({ toggleState: TOGGLE.EXPANDED });
  };

  this.expand = function () {
    if (!_this2._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (_this2._state_.toggleState !== TOGGLE.EXPANDING) {
      return;
    }

    var _state_2 = _this2._state_,
        duration = _state_2.duration,
        startAnimationTime = _state_2.startAnimationTime,
        easeOut = _state_2.easeOut,
        boxHeight = _state_2.boxHeight;

    var now = new Date().getTime();
    var elapsedTime = Math.min(duration, now - startAnimationTime);
    var range = elapsedTime / duration;
    var progress = easeOut(range);
    var currentHeightValue = Math.round(boxHeight * progress);

    if (elapsedTime < duration) {
      _this2._state_.collasibleElement.style.height = currentHeightValue + 'px';
      _this2._state_.range = range;
      _this2._state_.progress = progress;
      _this2.nextTick(_this2.expand);
    } else {
      _this2.setExpandedState();
    }
  };

  this.nextTick = function (callback) {
    _this2._state_.timeout = rAF(callback);
  };
};

exports.default = SlideToggle;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("React");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
	'backInOut': __webpack_require__(6),
	'backIn': __webpack_require__(7),
	'backOut': __webpack_require__(8),
	'bounceInOut': __webpack_require__(9),
	'bounceIn': __webpack_require__(10),
	'bounceOut': __webpack_require__(0),
	'circInOut': __webpack_require__(11),
	'circIn': __webpack_require__(12),
	'circOut': __webpack_require__(13),
	'cubicInOut': __webpack_require__(14),
	'cubicIn': __webpack_require__(15),
	'cubicOut': __webpack_require__(16),
	'elasticInOut': __webpack_require__(17),
	'elasticIn': __webpack_require__(18),
	'elasticOut': __webpack_require__(19),
	'expoInOut': __webpack_require__(20),
	'expoIn': __webpack_require__(21),
	'expoOut': __webpack_require__(22),
	'linear': __webpack_require__(23),
	'quadInOut': __webpack_require__(24),
	'quadIn': __webpack_require__(25),
	'quadOut': __webpack_require__(26),
	'quartInOut': __webpack_require__(27),
	'quartIn': __webpack_require__(28),
	'quartOut': __webpack_require__(29),
	'quintInOut': __webpack_require__(30),
	'quintIn': __webpack_require__(31),
	'quintOut': __webpack_require__(32),
	'sineInOut': __webpack_require__(33),
	'sineIn': __webpack_require__(34),
	'sineOut': __webpack_require__(35)
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function backInOut(t) {
  var s = 1.70158 * 1.525
  if ((t *= 2) < 1)
    return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}

module.exports = backInOut

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function backIn(t) {
  var s = 1.70158
  return t * t * ((s + 1) * t - s)
}

module.exports = backIn

/***/ }),
/* 8 */
/***/ (function(module, exports) {

function backOut(t) {
  var s = 1.70158
  return --t * t * ((s + 1) * t + s) + 1
}

module.exports = backOut

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var bounceOut = __webpack_require__(0)

function bounceInOut(t) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut(1.0 - t * 2.0))
    : 0.5 * bounceOut(t * 2.0 - 1.0) + 0.5
}

module.exports = bounceInOut

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var bounceOut = __webpack_require__(0)

function bounceIn(t) {
  return 1.0 - bounceOut(1.0 - t)
}

module.exports = bounceIn

/***/ }),
/* 11 */
/***/ (function(module, exports) {

function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}

module.exports = circInOut

/***/ }),
/* 12 */
/***/ (function(module, exports) {

function circIn(t) {
  return 1.0 - Math.sqrt(1.0 - t * t)
}

module.exports = circIn

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function circOut(t) {
  return Math.sqrt(1 - ( --t * t ))
}

module.exports = circOut

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function cubicInOut(t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
}

module.exports = cubicInOut

/***/ }),
/* 15 */
/***/ (function(module, exports) {

function cubicIn(t) {
  return t * t * t
}

module.exports = cubicIn

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function cubicOut(t) {
  var f = t - 1.0
  return f * f * f + 1.0
}

module.exports = cubicOut

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function elasticInOut(t) {
  return t < 0.5
    ? 0.5 * Math.sin(+13.0 * Math.PI/2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * Math.sin(-13.0 * Math.PI/2 * ((2.0 * t - 1.0) + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0
}

module.exports = elasticInOut

/***/ }),
/* 18 */
/***/ (function(module, exports) {

function elasticIn(t) {
  return Math.sin(13.0 * t * Math.PI/2) * Math.pow(2.0, 10.0 * (t - 1.0))
}

module.exports = elasticIn

/***/ }),
/* 19 */
/***/ (function(module, exports) {

function elasticOut(t) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI/2) * Math.pow(2.0, -10.0 * t) + 1.0
}

module.exports = elasticOut

/***/ }),
/* 20 */
/***/ (function(module, exports) {

function expoInOut(t) {
  return (t === 0.0 || t === 1.0)
    ? t
    : t < 0.5
      ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0
}

module.exports = expoInOut

/***/ }),
/* 21 */
/***/ (function(module, exports) {

function expoIn(t) {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0))
}

module.exports = expoIn

/***/ }),
/* 22 */
/***/ (function(module, exports) {

function expoOut(t) {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)
}

module.exports = expoOut

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function linear(t) {
  return t
}

module.exports = linear

/***/ }),
/* 24 */
/***/ (function(module, exports) {

function quadInOut(t) {
    t /= 0.5
    if (t < 1) return 0.5*t*t
    t--
    return -0.5 * (t*(t-2) - 1)
}

module.exports = quadInOut

/***/ }),
/* 25 */
/***/ (function(module, exports) {

function quadIn(t) {
  return t * t
}

module.exports = quadIn

/***/ }),
/* 26 */
/***/ (function(module, exports) {

function quadOut(t) {
  return -t * (t - 2.0)
}

module.exports = quadOut

/***/ }),
/* 27 */
/***/ (function(module, exports) {

function quarticInOut(t) {
  return t < 0.5
    ? +8.0 * Math.pow(t, 4.0)
    : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0
}

module.exports = quarticInOut

/***/ }),
/* 28 */
/***/ (function(module, exports) {

function quarticIn(t) {
  return Math.pow(t, 4.0)
}

module.exports = quarticIn

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function quarticOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0
}

module.exports = quarticOut

/***/ }),
/* 30 */
/***/ (function(module, exports) {

function qinticInOut(t) {
    if ( ( t *= 2 ) < 1 ) return 0.5 * t * t * t * t * t
    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2 )
}

module.exports = qinticInOut

/***/ }),
/* 31 */
/***/ (function(module, exports) {

function qinticIn(t) {
  return t * t * t * t * t
}

module.exports = qinticIn

/***/ }),
/* 32 */
/***/ (function(module, exports) {

function qinticOut(t) {
  return --t * t * t * t * t + 1
}

module.exports = qinticOut

/***/ }),
/* 33 */
/***/ (function(module, exports) {

function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI*t) - 1)
}

module.exports = sineInOut

/***/ }),
/* 34 */
/***/ (function(module, exports) {

function sineIn (t) {
  var v = Math.cos(t * Math.PI * 0.5)
  if (Math.abs(v) < 1e-14) return 1
  else return 1 - v
}

module.exports = sineIn


/***/ }),
/* 35 */
/***/ (function(module, exports) {

function sineOut(t) {
  return Math.sin(t * Math.PI/2)
}

module.exports = sineOut

/***/ })
/******/ ]);