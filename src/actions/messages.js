import { MESSAGE_ADD, MESSAGE_SEND, MESSAGE_RECEIVE } from '../actionTypes';

export const messageAdd = message => ({
    type: MESSAGE_ADD,
    payload: message
});

export function messageReceive(message) {
    return dispatch => {
        dispatch({
            type: MESSAGE_RECEIVE,
            payload: message
        });
        dispatch(messageAdd(message));
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
