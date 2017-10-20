'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _actionTypes = require('../actionTypes');

var networkManager = {
    init: function init(_ref) {
        var store = _ref.store,
            client = _ref.client,
            url = _ref.url;

        client.init(url).then(function (_) {
            store.dispatch({ type: _actionTypes.CONNECTION_ESTABLISHED });
        });
        store.subscribe(function () {
            if (store.getState().connection.established && !store.getState().connection.listening) {
                client.onmessage(function (res) {
                    store.dispatch({ type: _actionTypes.MESSAGE_ADD, payload: JSON.parse(res.data) });
                });
                store.dispatch({ type: _actionTypes.CONNECTION_LISTENING });
            }
        });
    }
}; // @ts-check
exports.default = networkManager;
//# sourceMappingURL=network.js.map