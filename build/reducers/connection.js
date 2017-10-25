'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


var _actionTypes = require('../actionTypes');

var initialState = {
    established: false,
    connecting: false,
    offline: true,
    listening: false
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actionTypes.CONNECTION_ESTABLISHED:
            return _extends({}, state, { established: true, connecting: false, offline: false });
        case _actionTypes.CONNECTION_ATTEMPTED:
            return _extends({}, state, { connecting: true, offline: true });
        case _actionTypes.CONNECTION_DROPPED:
            return _extends({}, state, {
                established: false,
                connecting: false,
                offline: true,
                listening: false
            });
        case _actionTypes.CONNECTION_LISTENING:
            return _extends({}, state, {
                listening: true
            });
        default:
            return state;
    }
};
//# sourceMappingURL=connection.js.map