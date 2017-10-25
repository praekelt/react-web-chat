'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = require('../actionTypes');

var _connection = require('../actions/connection');

var connectionActions = _interopRequireWildcard(_connection);

var _messages = require('../actions/messages');

var messageActions = _interopRequireWildcard(_messages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var networkManager = {
    init: function init(_ref) {
        var _this = this;

        var store = _ref.store,
            client = _ref.client,
            url = _ref.url;

        this.dispatch = store.dispatch;
        this.client = client;
        this.dispatch(connectionActions.attempted());
        client.init(url).then(function (_) {
            _this.bindActionEvents();
            _this.dispatch(connectionActions.established());
        });
        store.subscribe(function () {
            if (store.getState().connection.established && !store.getState().connection.listening) {
                client.onmessage(_this.messageReceiveHandler.bind(_this));
                store.dispatch(connectionActions.listening());
            }
        });
    },
    messageReceiveHandler: function messageReceiveHandler(message) {
        this.dispatch(messageActions.messageReceive(message));
    },
    messageSendHandler: function messageSendHandler(_ref2) {
        var payload = _ref2.detail.payload;

        this.client.send(JSON.stringify(payload));
    },
    bindActionEvents: function bindActionEvents() {
        window.addEventListener('rwc-' + _actionTypes.MESSAGE_SEND, this.messageSendHandler.bind(this));
    }
}; // @ts-check
exports.default = networkManager;