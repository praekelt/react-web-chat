'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLatestRemote = undefined;

var _filters = require('./filters');

/**
 * Returns the latest remote message
 * @param {Array} messages 
 */
var getLatestRemote = exports.getLatestRemote = function getLatestRemote(messages) {
  return messages.filter(_filters.remoteMessage).pop();
}; // @ts-check
//# sourceMappingURL=helpers.js.map