'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


var _actionTypes = require('../actionTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var initialState = {
    messages: [{
        text: 'Hi there!',
        responseType: 'text',
        origin: 'remote',
        images: [{
            url: 'http://loremflickr.com/320/240',
            text: 'This is an image'
        }]
    }]
};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case _actionTypes.MESSAGE_ADD:
            return _extends({}, state, { messages: [].concat(_toConsumableArray(state.messages), [action.payload]) });
        default:
            return state;
    }
};
//# sourceMappingURL=messages.js.map