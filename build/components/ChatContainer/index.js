'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatContainer = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _MessageList = require('../MessageList');

var _MessageList2 = _interopRequireDefault(_MessageList);

var _InputArea = require('../InputArea');

var _InputArea2 = _interopRequireDefault(_InputArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check
var mapStateToProps = function mapStateToProps(_ref) {
    var connection = _ref.connection;

    return { connection: connection };
};

var enhance = (0, _recompose.compose)((0, _recompose.setPropTypes)({
    theme: _propTypes2.default.shape({
        ImageComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
        InputComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
        MessageComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
    })
}), (0, _reactRedux.connect)(mapStateToProps));

var ChatContainer = exports.ChatContainer = function ChatContainer(_ref2) {
    var theme = _ref2.theme,
        connection = _ref2.connection;

    return _react2.default.createElement(
        'div',
        { className: 'ChatContainer' },
        _react2.default.createElement(_MessageList2.default, theme),
        _react2.default.createElement(
            _InputArea2.default,
            { InputComponent: theme.InputComponent },
            _react2.default.createElement(
                'h1',
                null,
                'FOO'
            )
        )
    );
};

exports.default = enhance(ChatContainer);
//# sourceMappingURL=index.js.map