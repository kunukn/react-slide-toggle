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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SlideToggle = __webpack_require__(2);

Object.defineProperty(exports, 'SlideToggle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SlideToggle).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

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
var FUNCTION = 'function';

var cubicInOut = function cubicInOut(t) {
  return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
};

var SlideToggle = function (_React$Component) {
  _inherits(SlideToggle, _React$Component);

  // static propTypes = {
  //   duration: PropTypes.number,
  //   easeIn: PropTypes.oneOfType([PropTypes.func]),
  //   easeOut: PropTypes.oneOfType([PropTypes.func]),
  //   collapsed: PropTypes.bool,
  //   onExpanded: PropTypes.func,
  //   onExpanding: PropTypes.func,
  //   onCollapsed: PropTypes.func,
  //   onCollapsing: PropTypes.func,
  // };

  function SlideToggle(props) {
    _classCallCheck(this, SlideToggle);

    var _this = _possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

    _initialiseProps.call(_this);

    _this._state_ = {
      collasibleElement: null,
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
    key: 'render',
    value: function render() {
      return this.props.render({
        onToggle: this.onToggle,
        setCollasibleElement: this.setCollapsibleElement,
        toggleState: this.state.toggleState,
        isMoving: this.isMoving(this.state.toggleState)
      });
    }
  }, {
    key: 'isMoving',
    value: function isMoving(toggleState) {
      return toggleState === TOGGLE.EXPANDING || toggleState === TOGGLE.COLLAPSING;
    }
  }, {
    key: 'now',
    value: function now() {
      return new Date().getTime();
    }
  }, {
    key: 'getFunctionName',
    value: function getFunctionName(fn) {
      return (/function ([^(]*)/.exec(fn + '')[1]
      );
    }
  }, {
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cAF(this._state_.timeout);
    }
  }]);

  return SlideToggle;
}(_react2.default.Component);

SlideToggle.defaultProps = {
  duration: 300,
  easeIn: cubicInOut,
  easeOut: cubicInOut,
  collapsed: false,
  onExpanded: null,
  onExpanding: null,
  onCollapsed: null,
  onCollapsing: null
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
    var update_State_ = function update_State_(_ref) {
      var toggleState = _ref.toggleState,
          display = _ref.display,
          isReverse = _ref.isReverse;

      _this2._state_.toggleState = toggleState;
      if ((typeof display === 'undefined' ? 'undefined' : _typeof(display)) !== undefined) {
        _this2._state_.collasibleElement.style.display = display;
      }
      var now = _this2.now();
      if (isReverse) {
        var _state_ = _this2._state_,
            duration = _state_.duration,
            startAnimationTime = _state_.startAnimationTime;

        var elapsedTime = Math.min(duration, now - startAnimationTime);
        var subtract = Math.max(0, duration - elapsedTime);
        _this2._state_.startAnimationTime = now - subtract;
      } else {
        _this2._state_.boxHeight = _this2._state_.collasibleElement.clientHeight;
        _this2._state_.startAnimationTime = now;
      }
    };

    if (_this2._state_.toggleState === TOGGLE.EXPANDED) {
      update_State_({ toggleState: TOGGLE.COLLAPSING });
      _this2.setState({
        toggleState: TOGGLE.COLLAPSING
      });
      _this2.props.onCollapsing && _this2.props.onCollapsing();
      _this2.collapse();
    } else if (_this2._state_.toggleState === TOGGLE.COLLAPSED) {
      update_State_({ toggleState: TOGGLE.EXPANDING, display: '' });
      _this2.setState({
        toggleState: TOGGLE.EXPANDING
      });
      _this2.props.onExpanding && _this2.props.onExpanding();
      _this2.expand();
    } else if (_this2._state_.toggleState === TOGGLE.EXPANDING) {
      update_State_({ toggleState: TOGGLE.COLLAPSING, isReverse: true });
      _this2.setState({
        toggleState: TOGGLE.COLLAPSING
      });
      _this2.props.onCollapsing && _this2.props.onCollapsing();
      _this2.collapse();
    } else if (_this2._state_.toggleState === TOGGLE.COLLAPSING) {
      update_State_({
        toggleState: TOGGLE.EXPANDING,
        display: '',
        isReverse: true
      });
      _this2.setState({
        toggleState: TOGGLE.EXPANDING
      });
      _this2.props.onExpanding && _this2.props.onExpanding();
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
    if ((typeof easeIn === 'undefined' ? 'undefined' : _typeof(easeIn)) === FUNCTION) {
      _this2._state_.easeIn = easeIn;
      result.easeInName = _this2.getFunctionName(easeIn);
    }
    if ((typeof easeOut === 'undefined' ? 'undefined' : _typeof(easeOut)) === FUNCTION) {
      _this2._state_.easeOut = easeOut;
      result.easeOutName = _this2.getFunctionName(easeOut);
    }
    return result;
  };

  this.setCollapsedState = function () {
    _this2._state_.collasibleElement.style.display = 'none';
    _this2._state_.collasibleElement.style.height = '';
    _this2._state_.toggleState = TOGGLE.COLLAPSED;
    _this2.setState({
      toggleState: TOGGLE.COLLAPSED
    });
    _this2.props.onCollapsed && _this2.props.onCollapsed();
  };

  this.collapse = function () {
    if (!_this2._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (_this2._state_.toggleState !== TOGGLE.COLLAPSING) {
      return;
    }

    var _state_2 = _this2._state_,
        duration = _state_2.duration,
        easeIn = _state_2.easeIn,
        startAnimationTime = _state_2.startAnimationTime,
        boxHeight = _state_2.boxHeight;

    var elapsedTime = Math.min(duration, _this2.now() - startAnimationTime);
    var range = elapsedTime / duration;
    var progress = 1 - easeIn(range);
    var currentHeightValue = Math.round(boxHeight * progress);

    if (elapsedTime < duration) {
      _this2._state_.collasibleElement.style.height = currentHeightValue + 'px';
      _this2._state_.timeout = _this2.nextTick(_this2.collapse);
    } else {
      _this2.setCollapsedState();
    }
  };

  this.setExpandedState = function () {
    _this2._state_.collasibleElement.style.height = '';
    _this2._state_.toggleState = TOGGLE.EXPANDED;
    _this2.setState({
      toggleState: TOGGLE.EXPANDED
    });
    _this2.props.onExpanded && _this2.props.onExpanded();
  };

  this.expand = function () {
    if (!_this2._state_.collasibleElement) {
      warn('no collapsibleElement');
      return;
    }
    if (_this2._state_.toggleState !== TOGGLE.EXPANDING) {
      return;
    }

    var _state_3 = _this2._state_,
        duration = _state_3.duration,
        startAnimationTime = _state_3.startAnimationTime,
        easeOut = _state_3.easeOut,
        boxHeight = _state_3.boxHeight;

    var elapsedTime = Math.min(duration, _this2.now() - startAnimationTime);
    var range = elapsedTime / duration;
    var progress = easeOut(range);
    var currentHeightValue = Math.round(boxHeight * progress);

    if (elapsedTime < duration) {
      _this2._state_.collasibleElement.style.height = currentHeightValue + 'px';
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
/* 3 */
/***/ (function(module, exports) {

module.exports = require("React");

/***/ })
/******/ ]);