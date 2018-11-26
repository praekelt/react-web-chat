// @ts-check
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers/index';
import eventEmitterMiddleware from './middleware/eventEmitter';

let middlewares = [eventEmitterMiddleware, thunk];

// let middleware = applyMiddleware(...middlewares);

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              name: 'react-web-chat'
          })
        : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// if (window.devToolsExtension) {
//     middleware = compose(
//         middleware,
//         window.devToolsExtension()
//     );
// }

export default createStore(reducers, enhancer);
export const createStoreWithState = initialState => 
    createStore(reducers, initialState, enhancer);
