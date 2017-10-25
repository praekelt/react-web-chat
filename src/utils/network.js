// @ts-check
import { MESSAGE_ADD, MESSAGE_SEND } from '../actionTypes';

import * as connectionActions from '../actions/connection';
import * as messageActions from '../actions/messages';

const networkManager = {
    init({ store, client, url }) {
        this.dispatch = store.dispatch;
        this.client = client;
        this.dispatch(connectionActions.attempted());
        client.init(url).then(_ => {
            this.bindActionEvents();
            this.dispatch(connectionActions.established());
        });
        store.subscribe(() => {
            if (store.getState().connection.established && !store.getState().connection.listening) {
                client.onmessage(this.messageReceiveHandler.bind(this));
                store.dispatch(connectionActions.listening());
            }
        });
    },

    messageReceiveHandler(message) {
        this.dispatch(messageActions.messageReceive(message));
    },

    messageSendHandler({ detail: { payload } }) {
        this.client.send(JSON.stringify(payload));
    },

    bindActionEvents() {
        window.addEventListener(`rwc-${MESSAGE_SEND}`, this.messageSendHandler.bind(this));
    }
};

export default networkManager;
