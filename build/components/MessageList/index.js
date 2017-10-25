'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _animation = require('../../utils/animation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // @ts-check


var mapStateToProps = function mapStateToProps(_ref) {
    var messages = _ref.messages;

    return { messages: messages.messages };
};

var MessageList = function (_React$Component) {
    _inherits(MessageList, _React$Component);

    function MessageList(props) {
        _classCallCheck(this, MessageList);

        var _this = _possibleConstructorReturn(this, (MessageList.__proto__ || Object.getPrototypeOf(MessageList)).call(this, props));

        _this.state = {
            offset: 0
        };
        return _this;
    }

    _createClass(MessageList, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log('CHILDREN');
            var targetOffset = [].concat(_toConsumableArray(this._ref.children)).reduce(function (acc, curr) {
                return acc + curr.offsetHeight;
            }, 0);
            this._ref.scrollTop = targetOffset;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                messages = _props.messages,
                ImageComponent = _props.ImageComponent,
                MessageComponent = _props.MessageComponent;

            return _react2.default.createElement(
                'ul',
                { className: 'ChatContainer-content', ref: function ref(_ref2) {
                        return _this2._ref = _ref2;
                    } },
                messages.map(function (message, i) {
                    return _react2.default.createElement(
                        'li',
                        { key: i },
                        _react2.default.createElement(MessageComponent, _extends({}, message, { ImageComponent: ImageComponent }))
                    );
                })
            );
        }
    }]);

    return MessageList;
}(_react2.default.Component);

MessageList.PropTypes = {
    messages: _propTypes2.default.object,
    MessageComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    ImageComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(MessageList);
//# sourceMappingURL=index.js.map