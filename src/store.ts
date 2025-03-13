// @ts-check
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import eventEmitterMiddleware from './middleware/eventEmitter';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const createStoreWithState = (initialState = {}) =>
  createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk, eventEmitterMiddleware))
  );

export default createStoreWithState();
