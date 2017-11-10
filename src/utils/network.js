// @ts-check
import { MESSAGE_ADD, MESSAGE_SEND } from '../actionTypes';

import * as connectionActions from '../actions/connection';
import * as messageActions from '../actions/messages';

const networkManager = {
    init({ store, client, url }) {
        this.url = url;
        this.dispatch = store.dispatch;
        this.client = client;
        this.store = store;
        this.dispatch(connectionActions.attempted());
        this.subscribed = false;
        this.messageSendHandler = this.messageSendHandler.bind(this);
        this.messageReceiveHandler = this.messageReceiveHandler.bind(this);
        this.connectionCloseHandler = this.connectionCloseHandler.bind(this);
        client
            .init(url)
            .then(_ => {
                this.bindActionEvents();
                this.dispatch(connectionActions.established());
            })
            .catch(error => {
                console.error('react-web-chat connection error: ', error);
                this.connectionRetry();
            });
        this.subscribe();
    },

    messageReceiveHandler(message) {
        this.dispatch(messageActions.messageReceive(message));
    },

    connectionCloseHandler(event) {
        this.dispatch(connectionActions.dropped());
        this.connectionRetry();
    },

    connectionRetry() {
        setTimeout(
            () =>
                this.client
                    .init(this.url)
                    .then(_ => {
                        this.bindActionEvents();
                        this.dispatch(connectionActions.established());
                        this.subscribe();
                    })
                    .catch(error => {
                        console.error('react-web-chat connection error: ', error);
                        this.connectionRetry();
                    }),
            500
        );
    },

    messageSendHandler({ detail: { payload } }) {
        this.client.send(JSON.stringify(payload));
    },

    bindActionEvents() {
        window.addEventListener(`rwc-${MESSAGE_SEND}`, this.messageSendHandler);
    },

    subscribe() {
        this.store.subscribe(() => {
            if (
                !this.subscribed &&
                this.store.getState().connection.established &&
                !this.store.getState().connection.listening
            ) {
                this.client.onmessage(this.messageReceiveHandler);
                this.client.onclose(this.connectionCloseHandler);
                this.store.dispatch(connectionActions.listening());
                this.subscribed = true;
            }
        });
    }
};

export default networkManager;
