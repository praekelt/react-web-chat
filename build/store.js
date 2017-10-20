'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _index = require('./reducers/index');

var _eventEmitter = require('./middleware/eventEmitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var middlewares = [_eventEmitter2.default]; // @ts-check


var middleware = _redux.applyMiddleware.apply(undefined, middlewares);

if (window.devToolsExtension) {
    middleware = (0, _redux.compose)(middleware, window.devToolsExtension());
}

exports.default = (0, _redux.createStore)(_index.reducers, middleware);
//# sourceMappingURL=store.js.map