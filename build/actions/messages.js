'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.messageAdd = undefined;
exports.messageReceive = messageReceive;
exports.messageSend = messageSend;

var _actionTypes = require('../actionTypes');

var messageAdd = exports.messageAdd = function messageAdd(message) {
    return {
        type: _actionTypes.MESSAGE_ADD,
        payload: message
    };
};

function messageReceive(message) {
    return function (dispatch) {
        dispatch({
            type: _actionTypes.MESSAGE_RECEIVE,
            payload: message
        });
        dispatch(messageAdd(message));
    };
}

function messageSend(_ref) {
    var text = _ref.text;

    var message = {
        text: text,
        responseType: 'text',
        origin: 'local'
    };
    return function (dispatch) {
        dispatch({
            type: _actionTypes.MESSAGE_SEND,
            payload: message
        });
        dispatch(messageAdd(message));
    };
}