// @ts-check
import { MESSAGE_ADD } from '../actionTypes';

const initialState = {
    messages: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE_ADD:
            return { ...state, messages: [...state.messages, action.payload] };
        default:
            return state;
    }
};
