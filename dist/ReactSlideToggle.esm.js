import React from 'react';

function backInOut(t) {
  var s = 1.70158 * 1.525;
  if ((t *= 2) < 1)
    return 0.5 * (t * t * ((s + 1) * t - s))
  return 0.5 * ((t -= 2) * t * ((s + 1) * t + s) + 2)
}

var backInOut_1 = backInOut;

function backIn(t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s)
}

var backIn_1 = backIn;

function backOut(t) {
  var s = 1.70158;
  return --t * t * ((s + 1) * t + s) + 1
}

var backOut_1 = backOut;

function bounceOut(t) {
  var a = 4.0 / 11.0;
  var b = 8.0 / 11.0;
  var c = 9.0 / 10.0;

  var ca = 4356.0 / 361.0;
  var cb = 35442.0 / 1805.0;
  var cc = 16061.0 / 1805.0;

  var t2 = t * t;

  return t < a
    ? 7.5625 * t2
    : t < b
      ? 9.075 * t2 - 9.9 * t + 3.4
      : t < c
        ? ca * t2 - cb * t + cc
        : 10.8 * t * t - 20.52 * t + 10.72
}

var bounceOut_1 = bounceOut;

function bounceInOut(t) {
  return t < 0.5
    ? 0.5 * (1.0 - bounceOut_1(1.0 - t * 2.0))
    : 0.5 * bounceOut_1(t * 2.0 - 1.0) + 0.5
}

var bounceInOut_1 = bounceInOut;

function bounceIn(t) {
  return 1.0 - bounceOut_1(1.0 - t)
}

var bounceIn_1 = bounceIn;

function circInOut(t) {
  if ((t *= 2) < 1) return -0.5 * (Math.sqrt(1 - t * t) - 1)
  return 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
}

var circInOut_1 = circInOut;

function circIn(t) {
  return 1.0 - Math.sqrt(1.0 - t * t)
}

var circIn_1 = circIn;

function circOut(t) {
  return Math.sqrt(1 - ( --t * t ))
}

var circOut_1 = circOut;

function cubicInOut(t) {
  return t < 0.5
    ? 4.0 * t * t * t
    : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0
}

var cubicInOut_1 = cubicInOut;

function cubicIn(t) {
  return t * t * t
}

var cubicIn_1 = cubicIn;

function cubicOut(t) {
  var f = t - 1.0;
  return f * f * f + 1.0
}

var cubicOut_1 = cubicOut;

function elasticInOut(t) {
  return t < 0.5
    ? 0.5 * Math.sin(+13.0 * Math.PI/2 * 2.0 * t) * Math.pow(2.0, 10.0 * (2.0 * t - 1.0))
    : 0.5 * Math.sin(-13.0 * Math.PI/2 * ((2.0 * t - 1.0) + 1.0)) * Math.pow(2.0, -10.0 * (2.0 * t - 1.0)) + 1.0
}

var elasticInOut_1 = elasticInOut;

function elasticIn(t) {
  return Math.sin(13.0 * t * Math.PI/2) * Math.pow(2.0, 10.0 * (t - 1.0))
}

var elasticIn_1 = elasticIn;

function elasticOut(t) {
  return Math.sin(-13.0 * (t + 1.0) * Math.PI/2) * Math.pow(2.0, -10.0 * t) + 1.0
}

var elasticOut_1 = elasticOut;

function expoInOut(t) {
  return (t === 0.0 || t === 1.0)
    ? t
    : t < 0.5
      ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
      : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0
}

var expoInOut_1 = expoInOut;

function expoIn(t) {
  return t === 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0))
}

var expoIn_1 = expoIn;

function expoOut(t) {
  return t === 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t)
}

var expoOut_1 = expoOut;

function linear(t) {
  return t
}

var linear_1 = linear;

function quadInOut(t) {
    t /= 0.5;
    if (t < 1) return 0.5*t*t
    t--;
    return -0.5 * (t*(t-2) - 1)
}

var quadInOut_1 = quadInOut;

function quadIn(t) {
  return t * t
}

var quadIn_1 = quadIn;

function quadOut(t) {
  return -t * (t - 2.0)
}

var quadOut_1 = quadOut;

function quarticInOut(t) {
  return t < 0.5
    ? +8.0 * Math.pow(t, 4.0)
    : -8.0 * Math.pow(t - 1.0, 4.0) + 1.0
}

var quartInOut = quarticInOut;

function quarticIn(t) {
  return Math.pow(t, 4.0)
}

var quartIn = quarticIn;

function quarticOut(t) {
  return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0
}

var quartOut = quarticOut;

function qinticInOut(t) {
    if ( ( t *= 2 ) < 1 ) return 0.5 * t * t * t * t * t
    return 0.5 * ( ( t -= 2 ) * t * t * t * t + 2 )
}

var quintInOut = qinticInOut;

function qinticIn(t) {
  return t * t * t * t * t
}

var quintIn = qinticIn;

function qinticOut(t) {
  return --t * t * t * t * t + 1
}

var quintOut = qinticOut;

function sineInOut(t) {
  return -0.5 * (Math.cos(Math.PI*t) - 1)
}

var sineInOut_1 = sineInOut;

function sineIn (t) {
  var v = Math.cos(t * Math.PI * 0.5);
  if (Math.abs(v) < 1e-14) return 1
  else return 1 - v
}

var sineIn_1 = sineIn;

function sineOut(t) {
  return Math.sin(t * Math.PI/2)
}

var sineOut_1 = sineOut;

var eases = {
	'backInOut': backInOut_1,
	'backIn': backIn_1,
	'backOut': backOut_1,
	'bounceInOut': bounceInOut_1,
	'bounceIn': bounceIn_1,
	'bounceOut': bounceOut_1,
	'circInOut': circInOut_1,
	'circIn': circIn_1,
	'circOut': circOut_1,
	'cubicInOut': cubicInOut_1,
	'cubicIn': cubicIn_1,
	'cubicOut': cubicOut_1,
	'elasticInOut': elasticInOut_1,
	'elasticIn': elasticIn_1,
	'elasticOut': elasticOut_1,
	'expoInOut': expoInOut_1,
	'expoIn': expoIn_1,
	'expoOut': expoOut_1,
	'linear': linear_1,
	'quadInOut': quadInOut_1,
	'quadIn': quadIn_1,
	'quadOut': quadOut_1,
	'quartInOut': quartInOut,
	'quartIn': quartIn,
	'quartOut': quartOut,
	'quintInOut': quintInOut,
	'quintIn': quintIn,
	'quintOut': quintOut,
	'sineInOut': sineInOut_1,
	'sineIn': sineIn_1,
	'sineOut': sineOut_1
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(SlideToggle, _React$Component);

  function SlideToggle(props) {
    _classCallCheck(this, SlideToggle);

    var _this = _possibleConstructorReturn(this, (SlideToggle.__proto__ || Object.getPrototypeOf(SlideToggle)).call(this, props));

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

    _this.setCollapsibleElement = _this.setCollapsibleElement.bind(_this);
    _this.onToggle = _this.onToggle.bind(_this);
    _this.setDuration = _this.setDuration.bind(_this);
    _this.setEaseFunction = _this.setEaseFunction.bind(_this);
    _this.setCollapsedState = _this.setCollapsedState.bind(_this);
    _this.collapse = _this.collapse.bind(_this);
    _this.setExpandedState = _this.setExpandedState.bind(_this);
    _this.expand = _this.expand.bind(_this);
    _this.nextTick = _this.nextTick.bind(_this);

    return _this;
  }

  _createClass(SlideToggle, [{
    key: 'setCollapsibleElement',
    value: function setCollapsibleElement() {
      if (!element) {
        warn('no element in setCollapsibleElement');
      }
      this._state_.collasibleElement = element || null;
      if (element) {
        if (this._state_.toggleState === TOGGLE.COLLAPSED) {
          this.setCollapsedState();
        } else if (this._state_.toggleState === TOGGLE.EXPANDED) {
          this.setExpandedState();
        }
      }
    }
  }, {
    key: 'onToggle',
    value: function onToggle() {
      var _this2 = this;

      if (this._state_.isAnimating) {
        log('working.. please wait - isAnimating true');
        return;
      }

      var updateState = function updateState(_ref) {
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

      if (this._state_.toggleState === TOGGLE.EXPANDED) {
        updateState({ toggleState: TOGGLE.COLLAPSING });
        this.setState({ toggleState: TOGGLE.COLLAPSING });
        this.collapse();
      } else if (this._state_.toggleState === TOGGLE.COLLAPSED) {
        updateState({ toggleState: TOGGLE.EXPANDING, display: '' });
        this.setState({ toggleState: TOGGLE.EXPANDING });
        this.expand();
      } else {
        log('error onToggle');
      }
    }
  }, {
    key: 'setDuration',
    value: function setDuration() {
      this._state_.duration = parseInt(duration, 10) || 0;
    }
  }, {
    key: 'setEaseFunction',
    value: function setEaseFunction(ease) {
      if (typeof ease === 'string') {
        this._state_.ease = eases[ease];
        return ease;
      } else if (typeof ease === 'function') {
        this._state_.ease = ease;
        return 'custom function';
      }
    }
  }, {
    key: 'setCollapsedState',
    value: function setCollapsedState() {
      this._state_.collasibleElement.style.display = 'none';
      this._state_.collasibleElement.style.height = '';
      this._state_.toggleState = TOGGLE.COLLAPSED;
      this._state_.isAnimating = false;
      this.setState({ toggleState: TOGGLE.COLLAPSED });
    }
  }, {
    key: 'collapse',
    value: function collapse() {
      if (!this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }

      var duration = this._state_.duration;
      var now = new Date().getTime();
      var elapsedTime = Math.min(duration, now - this._state_.startAnimationTime);
      var range = elapsedTime / duration;
      var progress = 1 - this._state_.ease(range);
      var currentHeightValue = Math.round(this._state_.boxHeight * progress);

      if (elapsedTime < duration) {
        this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        this._state_.timeout = this.nextTick(this.collapse);
      } else {
        this.setCollapsedState();
      }
    }
  }, {
    key: 'setExpandedState',
    value: function setExpandedState() {
      this._state_.collasibleElement.style.height = '';
      this._state_.toggleState = TOGGLE.EXPANDED;
      this._state_.isAnimating = false;
      this.setState({ toggleState: TOGGLE.EXPANDED });
    }
  }, {
    key: 'expand',
    value: function expand() {
      if (!this._state_.collasibleElement) {
        warn('no collapsibleElement');
        return;
      }

      var duration = this._state_.duration;
      var now = new Date().getTime();
      var elapsedTime = Math.min(duration, now - this._state_.startAnimationTime);
      var range = elapsedTime / duration;
      var progress = this._state_.ease(range);
      var currentHeightValue = Math.round(this._state_.boxHeight * progress);

      if (elapsedTime < duration) {
        this._state_.collasibleElement.style.height = currentHeightValue + 'px';
        this.nextTick(this.expand);
      } else {
        this.setExpandedState();
      }
    }
  }, {
    key: 'nextTick',
    value: function nextTick(callback) {
      this._state_.timeout = rAF(callback);
    }
  }, {
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

export { SlideToggle };
