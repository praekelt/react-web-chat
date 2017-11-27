// @ts-check
import { MESSAGE_ADD, MESSAGE_SEND, PASSTHROUGH_SEND, PASSTHROUGH_RECEIVE } from '../actionTypes';

import * as connectionActions from '../actions/connection';
import * as messageActions from '../actions/messages';

/**
 * Network manager that handles message sending and receiving.
 * @type {Object}
 * @property {function()} networkManager.init Initilises network client and binds events
 * @property {function()} networkManager.messageReceiveHandler Dispatches redux action when message is received from client
 * @property {function()} networkManager.connectionCloseHandler Dispatches redux action when connection is dropped. Also retries connection.
 * @property {function()} networkManager.connectionRetry Recursively retries network connection
 */
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

        this.passThroughSendHandler = this.passThroughSendHandler.bind(this);
        this.passThroughReceiveHandler = this.passThroughReceiveHandler.bind(this);

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

    connectionRetry(count = 0) {
        let {
            retransmissionTimeout,
            retransmissionAttempts
        } = this.store.getState().config.network;

        if (count < retransmissionAttempts)
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
                            this.connectionRetry(count + 1);
                        }),
                retransmissionTimeout
            );
    },

    messageSendHandler({ detail: { payload } }) {
        this.client.send(JSON.stringify(payload));
    },

    passThroughSendHandler({ detail: { payload } }) {
        this.client.send(JSON.stringify(payload));
    },

    passThroughReceiveHandler(message) {
        this.dispatch({
            type: PASSTHROUGH_RECEIVE,
            payload: message
        });
    },

    bindActionEvents() {
        let { eventNamespace } = this.store.getState().config.network;
        window.addEventListener(`${eventNamespace}-${MESSAGE_SEND}`, this.messageSendHandler);
        window.addEventListener(
            `${eventNamespace}-${PASSTHROUGH_SEND}`,
            this.passThroughSendHandler
        );
    },

    subscribe() {
        this.store.subscribe(() => {
            if (
                !this.subscribed &&
                this.store.getState().connection.established &&
                !this.store.getState().connection.listening
            ) {
                this.client.onmessage(this.messageReceiveHandler);
                this.client.onpassthrough(this.passThroughReceiveHandler);
                this.client.onclose(this.connectionCloseHandler);
                this.store.dispatch(connectionActions.listening());
                this.subscribed = true;
            }
        });
    }
};

export default networkManager;
