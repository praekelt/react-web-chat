// @ts-check
import { createStore, applyMiddleware, compose } from 'redux';

import { reducers } from './reducers/index';

import eventEmitterMiddleware from './middleware/eventEmitter';

let middlewares = [eventEmitterMiddleware];

let middleware = applyMiddleware(...middlewares);

if (window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension());
}

export default createStore(reducers, middleware);
