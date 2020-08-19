// @ts-check
import {
    MESSAGE_SEND,
    PASSTHROUGH_SEND,
    PASSTHROUGH_RECEIVE
} from '../actionTypes';

import * as connectionActions from '../actions/connection';
import * as messageActions from '../actions/messages';

/** A general network manager utility class that handles message sending and receiving through a supplied transport */
class NetworkManager {
    /**
     * Create a point.
     * @param {object} arguments
     * @param {object} arguments.store - The redux store to dispatch actions against
     * @param {object} arguments.client - The transport client to use for network communication
     */
    constructor({ store, client }) {
        this.dispatch = store.dispatch;
        this.client = client;
        this.store = store;

        this.messageSendHandler = this.messageSendHandler.bind(this);
        this.passThroughSendHandler = this.passThroughSendHandler.bind(this);
    }

    /**
     * Initilise the network transport and bind event handlers
     */
    init() {
        this.client.init({
            message: this.messageReceiveHandler.bind(this),
            passThrough: this.passThroughReceiveHandler.bind(this),
            connection: {
                close: this.connectionCloseHandler.bind(this),
                attempt: this.connectionAttemptHandler.bind(this),
                open: this.connectionOpenHandler.bind(this)
            }
        });
    }

    messageReceiveHandler(message) {
        this.dispatch(messageActions.messageReceive(message));
    }

    passThroughReceiveHandler(message) {
        this.dispatch({
            type: PASSTHROUGH_RECEIVE,
            payload: message
        });
    }

    connectionOpenHandler() {
        this.dispatch(connectionActions.established());
        this.bindActionEvents();
    }

    connectionCloseHandler() {
        this.dispatch(connectionActions.dropped());
    }

    connectionAttemptHandler() {
        this.dispatch(connectionActions.attempted());
    }

    messageSendHandler({ detail: { payload } }) {
        this.client.send(payload);
    }

    passThroughSendHandler({ detail: { payload } }) {
        this.client.send(payload);
    }

    /**
     * Add global event handlers for messages/passthroughs triggered outside of RWC.
     */
    bindActionEvents() {
        let { eventNamespace } = this.store.getState().config.network;
        window.addEventListener(
            `${eventNamespace}-${MESSAGE_SEND}`,
            this.messageSendHandler
        );
        window.addEventListener(
            `${eventNamespace}-${PASSTHROUGH_SEND}`,
            this.passThroughSendHandler
        );
    }
}

export default NetworkManager;
