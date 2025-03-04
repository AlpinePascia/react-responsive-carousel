"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _cssClasses = _interopRequireDefault(require("../cssClasses"));

var _dimensions = require("../dimensions");

var _CSSTranslate = _interopRequireDefault(require("../CSSTranslate"));

var _reactEasySwipe = _interopRequireDefault(require("react-easy-swipe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Thumbs =
/*#__PURE__*/
function (_Component) {
  _inherits(Thumbs, _Component);

  function Thumbs(_props) {
    var _this;

    _classCallCheck(this, Thumbs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Thumbs).call(this, _props));

    _defineProperty(_assertThisInitialized(_this), "setItemsWrapperRef", function (node) {
      _this.itemsWrapperRef = node;
    });

    _defineProperty(_assertThisInitialized(_this), "setItemsListRef", function (node) {
      _this.itemsListRef = node;
    });

    _defineProperty(_assertThisInitialized(_this), "setThumbsRef", function (node, index) {
      if (!_this.thumbsRef) {
        _this.thumbsRef = [];
      }

      _this.thumbsRef[index] = node;
    });

    _defineProperty(_assertThisInitialized(_this), "updateSizes", function () {
      if (!_this.props.children || !_this.itemsWrapperRef) {
        return;
      }

      var total = _this.props.children.length;
      var wrapperSize = _this.itemsWrapperRef.clientWidth;
      var itemSize = _this.props.thumbWidth ? _this.props.thumbWidth : (0, _dimensions.outerWidth)(_this.thumbsRef[0]);
      var visibleItems = Math.floor(wrapperSize / itemSize);
      var lastPosition = total - visibleItems;
      var showArrows = visibleItems < total;

      _this.setState(function (_state, props) {
        return {
          itemSize: itemSize,
          visibleItems: visibleItems,
          firstItem: showArrows ? _this.getFirstItem(props.selectedItem) : 0,
          lastPosition: lastPosition,
          showArrows: showArrows
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setMountState", function () {
      _this.setState({
        hasMount: true
      });

      _this.updateSizes();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClickItem", function (index, item, e) {
      if (!e.keyCode || e.key === 'Enter') {
        var handler = _this.props.onSelectItem;

        if (typeof handler === 'function') {
          handler(index, item);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onSwipeStart", function () {
      _this.setState({
        swiping: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSwipeEnd", function () {
      _this.setState({
        swiping: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSwipeMove", function (deltaX) {
      var leftBoundary = 0;
      var currentPosition = -_this.state.firstItem * _this.state.itemSize;
      var lastLeftBoundary = -_this.state.visibleItems * _this.state.itemSize; // prevent user from swiping left out of boundaries

      if (currentPosition === leftBoundary && deltaX > 0) {
        deltaX = 0;
      } // prevent user from swiping right out of boundaries


      if (currentPosition === lastLeftBoundary && deltaX < 0) {
        deltaX = 0;
      }

      var wrapperSize = _this.itemsWrapperRef.clientWidth;
      var position = currentPosition + 100 / (wrapperSize / deltaX) + '%'; // if 3d isn't available we will use left to move

      if (_this.itemsListRef) {
        ['WebkitTransform', 'MozTransform', 'MsTransform', 'OTransform', 'transform', 'msTransform'].forEach(function (prop) {
          _this.itemsListRef.style[prop] = (0, _CSSTranslate["default"])(position, _this.props.axis);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "slideRight", function (positions) {
      _this.moveTo(_this.state.firstItem - (typeof positions === 'number' ? positions : 1));
    });

    _defineProperty(_assertThisInitialized(_this), "slideLeft", function (positions) {
      _this.moveTo(_this.state.firstItem + (typeof positions === 'number' ? positions : 1));
    });

    _defineProperty(_assertThisInitialized(_this), "moveTo", function (position) {
      // position can't be lower than 0
      position = position < 0 ? 0 : position; // position can't be higher than last postion

      position = position >= _this.lastPosition ? _this.lastPosition : position;

      _this.setState({
        firstItem: position,
        // if it's not a slider, we don't need to set position here
        selectedItem: _this.state.selectedItem
      });
    });

    _this.state = {
      selectedItem: _props.selectedItem,
      hasMount: false,
      firstItem: 0,
      itemSize: null,
      visibleItems: 0,
      lastPosition: 0,
      showArrows: false,
      images: _this.getImages()
    };
    return _this;
  }

  _createClass(Thumbs, [{
    key: "componentDidMount",
    value: function componentDidMount(nextProps) {
      this.setupThumbs();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(props, state) {
      if (props.selectedItem !== this.state.selectedItem) {
        this.setState({
          selectedItem: props.selectedItem,
          firstItem: this.getFirstItem(props.selectedItem)
        });
      }

      if (props.children !== this.props.children) {
        this.setState({
          images: this.getImages()
        });
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.children === prevProps.children) {
        return;
      } // This will capture any size changes for arrow adjustments etc.
      // usually in the same render cycle so we don't see any flickers


      this.updateSizes();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.destroyThumbs();
    }
  }, {
    key: "setupThumbs",
    value: function setupThumbs() {
      // as the widths are calculated, we need to resize
      // the carousel when the window is resized
      window.addEventListener("resize", this.updateSizes); // issue #2 - image loading smaller

      window.addEventListener("DOMContentLoaded", this.updateSizes); // when the component is rendered we need to calculate
      // the container size to adjust the responsive behaviour

      this.updateSizes();
    }
  }, {
    key: "destroyThumbs",
    value: function destroyThumbs() {
      // removing listeners
      window.removeEventListener("resize", this.updateSizes);
      window.removeEventListener("DOMContentLoaded", this.updateSizes);
    }
  }, {
    key: "getImages",
    value: function getImages() {
      var images = _react.Children.map(this.props.children, function (item, index) {
        var img = item; // if the item is not an image, try to find the first image in the item's children.

        if (item.type !== "img") {
          img = _react.Children.toArray(item.props.children).filter(function (children) {
            return children.type === "img";
          })[0];
        }

        if (!img || img.length === 0) {
          return null;
        }

        return img;
      });

      if (images.filter(function (image) {
        return image !== null;
      }).length === 0) {
        console.warn("No images found! Can't build the thumb list without images. If you don't need thumbs, set showThumbs={false} in the Carousel. Note that it's not possible to get images rendered inside custom components. More info at https://github.com/leandrowd/react-responsive-carousel/blob/master/TROUBLESHOOTING.md");
        return null;
      }

      return images;
    }
  }, {
    key: "getFirstItem",
    value: function getFirstItem(selectedItem) {
      var firstItem = selectedItem;

      if (selectedItem >= this.state.lastPosition) {
        firstItem = this.state.lastPosition;
      }

      if (selectedItem < this.state.firstItem + this.state.visibleItems) {
        firstItem = this.state.firstItem;
      }

      if (selectedItem < this.state.firstItem) {
        firstItem = selectedItem;
      }

      return firstItem;
    }
  }, {
    key: "renderItems",
    value: function renderItems() {
      var _this2 = this;

      return this.state.images.map(function (img, index) {
        var itemClass = _cssClasses["default"].ITEM(false, index === _this2.state.selectedItem && _this2.state.hasMount);

        var thumbProps = {
          key: index,
          ref: function ref(e) {
            return _this2.setThumbsRef(e, index);
          },
          className: itemClass,
          onClick: _this2.handleClickItem.bind(_this2, index, _this2.props.children[index]),
          onKeyDown: _this2.handleClickItem.bind(_this2, index, _this2.props.children[index])
        };

        if (index === 0) {
          img = _react["default"].cloneElement(img, {
            onLoad: _this2.setMountState
          });
        }

        return _react["default"].createElement("li", _extends({}, thumbProps, {
          role: "button",
          tabIndex: 0
        }), img);
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.children) {
        return null;
      } // show left arrow?


      var hasPrev = this.state.showArrows && this.state.firstItem > 0; // show right arrow

      var hasNext = this.state.showArrows && this.state.firstItem < this.state.lastPosition; // obj to hold the transformations and styles

      var itemListStyles = {};
      var currentPosition = -this.state.firstItem * this.state.itemSize + 'px';
      var transformProp = (0, _CSSTranslate["default"])(currentPosition, this.props.axis);
      var transitionTime = this.props.transitionTime + 'ms';
      itemListStyles = {
        'WebkitTransform': transformProp,
        'MozTransform': transformProp,
        'MsTransform': transformProp,
        'OTransform': transformProp,
        'transform': transformProp,
        'msTransform': transformProp,
        'WebkitTransitionDuration': transitionTime,
        'MozTransitionDuration': transitionTime,
        'MsTransitionDuration': transitionTime,
        'OTransitionDuration': transitionTime,
        'transitionDuration': transitionTime,
        'msTransitionDuration': transitionTime
      };
      return _react["default"].createElement("div", {
        className: _cssClasses["default"].CAROUSEL(false)
      }, _react["default"].createElement("div", {
        className: _cssClasses["default"].WRAPPER(false),
        ref: this.setItemsWrapperRef
      }, _react["default"].createElement("button", {
        type: "button",
        className: _cssClasses["default"].ARROW_PREV(!hasPrev),
        onClick: this.slideRight
      }), _react["default"].createElement(_reactEasySwipe["default"], {
        tagName: "ul",
        className: _cssClasses["default"].SLIDER(false, this.state.swiping),
        onSwipeLeft: this.slideLeft,
        onSwipeRight: this.slideRight,
        onSwipeMove: this.onSwipeMove,
        onSwipeStart: this.onSwipeStart,
        onSwipeEnd: this.onSwipeEnd,
        style: itemListStyles,
        ref: this.setItemsListRef
      }, this.renderItems()), _react["default"].createElement("button", {
        type: "button",
        className: _cssClasses["default"].ARROW_NEXT(!hasNext),
        onClick: this.slideLeft
      })));
    }
  }]);

  return Thumbs;
}(_react.Component);

_defineProperty(Thumbs, "displayName", 'Thumbs');

_defineProperty(Thumbs, "propsTypes", {
  children: _propTypes["default"].element.isRequired,
  transitionTime: _propTypes["default"].number,
  selectedItem: _propTypes["default"].number,
  thumbWidth: _propTypes["default"].number
});

_defineProperty(Thumbs, "defaultProps", {
  selectedItem: 0,
  transitionTime: 350,
  axis: 'horizontal'
});

var _default = Thumbs;
exports["default"] = _default;