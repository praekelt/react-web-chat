import { compose } from 'redux';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
export declare const createStoreWithState: (initialState?: {}) => import("redux").Store<{}, import("redux").Action<any>> & {
    dispatch: unknown;
};
declare const _default: import("redux").Store<{}, import("redux").Action<any>> & {
    dispatch: unknown;
};
export default _default;
