import {
    CONNECTION_ESTABLISHED,
    CONNECTION_ATTEMPTED,
    CONNECTION_DROPPED,
    CONNECTION_LISTENING
} from '../actionTypes';

/**
 * Sets connection to established
 * @return {{type: CONNECTION_ESTABLISHED}} redux action type returned
 */
export const established = _ => ({
    type: CONNECTION_ESTABLISHED
});

/**
 * Sets connection to attempted
 * @return {{type: CONNECTION_ATTEMPTED}} redux action type returned
 */
export const attempted = _ => ({
    type: CONNECTION_ATTEMPTED
});

/**
 * Sets connection to offline
 * @return {{type: CONNECTION_DROPPED}} redux action type returned
 */
export const dropped = _ => ({
    type: CONNECTION_DROPPED
});

/**
 * Sets connection to listening
 * @return {{type: CONNECTION_LISTENING}} redux action type returned
 */
export const listening = _ => ({
    type: CONNECTION_LISTENING
});
