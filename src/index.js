import { createStoreWithState } from './store';
import { merge } from 'lodash';

import { Provider } from 'react-redux';
import 'smoothscroll-polyfill';

import ChatContainer from './components/ChatContainer';

import * as actionTypes from './actionTypes';
import RWCFeersumClient from 'rwc-feersum-client';
import NetworkManager from './utils/network';
import defaultTheme from './themes/default';
import defaultConfig from './config';
import network from '../es/utils/network';

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
export const ReactWebChatComponent = ({
    theme,
    client,
    url,
    typingStatus,
    network
}) => {
    const store = createStoreWithState({
        config: merge({}, defaultConfig, { typingStatus }, { network })
    });
    const networkManager = new NetworkManager({
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
                    schemaVersion: network.schemaVersion
                }
            })
    });
    networkManager.init();
    return (
        <Provider store={store}>
            <ChatContainer theme={{ ...defaultTheme, ...theme }} />
        </Provider>
    );
};

/**
 * The wrapping constructor module which renders {@link ReactWebChatComponent} to the target element
 */
class ReactWebChat {
    constructor(
        { theme, client, element, url, network } = {
            theme: defaultTheme,
            client,
            element,
            url: 'http://localhost:8080/echo',
            network
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
            ReactDOM.render(
                <ReactWebChatComponent
                    theme={theme}
                    client={client}
                    url={url}
                    network={network}
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
