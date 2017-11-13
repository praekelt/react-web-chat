import { MESSAGE_ADD, MESSAGE_SEND, MESSAGE_RECEIVE, MESSAGE_QUEUE } from '../actionTypes';

/**
 * Action creator: Adds a message to the store.
 * @type Redux action creator
 * @param {object} message 
 * @return {{type: MESSAGE_ADD}} redux action type returned
 */
export const messageAdd = message => ({
    type: MESSAGE_ADD,
    payload: message
});

/**
 * Async action creator:
 * Adds a new message after a delay of 1200 milliseconds. This is designed to simulate the "typing..." state of a chat user.
 * @todo Make timeout duration a configurable setting.
 * @param {object} message 
 * @return {function()} dispatches {@link messageAdd} after 1200ms
 */
export function delayedMessageAdd(message) {
    return dispatch => {
        setTimeout(() => dispatch(messageAdd(message)), 1200);
    };
}

/**
 * Async action creator:
 * Dispatched when a message is received from the server. The message will get added to a dispatch queue.
 * @param {object} message 
 * @return {function()}
 */
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
    };
}

/**
 * Async action creator:
 * Dispatched when a message is received from the server. The message will get added to a dispatch queue.
 * @param {object} message 
 * @return {function()} dispatches {@link messageAdd} action creator and `MESSAGE_SEND` action type
 */
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
