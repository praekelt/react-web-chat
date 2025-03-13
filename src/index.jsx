import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { merge } from 'lodash';
import ChatContainer from './components/ChatContainer';
import * as actionTypes from './actionTypes';
import feersumClient from 'rwc-feersum-client';
import NetworkManager from './utils/network';
import unstyledTheme from './themes/unstyled';
import defaultConfig from './config';
import { createStoreWithState } from './store';

const createNetwork = ({ client, menu, network, store, url }) =>
  new NetworkManager({
    store,
    client:
      client ||
      new feersumClient({
        url,
        config: {
          channel_id: network.channel_id,
          address: network.address,
          startNew: network.startNew,
          retransmissionTimeout: network.retransmissionTimeout || 500,
          retransmissionMaxTimeout: network.retransmissionMaxTimeout,
          retransmissionAttempts: network.retransmissionAttempts,
          schemaVersion: network.schemaVersion,
          menu,
        },
        sockjsOptions: {
          server: () => Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
        },
      }),
  });

const createStore = ({ avatar, menu = {}, network, typingStatus }) =>
  createStoreWithState({
    config: merge({}, defaultConfig, { typingStatus }, { network }, { menu }, { avatar }),
  });

export class ReactWebChatComponent extends Component {
  constructor(props) {
    super(props);
    const { avatar, menu, network, typingStatus, toggleComponent } = this.props;
    this.store = createStore({ avatar, menu, network, typingStatus });
    this.state = {
      initializedNetwork: false,
    };

    this.setNetwork = this.setNetwork.bind(this);
    !toggleComponent && this.initNetwork();
  }

  initNetwork() {
    const { client, menu, network, url } = this.props;
    const networkManager = createNetwork({
      client,
      menu,
      network,
      store: this.store,
      url,
    });
    networkManager.init();
  }

  setNetwork() {
    const { initializedNetwork } = this.state;
    !initializedNetwork && this.initNetwork();
    this.setState({ initializedNetwork: true });
  }

  render() {
    const { theme, toggleComponent } = this.props;
    return (
      <Provider store={this.store}>
        <ChatContainer
          theme={{ ...unstyledTheme, ...theme }}
          toggleComponent={toggleComponent}
          setNetwork={this.setNetwork}
        />
      </Provider>
    );
  }
}

export class ReactWebChat {
  constructor({
    theme = unstyledTheme,
    avatar,
    client,
    element,
    url = 'http://localhost:8080/echo',
    typingStatus,
    network,
    menu,
    toggleComponent,
  } = {}) {
    if (element && element.nodeName) {
      this.element = element;
      this.client = client;
      this.bindEventsToActions();

      ReactDOM.render(
        <ReactWebChatComponent
          theme={theme}
          avatar={avatar || 'http://i.pravatar.cc/300'}
          client={client}
          url={url}
          typingStatus={typingStatus}
          network={network}
          menu={menu}
          toggleComponent={toggleComponent}
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
    Object.values(actionTypes).map((type) =>
      window.addEventListener(`rwc-dispatch-${type}`, ({ detail: { payload } }) =>
        this.store.dispatch({
          type,
          payload,
        })
      )
    );
  }
}

export default ReactWebChat; 