export default eventEmitterMiddleware;
/**
 * Automatically dispatches custom events whenever a redux action is dispatched.
 * @param {Object} store - a redux store instance
 */
declare function eventEmitterMiddleware(store: any): (next: any) => (action: any) => any;
