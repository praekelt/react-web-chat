// @ts-check
import {
    CONNECTION_ESTABLISHED,
    CONNECTION_ATTEMPTED,
    CONNECTION_DROPPED,
    CONNECTION_LISTENING
} from '../actionTypes';

const initialState = {
    established: false,
    connecting: false,
    offline: true,
    listening: false
};

/**
 * @ignore
 */
export default (state = initialState, action) => {
    switch (action.type) {
        case CONNECTION_ESTABLISHED:
            return { ...state, established: true, connecting: false, offline: false };
        case CONNECTION_ATTEMPTED:
            return { ...state, connecting: true, offline: true };
        case CONNECTION_DROPPED:
            return {
                ...state,
                established: false,
                connecting: false,
                offline: true,
                listening: false
            };
        case CONNECTION_LISTENING:
            return {
                ...state,
                listening: true
            };
        default:
            return state;
    }
};
