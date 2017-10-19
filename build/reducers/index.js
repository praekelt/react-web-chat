'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducers = undefined;

var _redux = require('redux');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = exports.reducers = (0, _redux.combineReducers)({
    messages: _messages2.default,
    connection: _connection2.default
}); // @ts-check
//# sourceMappingURL=index.js.map