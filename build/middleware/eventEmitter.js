"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
// @ts-check
var eventEmitterMiddleware = function eventEmitterMiddleware(store) {
    return function (next) {
        return function (action) {
            var event = new CustomEvent("rwc-" + action.type, {
                detail: {
                    payload: action.payload
                }
            });

            window.dispatchEvent(event);
            return next(action);
        };
    };
};

exports.default = eventEmitterMiddleware;