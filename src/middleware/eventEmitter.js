// @ts-check
const eventEmitterMiddleware = store => next => action => {
    const event = new CustomEvent(`rwc-${action.type}`, {
        detail: {
            payload: action.payload
        }
    });

    window.dispatchEvent(event);
    return next(action);
};

export default eventEmitterMiddleware;
