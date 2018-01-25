import {
    MESSAGE_ADD,
    MESSAGE_SEND,
    MESSAGE_RECEIVE,
    MESSAGE_QUEUE
} from '../actionTypes';
import TypingIndicator from '../themes/default/components/TypingIndicator/index';

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
// export function delayedMessageAdd(message) {
//     return (dispatch, getState) => {
//         let {
//             delay,
//             variance,
//             varianceMethod,
//             active
//         } = getState().config.typingStatus;
//         let queueDelay = 0;

//         switch (varianceMethod) {
//             case 'fixed':
//                 queueDelay = Math.round(
//                     delay + variance * Math.round(1.5 + Math.random() * -3)
//                 );
//                 break;
//             case 'range':
//             default:
//                 queueDelay = Math.round(
//                     delay + variance * (1 + Math.random() * -2)
//                 );
//         }

//         setTimeout(
//             () => dispatch(messageAdd(message)),
//             active ? queueDelay : 0
//         );
//     };
// }

/**
 * Async action creator:
 * Waits until the delay is over and then handles the message queue.
 * @return {function()} dispatches {@link messageAdd} after a delay.
 */
export function waitForMessage() {
    return (dispatch, getState) => {
        let {
            delay,
            variance,
            varianceMethod,
            active
        } = getState().config.typingStatus;
        let queueDelay = 0;

        switch (varianceMethod) {
            case 'fixed':
                queueDelay = Math.round(
                    delay + variance * Math.round(1.5 + Math.random() * -3)
                );
                break;
            case 'range':
            default:
                queueDelay = Math.round(
                    delay + variance * (1 + Math.random() * -2)
                );
        }

        delay = setTimeout(() => {
            let messageNotHere = setInterval(() => {
                let messageQueue = getState().messages.messageQueue;
                if (messageQueue.length > 0) {
                    dispatch(messageAdd(messageQueue[0]));
                    clearInterval(messageNotHere);
                }
            }, 10);
            let messageQueue = getState().messages.messageQueue;
            if (messageQueue.length > 0) {
                dispatch(waitForMessage());
                clearTimeout(delay);
            }
        }, active ? queueDelay : 0);
    };
}

/**
 * Async action creator:
 * Dispatched when a message is received from the server. The message will get added to a dispatch queue.
 * @param {object} message
 * @return {function()}
 */
export function messageReceive(message) {
    return (dispatch, getState) => {
        let messages = getState().messages.messages;
        // Catch following messages or add first message.
        if (messages.length > 0) {
            dispatch({
                type: MESSAGE_QUEUE,
                payload: message
            });
        } else {
            dispatch(messageAdd(message));
        }
        dispatch({
            type: MESSAGE_RECEIVE,
            payload: message
        });
    };
}

/**
 * Async action creator:
 * Dispatched when a message is sent by the user.
 * @param {object} message
 * @return {function()} dispatches {@link messageAdd} action creator and `MESSAGE_SEND` action type
 */
export function messageSend({ postback, text, type }) {
    let message = {
        type: type || 'text',
        origin: 'local',
        postback,
        text
    };
    return dispatch => {
        dispatch({
            type: MESSAGE_SEND,
            payload: message
        });
        if (text) {
            dispatch(messageAdd(message));
        }
        dispatch(waitForMessage());
    };
}
