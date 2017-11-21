// @ts-check
/**
 * Automatically dispatches custom events whenever a redux action is dispatched.
 * @param {Object} store - a redux store instance
 */
const eventEmitterMiddleware = store => next => action => {
    let { eventNamespace } = store.getState().config.network;
    const event = new CustomEvent(`${eventNamespace}-${action.type}`, {
        detail: {
            payload: action.payload
        }
    });

    window.dispatchEvent(event);
    return next(action);
};

export default eventEmitterMiddleware;
