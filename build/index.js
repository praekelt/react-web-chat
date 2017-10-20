'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReactWebChatComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // @ts-check


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _reactRedux = require('react-redux');

var _ChatContainer = require('./components/ChatContainer');

var _ChatContainer2 = _interopRequireDefault(_ChatContainer);

var _default = require('./themes/default');

var _default2 = _interopRequireDefault(_default);

var _actionTypes = require('./actionTypes');

var actionTypes = _interopRequireWildcard(_actionTypes);

var _rwcFeersumClient = require('rwc-feersum-client');

var _rwcFeersumClient2 = _interopRequireDefault(_rwcFeersumClient);

var _network = require('./utils/network');

var _network2 = _interopRequireDefault(_network);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The main react component for React Web Chat
 * @param {Object} params - An object containing configuration parameters
 * @param {Object} params.theme - Custom theme
 * @param {Object} params.client - Which client to use for network communication
 */
var ReactWebChatComponent = exports.ReactWebChatComponent = function ReactWebChatComponent(_ref) {
    var theme = _ref.theme,
        _ref$client = _ref.client,
        client = _ref$client === undefined ? _rwcFeersumClient2.default : _ref$client;

    _network2.default.init({
        store: _store2.default,
        client: client,
        url: 'http://localhost:8080/echo'
    });
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: _store2.default },
        _react2.default.createElement(_ChatContainer2.default, { theme: _extends({}, _default2.default, theme) })
    );
};

/**
 * The wrapping constructor module which exposes an interace
 * @param {Object} params - An object containing configuration parameters
 * @param {Object} params.theme - Custom theme
 * @param {Object} params.client - Which client to use for network communication
 * @param {Object} params.elemt - A target element to render to
 */

var ReactWebChat = function () {
    function ReactWebChat() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { theme: _default2.default, client: client, element: element },
            theme = _ref2.theme,
            client = _ref2.client,
            element = _ref2.element;

        _classCallCheck(this, ReactWebChat);

        this.eventHandlers = { message: [], connection: [] };
        if (element && element.nodeName) {
            this.element = element;
            this.client = client;
            this.bindEventsToActions();
            _reactDom2.default.render(_react2.default.createElement(ReactWebChatComponent, { theme: theme, client: client }), element);
        } else {
            console.error('React Web Chat: expected element passed to constructor to be a DOM node. Recieved instead: ', element);
        }
    }

    _createClass(ReactWebChat, [{
        key: 'bindEventsToActions',
        value: function bindEventsToActions() {
            Object.values(actionTypes).map(function (type) {
                return window.addEventListener('rwc-dispatch-' + type, function (_ref3) {
                    var payload = _ref3.detail.payload;
                    return _store2.default.dispatch({
                        type: type,
                        payload: payload
                    });
                });
            });
        }
    }]);

    return ReactWebChat;
}();

exports.default = ReactWebChat;
//# sourceMappingURL=index.js.map