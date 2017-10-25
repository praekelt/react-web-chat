'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.listening = exports.dropped = exports.attempted = exports.established = undefined;

var _actionTypes = require('../actionTypes');

var established = exports.established = function established(message) {
    return {
        type: _actionTypes.CONNECTION_ESTABLISHED
    };
};

var attempted = exports.attempted = function attempted(message) {
    return {
        type: _actionTypes.CONNECTION_ATTEMPTED
    };
};

var dropped = exports.dropped = function dropped(message) {
    return {
        type: _actionTypes.CONNECTION_DROPPED
    };
};

var listening = exports.listening = function listening(message) {
    return {
        type: _actionTypes.CONNECTION_LISTENING
    };
};
//# sourceMappingURL=connection.js.map