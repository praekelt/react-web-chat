// @ts-check
import { combineReducers } from 'redux';

import messages from './messages';
import connection from './connection';

/**
 * @ignore
 */
export const reducers = combineReducers({
    messages,
    connection
});
