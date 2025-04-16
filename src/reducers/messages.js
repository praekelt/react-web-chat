// @ts-check
import { MESSAGE_ADD, MESSAGE_QUEUE } from '../actionTypes';

const initialState = {
    messages: [],
    messageQueue: []
};
/**
 * @ignore
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_ADD:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    {
                        ...action.payload,
                        timeAdded: Date.now()
                    }
                ],
                messageQueue: state.messageQueue.filter(
                    message => {
                        // Ensure we're checking safely for objects with a message property
                        if (!message || typeof message !== 'object') {
                            return true; // Keep items we can't check properly
                        }
                        // Check if message has a message property
                        if (!('message' in message)) {
                            return true;
                        }
                        // Use bracket notation for safer access
                        return message['message'] !== action.payload;
                    }
                )
            };
        case MESSAGE_QUEUE:
            // Ensure payload is always treated as an array for safety
            const queueItems = Array.isArray(action.payload) ? action.payload : [action.payload];
            return {
                ...state,
                messageQueue: [...state.messageQueue, ...queueItems]
            };
        default:
            return state;
    }
};
