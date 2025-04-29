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
        try {
            // Handle possible string JSON format
            let parsedMessage;
            
            if (typeof message === 'string') {
                try {
                    parsedMessage = JSON.parse(message);
                } catch (jsonError) {
                    console.error('Error parsing message JSON:', jsonError);
                    parsedMessage = { 
                        text: message,
                        pages: [{ text: message }]
                    };
                }
            } else {
                parsedMessage = message;
            }
            
            // Ensure message has required structure before dispatching
            if (!parsedMessage || typeof parsedMessage !== 'object') {
                console.error('Invalid message format received:', message);
                return;
            }
            
            // Add pages array if missing
            if (!parsedMessage.pages || !Array.isArray(parsedMessage.pages)) {
                parsedMessage.pages = [{
                    text: parsedMessage.text || '',
                    title: parsedMessage.title || '',
                    buttons: parsedMessage.buttons || []
                }];
            }
            
            this.dispatch(messageActions.messageReceive(parsedMessage));
        } catch (error) {
            console.error('Error processing incoming message:', error);
        }
    }

    /**
     * Ensures all messages have a consistent format with required properties
     * @param {object} message - The raw message object
     * @return {object} - Normalized message object with proper structure
     */
    normalizeMessageFormat(message) {
        // If message already has pages property, return as is
        if (message.pages && Array.isArray(message.pages)) {
            return message;
        }
        
        // Create a normalized message with pages array
        return {
            ...message,
            pages: [{
                text: message.text || '',
                title: message.title || '',
                buttons: message.buttons || [],
                image: message.image || null
            }]
        };
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
        
        // Use string event names directly without type assertions
        window.addEventListener(
            `${eventNamespace}-${MESSAGE_SEND}`,
            this.messageSendHandler
        );
        window.addEventListener(
            `${eventNamespace}-${PASSTHROUGH_SEND}`,
            this.passThroughSendHandler
        );
        
        // @ts-ignore - these are custom events with detail payload
    }
}

export default NetworkManager;
