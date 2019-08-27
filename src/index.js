import React, { Component } from 'react';
import { render } from 'react-dom';

import { createStoreWithState } from './store';
import { merge } from 'lodash';

import { Provider } from 'react-redux';

import ChatContainer from './components/ChatContainer';

import * as actionTypes from './actionTypes';
import RWCFeersumClient from 'rwc-feersum-client';
import NetworkManager from './utils/network';
import unstyledTheme from './themes/unstyled';
import defaultConfig from './config';

/**
 * The main react component for React Web Chat
 * @param {Object} params - An object containing configuration parameters
 * @param {Object} params.theme - Custom theme
 * @param {String} params.url - Chat server url to post messages to
 * @param {Object} params.client - Which client to use for network communication
 * @param {Object} params.typingStatus - A list of configuration options for the typing status indicator
 * @param {Object} params.network - A list of configuration options for network communication
 * @return {Object} React component
 */

const createNetwork = ({ client, menu, network, store, url }) =>
    new NetworkManager({
        store,
        client:
            client ||
            new RWCFeersumClient({
                url,
                config: {
                    channel_id: network.channel_id,
                    address: network.address,
                    startNew: network.startNew,
                    retransmissionTimeout: network.retransmissionTimeout || 500,
                    retransmissionMaxTimeout: network.retransmissionMaxTimeout,
                    retransmissionAttempts: network.retransmissionAttempts,
                    schemaVersion: network.schemaVersion,
                    menu: menu
                }
            })
    });

const createStore = ({ avatar, menu = {}, network, typingStatus }) =>
    createStoreWithState({
        config: merge(
            {},
            defaultConfig,
            { typingStatus },
            { network },
            { menu },
            { avatar }
        )
    });

export class ReactWebChatComponent extends Component {
    constructor(props) {
        super(props);
        const { avatar, client, menu, network, typingStatus, url } = this.props;
        this.store = createStore({ avatar, menu, network, typingStatus });
        const networkManager = createNetwork({
            client,
            menu,
            network,
            store: this.store,
            url
        });
        networkManager.init();
    }

    render() {
        const { theme, toggleComponent } = this.props;
        return (
            <Provider store={this.store}>
                <ChatContainer theme={{ ...unstyledTheme, ...theme }} toggleComponent={toggleComponent}/>
            </Provider>
        );
    }
}

/**
 * The wrapping constructor module which renders {@link ReactWebChatComponent} to the target element
 */
class ReactWebChat {
    constructor(
        { theme, avatar, client, element, url, typingStatus, network, menu } = {
            theme: unstyledTheme,
            avatar,
            client,
            element,
            url: 'http://localhost:8080/echo',
            typingStatus,
            network,
            menu
        }
    ) {
        if (element && element.nodeName) {
            /**
             * @type {Element}
             */
            this.element = element;
            /**
             * @type {Object}
             */
            this.client = client;
            this.bindEventsToActions();

            render(
                <ReactWebChatComponent
                    theme={theme}
                    avatar={avatar || 'http://i.pravatar.cc/300'}
                    client={client}
                    url={url}
                    typingStatus={typingStatus}
                    network={network}
                    menu={menu}
                />,
                element
            );
        } else {
            console.error(
                'React Web Chat: expected element passed to constructor to be a DOM node. Received instead: ',
                element
            );
        }
    }

    bindEventsToActions() {
        Object.values(actionTypes).map(type =>
            window.addEventListener(
                `rwc-dispatch-${type}`,
                ({ detail: { payload } }) =>
                    store.dispatch({
                        type,
                        payload
                    })
            )
        );
    }
}

export default ReactWebChat;
