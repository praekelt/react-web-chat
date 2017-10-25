'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// @ts-check

/**
 * Checks if a message belongs to remote
 * @param {Object} message
 */
var remoteMessage = exports.remoteMessage = function remoteMessage(message) {
  return message.origin === 'remote';
};