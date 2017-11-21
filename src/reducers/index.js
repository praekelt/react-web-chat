// @ts-check
import { combineReducers } from 'redux';

import messages from './messages';
import connection from './connection';
import config from './config';

/**
 * @ignore
 */
export const reducers = combineReducers({
    messages,
    connection,
    config
});
