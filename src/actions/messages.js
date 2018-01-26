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

let popping = false;
let waitingForMessage = false;

/**
 * Async action creator:
 * Dispatched when a message is received from the server. The message will get added to a dispatch queue
 * if not the first message. The message queue is then popped off into the message store based on the delays given.
 * @param {object} message
 * @return {function()}
 */
export function messageReceive(message) {
    return (dispatch, getState) => {
        let { messages, messageQueue } = getState().messages;
        let {
            delay,
            variance,
            varianceMethod,
            active
        } = getState().config.typingStatus;
        let queueDelay = 0;

        if (active) {
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
        }

        // Catch following messages or add first message.
        if (
            messageQueue.length === 0 &&
            !waitingForMessage &&
            (messages.length === 0 ||
                Date.now() - messages[messages.length - 1].timeAdded >
                    queueDelay)
        ) {
            dispatch(messageAdd(message));
        } else {
            waitingForMessage = false;
            dispatch({
                type: MESSAGE_QUEUE,
                payload: {
                    message: message,
                    delay: () =>
                        new Promise(resolve =>
                            setTimeout(() => {
                                dispatch(messageAdd(message));
                                resolve();
                            }, queueDelay)
                        )
                }
            });
            if (!popping) {
                popping = true;
                dispatch(popMessages());
            }
        }
        dispatch({
            type: MESSAGE_RECEIVE,
            payload: message
        });
    };
}

export function popMessages() {
    return (dispatch, getState) => {
        let messageQueue = getState().messages.messageQueue;
        let delay = messageQueue[0].delay;
        delay().then(() => {
            let messageQueue = getState().messages.messageQueue;
            if (messageQueue.length > 0) {
                dispatch(popMessages());
            } else {
                popping = false;
            }
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
        waitingForMessage = true;
        dispatch({
            type: MESSAGE_SEND,
            payload: message
        });
        if (text) {
            dispatch(messageAdd(message));
        }
    };
}
