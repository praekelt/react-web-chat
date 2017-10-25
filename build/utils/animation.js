"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var easeInOutQuad = exports.easeInOutQuad = function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};
//# sourceMappingURL=animation.js.map