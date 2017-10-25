// @ts-check

import { remoteMessage } from './filters';

/**
 * Returns the latest remote message
 * @param {Array} messages 
 */
export const getLatestRemote = messages => messages.filter(remoteMessage).pop();
