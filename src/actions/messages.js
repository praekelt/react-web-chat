import { MESSAGE_ADD, MESSAGE_SEND, MESSAGE_RECEIVE, MESSAGE_QUEUE } from '../actionTypes';

export const messageAdd = message => ({
    type: MESSAGE_ADD,
    payload: message
});

export function delayedMessageAdd(message) {
    return dispatch => {
        setTimeout(() => dispatch(messageAdd(message)), 1200);
    };
}

export function messageReceive(message) {
    return dispatch => {
        dispatch({
            type: MESSAGE_QUEUE,
            payload: message
        });
        dispatch({
            type: MESSAGE_RECEIVE,
            payload: message
        });
        //dispatch(messageAdd(message));
    };
}

export function messageSend({ text }) {
    let message = {
        pages: [{ text: text, buttons: [] }],
        responseType: 'text',
        origin: 'local'
    };
    return dispatch => {
        dispatch({
            type: MESSAGE_SEND,
            payload: message
        });
        dispatch(messageAdd(message));
    };
}
