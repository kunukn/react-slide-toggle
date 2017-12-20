(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('eases')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'eases'], factory) :
	(factory((global.ReactSlideToggle = {}),global.React,global.eases));
}(this, (function (exports,React,eases) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
eases = eases && eases.hasOwnProperty('default') ? eases['default'] : eases;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/*
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

var SlideToggle = function (_React$Component) {
  inherits(SlideToggle, _React$Component);

  function SlideToggle(props) {
    classCallCheck(this, SlideToggle);

    var _this = possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

    _this.setCollapsibleElement = function (element) {
      if (!element) {
        warn('no element in setCollapsibleElement');
      }
      _this._state_.collasibleElement = element || null;
      if (element) {
        if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
          _this.setCollapsedState();
        } else if (_this._state_.toggleState === TOGGLE.EXPANDED) {
          _this.setExpandedState();
        }
      }
    };

    _this.onToggle = function () {
      if (_this._state_.isAnimating) {
        log('working.. please wait - isAnimating true');
        return;
      }

      var updateState = function updateState(_ref) {
        var toggleState = _ref.toggleState,
            display = _ref.display;

        _this._state_.isAnimating = true;
        _this._state_.toggleState = toggleState;
        if ((typeof display === 'undefined' ? 'undefined' : _typeof(display)) !== undefined) {
          _this._state_.collasibleElement.style.display = display;
        }
        _this._state_.boxHeight = _this._state_.collasibleElement.clientHeight;
        _this._state_.startAnimationTime = new Date().getTime();
      };

      if (_this._state_.toggleState === TOGGLE.EXPANDED) {
        updateState({ toggleState: TOGGLE.COLLAPSING });
        _this.setState({ toggleState: TOGGLE.COLLAPSING });
        _this.collapse();
      } else if (_this._state_.toggleState === TOGGLE.COLLAPSED) {
        updateState({ toggleState: TOGGLE.EXPANDING, display: '' });
        _this.setState({ toggleState: TOGGLE.EXPANDING });
        _this.expand();
      } else {
        log('error onToggle');
      }
    };

    _this.setDuration = function (duration) {
      _this._state_.duration = parseInt(duration, 10) || 0;
    };

    _this.setEaseFunction = function (ease) {
      if (typeof ease === 'string') {
        _this._state_.ease = eases[ease];
        return ease;
      } else if (typeof ease === 'function') {
        _this._state_.ease = ease;
        return 'custom function';
      }
    };

    _this.setCollapsedState = function () {
      _this._state_.collasibleElement.style.display = 'none';
      _this._state_.collasibleElement.style.height = '';
      _this._state_.toggleState = TOGGLE.COLLAPSED;
      _this._state_.isAnimating = false;
      _this.setState({ toggleState: TOGGLE.COLLAPSED });
    };

    _this.collapse = function () {
      if (!_this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }

      var duration = _this._state_.duration;
      var now = new Date().getTime();
      var elapsedTime = Math.min(duration, now - _this._state_.startAnimationTime);
      var range = elapsedTime / duration;
      var progress = 1 - _this._state_.ease(range);
      var currentHeightValue = Math.round(_this._state_.boxHeight * progress);

      if (elapsedTime < duration) {
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this._state_.timeout = _this.nextTick(_this.collapse);
      } else {
        _this.setCollapsedState();
      }
    };

    _this.setExpandedState = function () {
      _this._state_.collasibleElement.style.height = '';
      _this._state_.toggleState = TOGGLE.EXPANDED;
      _this._state_.isAnimating = false;
      _this.setState({ toggleState: TOGGLE.EXPANDED });
    };

    _this.expand = function () {
      if (!_this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }

      var duration = _this._state_.duration;
      var now = new Date().getTime();
      var elapsedTime = Math.min(duration, now - _this._state_.startAnimationTime);
      var range = elapsedTime / duration;
      var progress = _this._state_.ease(range);
      var currentHeightValue = Math.round(_this._state_.boxHeight * progress);

      if (elapsedTime < duration) {
        _this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        _this.nextTick(_this.expand);
      } else {
        _this.setExpandedState();
      }
    };

    _this.nextTick = function (callback) {
      _this._state_.timeout = rAF(callback);
    };

    _this._state_ = {
      collasibleElement: null,
      isAnimating: false,
      toggleState: TOGGLE.EXPANDED
    };

    if (_this.props.toggleState && _this.props.toggleState.toUpperCase() === TOGGLE.COLLAPSED) {
      _this._state_.toggleState = TOGGLE.COLLAPSED;
    }

    _this.setDuration(_this.props.duration);
    var easeName = _this.setEaseFunction(_this.props.ease);

    _this.state = {
      toggleState: _this._state_.toggleState,
      duration: _this._state_.duration,
      easeName: easeName
    };
    return _this;
  }

  createClass(SlideToggle, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.ease !== this.props.ease) {
        var easeName = this.setEaseFunction(nextProps.ease);
        this.setState({ easeName: easeName });
      }
      if (nextProps.duration !== this.props.duration) {
        this.setDuration(nextProps.duration);
        this.setState({ duration: this._state_.duration });
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
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {}
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cAF(this._state_.timeout);
    }
  }]);
  return SlideToggle;
}(React.Component);

// SlideToggle.propTypes = {
//   duration: PropTypes.number,
//   ease: PropTypes.oneOf(Object.keys(eases)),
//   toggleState: PropTypes.oneOf([TOGGLE.COLLAPSED, TOGGLE.EXPANDED]),
// };

SlideToggle.defaultProps = {
  duration: 500,
  ease: 'quartInOut',
  toggleState: TOGGLE.EXPANDED
};

exports.SlideToggle = SlideToggle;

Object.defineProperty(exports, '__esModule', { value: true });

})));
