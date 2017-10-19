'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MessageList = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(_ref) {
    var messages = _ref.messages;

    return { messages: messages.messages };
};

var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    messages: _propTypes2.default.object,
    MessageComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    ImageComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
}), (0, _reactRedux.connect)(mapStateToProps));

var MessageList = exports.MessageList = function MessageList(_ref2) {
    var messages = _ref2.messages,
        MessageComponent = _ref2.MessageComponent,
        ImageComponent = _ref2.ImageComponent;

    return _react2.default.createElement(
        'ul',
        null,
        messages.map(function (message, i) {
            return _react2.default.createElement(
                'li',
                { key: i },
                _react2.default.createElement(MessageComponent, _extends({}, message, { ImageComponent: ImageComponent }))
            );
        })
    );
};

exports.default = enhance(MessageList);
//# sourceMappingURL=index.js.map