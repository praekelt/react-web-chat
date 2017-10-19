// @ts-check
import { ADD_MESSAGE } from '../actionTypes';

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
        case ADD_MESSAGE:
            return { ...state, messages: [...state.messages, action.message] };
        default:
            return state;
    }
};
