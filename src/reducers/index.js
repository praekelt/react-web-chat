// @ts-check
import { combineReducers } from 'redux';

import messages from './messages';
import connection from './connection';

export const reducers = combineReducers({
    messages,
    connection
});
