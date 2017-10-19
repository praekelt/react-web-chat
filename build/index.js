'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactRedux = require('react-redux');

var _actionTypes = require('./actionTypes');

var _ChatContainer = require('./components/ChatContainer');

var _ChatContainer2 = _interopRequireDefault(_ChatContainer);

var _default = require('./themes/default');

var _default2 = _interopRequireDefault(_default);

var _rwcFeersumClient = require('rwc-feersum-client');

var _rwcFeersumClient2 = _interopRequireDefault(_rwcFeersumClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_rwcFeersumClient2.default.init('http://localhost:8080/echo').then(function (_) {
    _store2.default.dispatch({ type: _actionTypes.CONNECTION_ESTABLISHED });
});

_store2.default.subscribe(function () {
    if (_store2.default.getState().connection.established && !_store2.default.getState().connection.listening) {
        console.log('CONNECTED :D');
        _rwcFeersumClient2.default.send('HELLO!!!');
        _rwcFeersumClient2.default.onmessage(function (res) {
            _store2.default.dispatch({ type: _actionTypes.ADD_MESSAGE, message: JSON.parse(res.data) });
        });
        _store2.default.dispatch({ type: _actionTypes.CONNECTION_LISTENING });
    }
});

exports.default = function (_ref) {
    var theme = _ref.theme;

    console.log('THEME', theme);
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: _store2.default },
        _react2.default.createElement(_ChatContainer2.default, { theme: _extends({}, _default2.default, theme) })
    );
};
//# sourceMappingURL=index.js.map