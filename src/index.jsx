import React from 'react';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom'; // Keep for backward compatibility
import { merge } from 'lodash';

import { Provider } from 'react-redux';

import ChatContainer from './components/ChatContainer';
import { createStoreWithState } from './store';
import * as actionTypes from './actionTypes';
import RWCFeersumClient from 'rwc-feersum-client';
import NetworkManager from './utils/network';
import unstyledTheme from './themes/unstyled';
import defaultConfig from './config';

import './themes/default/styles.scss';

// Helper functions
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

// Modern functional component with hooks
export const ReactWebChatComponent = (props) => {
  const {
    avatar,
    menu,
    network,
    typingStatus,
    toggleComponent,
    client,
    url,
    theme
  } = props;
  
  const [initializedNetwork, setInitializedNetwork] = React.useState(false);
  const storeRef = React.useRef(createStore({ avatar, menu, network, typingStatus }));
  
  const initNetwork = React.useCallback(() => {
    const networkManager = createNetwork({
      client,
      menu,
      network,
      store: storeRef.current,
      url
    });
    networkManager.init();
  }, [client, menu, network, url]);
  
  const handleNetworkInit = React.useCallback(() => {
    if (!initializedNetwork) {
      initNetwork();
      setInitializedNetwork(true);
    }
  }, [initializedNetwork, initNetwork]);
  
  React.useEffect(() => {
    if (!toggleComponent) {
      initNetwork();
    }
  }, [toggleComponent, initNetwork]);
  
  return (
    <Provider store={storeRef.current}>
      <ChatContainer
        theme={{ ...unstyledTheme, ...theme }}
        toggleComponent={toggleComponent}
        setNetwork={handleNetworkInit}
      />
    </Provider>
  );
};

// Class for backward compatibility
class ReactWebChat {
  constructor({
    theme,
    avatar,
    client,
    element,
    url,
    typingStatus,
    network,
    menu,
    toggleComponent
  } = {
    theme: unstyledTheme,
    avatar,
    client,
    element,
    url: 'http://localhost:8080/echo',
    typingStatus,
    network,
    menu,
    toggleComponent
  }) {
    if (element && element.nodeName) {
      this.element = element;
      this.client = client;
      this.bindEventsToActions();

      // Use createRoot if React 18 is available
      if (typeof createRoot === 'function') {
        const root = createRoot(element);
        root.render(
          <ReactWebChatComponent
            theme={theme}
            avatar={avatar || 'http://i.pravatar.cc/300'}
            client={client}
            url={url}
            typingStatus={typingStatus}
            network={network}
            menu={menu}
            toggleComponent={toggleComponent}
          />
        );
      } else {
        // Legacy React rendering
        render(
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
      }
    } else {
      console.error(
        'React Web Chat: expected element passed to constructor to be a DOM node. Received instead: ',
        element
      );
    }
  }

  bindEventsToActions() {
    Object.values(actionTypes).forEach(type =>
      window.addEventListener(
        `rwc-dispatch-${type}`,
        ({ detail: { payload } }) =>
          this.store.dispatch({
            type,
            payload
          })
      )
    );
  }
}

// Export the ReactWebChat class as default
export default ReactWebChat; 