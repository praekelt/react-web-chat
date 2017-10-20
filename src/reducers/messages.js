// @ts-check
import { MESSAGE_ADD } from '../actionTypes';

const initialState = {
    messages: [
        {
            text: 'Hi there!',
            responseType: 'text',
            origin: 'remote',
            images: [
                {
                    url: 'http://loremflickr.com/320/240',
                    text: 'This is an image'
                }
            ]
        }
    ]
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_ADD:
            return { ...state, messages: [...state.messages, action.payload] };
        default:
            return state;
    }
};
