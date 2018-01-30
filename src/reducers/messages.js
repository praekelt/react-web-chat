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
                    message => message.message !== action.payload
                )
            };
        case MESSAGE_QUEUE:
            return {
                ...state,
                messageQueue: [...state.messageQueue, ...action.payload]
            };
        default:
            return state;
    }
};
