import { compose } from 'redux';
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
export declare const createStoreWithState: (initialState?: {}) => import("redux").Store<import("redux").EmptyObject & {
    messages: {
        messages: any[];
        messageQueue: any[];
    };
    connection: {
        established: boolean;
        connecting: boolean;
        offline: boolean;
        listening: boolean;
    };
    config: {};
}, import("redux").AnyAction> & {
    dispatch: unknown;
};
declare const _default: import("redux").Store<import("redux").EmptyObject & {
    messages: {
        messages: any[];
        messageQueue: any[];
    };
    connection: {
        established: boolean;
        connecting: boolean;
        offline: boolean;
        listening: boolean;
    };
    config: {};
}, import("redux").AnyAction> & {
    dispatch: unknown;
};
export default _default;
