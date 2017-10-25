import {
    CONNECTION_ESTABLISHED,
    CONNECTION_ATTEMPTED,
    CONNECTION_DROPPED,
    CONNECTION_LISTENING
} from '../actionTypes';

export const established = message => ({
    type: CONNECTION_ESTABLISHED
});

export const attempted = message => ({
    type: CONNECTION_ATTEMPTED
});

export const dropped = message => ({
    type: CONNECTION_DROPPED
});

export const listening = message => ({
    type: CONNECTION_LISTENING
});
