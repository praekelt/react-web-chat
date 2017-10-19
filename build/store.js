'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _index = require('./reducers/index');

// @ts-check
var middlewares = [];

var middleware = _redux.applyMiddleware.apply(undefined, middlewares);

if (window.devToolsExtension) {
    middleware = (0, _redux.compose)(middleware, window.devToolsExtension());
}

exports.default = (0, _redux.createStore)(_index.reducers, middleware);
//# sourceMappingURL=store.js.map