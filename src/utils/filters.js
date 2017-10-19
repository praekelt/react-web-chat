// @ts-check

/**
 * Checks if a message belongs to remote
 * @param {Object} message
 */
export const remoteMessage = message => message.origin === 'remote';
