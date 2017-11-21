// @ts-check
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers/index';
import eventEmitterMiddleware from './middleware/eventEmitter';

let middlewares = [eventEmitterMiddleware, thunk];

let middleware = applyMiddleware(...middlewares);

if (window.devToolsExtension) {
    middleware = compose(middleware, window.devToolsExtension());
}

export default createStore(reducers, middleware);
export const createStoreWithState = initialState => createStore(reducers, initialState, middleware);
