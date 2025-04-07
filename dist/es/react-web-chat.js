import React, { useState, Component } from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { merge } from 'lodash';
import { jsx, jsxs } from 'react/jsx-runtime';
import Linkify from 'react-linkify';
import ReactMarkdown from 'react-markdown';
import feersumClient from 'rwc-feersum-client';
import { combineReducers, createStore as createStore$1, compose, applyMiddleware } from 'redux';

const DefaultText = ({
  children
}) => jsx(Linkify, {
  children: jsx(ReactMarkdown, {
    children: children
  })
});
const Message = ({
  text,
  isLocal,
  theme
}) => {
  const TextComponent = theme.TextComponent || DefaultText;
  return jsx("div", {
    className: `Message ${isLocal ? 'Message--local' : ''}`,
    children: jsx(TextComponent, {
      children: text
    })
  });
};

const mapStateToProps$1 = ({
  messages
}) => ({
  messages
});
const MessageList = ({
  theme,
  messages
}) => {
  return jsx("div", {
    className: "MessageList",
    children: messages.map((message, index) => jsx(Message, {
      ...message,
      theme: theme
    }, index))
  });
};
var MessageList$1 = connect(mapStateToProps$1)(MessageList);

const MESSAGE_RECEIVE$1 = 'MESSAGE_RECEIVE';
const MESSAGE_SEND$1 = 'MESSAGE_SEND';
const messageReceive = message => ({
  type: MESSAGE_RECEIVE$1,
  payload: message
});
const messageSend = message => ({
  type: MESSAGE_SEND$1,
  payload: message
});

const InputArea = ({
  InputComponent,
  dispatch
}) => {
  const [value, setValue] = useState('');
  const handleSubmit = text => {
    if (text.trim()) {
      dispatch(messageSend({
        text,
        isLocal: true
      }));
      setValue('');
    }
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(value);
    }
  };
  const DefaultInput = () => jsx("input", {
    type: "text",
    value: value,
    onChange: e => setValue(e.target.value),
    onKeyDown: handleKeyDown,
    placeholder: "Type a message..."
  });
  const Component = InputComponent || DefaultInput;
  return jsx("div", {
    className: "InputArea",
    children: jsx(Component, {
      value: value,
      setValue: setValue,
      onKeyDown: handleKeyDown,
      submitHandler: handleSubmit
    })
  });
};
var InputArea$1 = connect()(InputArea);

const mapStateToProps = ({
  connection
}) => ({
  connection
});
const ChatContainer = ({
  theme,
  connection,
  toggleComponent,
  setNetwork
}) => {
  return jsxs("div", {
    className: "ChatContainer",
    children: [jsx(MessageList$1, {
      theme: theme
    }), jsx(InputArea$1, {
      ...theme
    })]
  });
};
var ChatContainer$1 = connect(mapStateToProps)(ChatContainer);

// @ts-check
/**
 * @ignore
 */
const MESSAGE_ADD = 'MESSAGE_ADD',
  MESSAGE_SEND = 'MESSAGE_SEND',
  MESSAGE_RECEIVE = 'MESSAGE_RECEIVE',
  MESSAGE_QUEUE = 'MESSAGE_QUEUE',
  // Connection
  CONNECTION_ESTABLISHED = 'CONNECTION_ESTABLISHED',
  CONNECTION_ATTEMPTED = 'CONNECTION_ATTEMPTED',
  CONNECTION_DROPPED = 'CONNECTION_DROPPED',
  CONNECTION_LISTENING = 'CONNECTION_LISTENING',
  // PassThrough
  PASSTHROUGH_SEND = 'PASSTHROUGH_SEND',
  PASSTHROUGH_RECEIVE = 'PASSTHROUGH_RECEIVE';

var actionTypes = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CONNECTION_ATTEMPTED: CONNECTION_ATTEMPTED,
    CONNECTION_DROPPED: CONNECTION_DROPPED,
    CONNECTION_ESTABLISHED: CONNECTION_ESTABLISHED,
    CONNECTION_LISTENING: CONNECTION_LISTENING,
    MESSAGE_ADD: MESSAGE_ADD,
    MESSAGE_QUEUE: MESSAGE_QUEUE,
    MESSAGE_RECEIVE: MESSAGE_RECEIVE,
    MESSAGE_SEND: MESSAGE_SEND,
    PASSTHROUGH_RECEIVE: PASSTHROUGH_RECEIVE,
    PASSTHROUGH_SEND: PASSTHROUGH_SEND
});

const NETWORK_ATTEMPT = 'NETWORK_ATTEMPT';
const NETWORK_DROP = 'NETWORK_DROP';
const NETWORK_ESTABLISH = 'NETWORK_ESTABLISH';
const NETWORK_LISTENING = 'NETWORK_LISTENING';
const attempted = () => ({
  type: NETWORK_ATTEMPT
});
const dropped = () => ({
  type: NETWORK_DROP
});
const established = () => ({
  type: NETWORK_ESTABLISH
});
const listening = () => ({
  type: NETWORK_LISTENING
});

class NetworkManager {
  constructor({
    store,
    client
  }) {
    this.store = store;
    this.client = client;
    this.dispatch = store.dispatch;
    this.messageReceiveHandler = this.messageReceiveHandler.bind(this);
    this.passThroughReceiveHandler = this.passThroughReceiveHandler.bind(this);
    this.messageSendHandler = this.messageSendHandler.bind(this);
    this.passThroughSendHandler = this.passThroughSendHandler.bind(this);
  }
  init() {
    this.client.init({
      onAttempt: () => this.dispatch(attempted()),
      onDrop: () => this.dispatch(dropped()),
      onEstablish: () => this.dispatch(established()),
      onListening: () => this.dispatch(listening()),
      onMessage: this.messageReceiveHandler,
      onPassThrough: this.passThroughReceiveHandler
    });
    this.bindEventsToActions();
  }
  messageReceiveHandler(message) {
    this.dispatch(messageReceive(message));
  }
  passThroughReceiveHandler(message) {
    this.dispatch(messageSend(message));
  }
  messageSendHandler(event) {
    this.client.send(event.detail.payload);
  }
  passThroughSendHandler(event) {
    this.client.send(event.detail.payload);
  }
  bindEventsToActions() {
    const {
      eventNamespace
    } = this.store.getState().config.network;
    window.addEventListener(`${eventNamespace}-MESSAGE_SEND`, this.messageSendHandler);
    window.addEventListener(`${eventNamespace}-PASSTHROUGH_SEND`, this.passThroughSendHandler);
  }
}

var unstyledTheme = {
  MessageComponent: Message,
  InputComponent: InputArea
};

var defaultConfig = {
  typingStatus: {
    active: true,
    baseDelay: 200,
    variance: 100,
    letterDelay: 10,
    minDelay: 200,
    maxDelay: 2000
  },
  network: {
    retransmissionTimeout: 500,
    retransmissionAttempts: 10,
    eventNamespace: 'rwc'
  }
};

/** A function that accepts a potential "extra argument" value to be injected later,
 * and returns an instance of the thunk middleware that uses that value
 */
function createThunkMiddleware(extraArgument) {
  // Standard Redux middleware definition pattern:
  // See: https://redux.js.org/tutorials/fundamentals/part-4-store#writing-custom-middleware
  var middleware = function middleware(_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        // The thunk middleware looks for any functions that were passed to `store.dispatch`.
        // If this "action" is really a function, call it and return the result.
        if (typeof action === 'function') {
          // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
          return action(dispatch, getState, extraArgument);
        } // Otherwise, pass the action down the middleware chain as usual


        return next(action);
      };
    };
  };

  return middleware;
}

var thunk = createThunkMiddleware(); // Attach the factory function so users can create a customized version
// with whatever "extra arg" they want to inject into their thunks

thunk.withExtraArgument = createThunkMiddleware;

// @ts-check
const initialState$1 = {
  messages: [],
  messageQueue: []
};
/**
 * @ignore
 */
var messages = (state = initialState$1, action) => {
  switch (action.type) {
    case MESSAGE_ADD:
      return {
        ...state,
        messages: [...state.messages, {
          ...action.payload,
          timeAdded: Date.now()
        }],
        messageQueue: state.messageQueue.filter(message => message.message !== action.payload)
      };
    case MESSAGE_QUEUE:
      return {
        ...state,
        messageQueue: [...state.messageQueue, ...action.payload]
      };
    default:
      return state;
  }
};

// @ts-check
const initialState = {
  established: false,
  connecting: false,
  offline: true,
  listening: false
};

/**
 * @ignore
 */
var connection = (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION_ESTABLISHED:
      return {
        ...state,
        established: true,
        connecting: false,
        offline: false
      };
    case CONNECTION_ATTEMPTED:
      return {
        ...state,
        connecting: true,
        offline: true
      };
    case CONNECTION_DROPPED:
      return {
        ...state,
        established: false,
        connecting: false,
        offline: true,
        listening: false
      };
    case CONNECTION_LISTENING:
      return {
        ...state,
        listening: true
      };
    default:
      return state;
  }
};

// // @ts-check
// import {
//     CONNECTION_ESTABLISHED,
//     CONNECTION_ATTEMPTED,
//     CONNECTION_DROPPED,
//     CONNECTION_LISTENING
// } from '../actionTypes';

/**
 * @ignore
 */
var config = (state = {}, action) => state;

// @ts-check

/**
 * @ignore
 */
const reducers = combineReducers({
  messages,
  connection,
  config
});

// @ts-check
/**
 * Automatically dispatches custom events whenever a redux action is dispatched.
 * @param {Object} store - a redux store instance
 */
const eventEmitterMiddleware = store => next => action => {
  let {
    eventNamespace
  } = store.getState().config.network;
  const event = new CustomEvent(`${eventNamespace}-${action.type}`, {
    detail: {
      payload: action.payload
    }
  });
  window.dispatchEvent(event);
  return next(action);
};

// @ts-check
const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithState = (initialState = {}) => createStore$1(reducers, initialState, composeEnhancers(applyMiddleware(thunk, eventEmitterMiddleware)));
createStoreWithState();

const createNetwork = ({
  client,
  menu,
  network,
  store,
  url
}) => new NetworkManager({
  store,
  client: client || new feersumClient({
    url,
    config: {
      channel_id: network.channel_id,
      address: network.address,
      startNew: network.startNew,
      retransmissionTimeout: network.retransmissionTimeout || 500,
      retransmissionMaxTimeout: network.retransmissionMaxTimeout,
      retransmissionAttempts: network.retransmissionAttempts,
      schemaVersion: network.schemaVersion,
      menu
    },
    sockjsOptions: {
      server: () => Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    }
  })
});
const createStore = ({
  avatar,
  menu = {},
  network,
  typingStatus
}) => createStoreWithState({
  config: merge({}, defaultConfig, {
    typingStatus
  }, {
    network
  }, {
    menu
  }, {
    avatar
  })
});
class ReactWebChatComponent extends Component {
  constructor(props) {
    super(props);
    const {
      avatar,
      menu,
      network,
      typingStatus,
      toggleComponent
    } = this.props;
    this.store = createStore({
      avatar,
      menu,
      network,
      typingStatus
    });
    this.state = {
      initializedNetwork: false
    };
    this.setNetwork = this.setNetwork.bind(this);
    !toggleComponent && this.initNetwork();
  }
  initNetwork() {
    const {
      client,
      menu,
      network,
      url
    } = this.props;
    const networkManager = createNetwork({
      client,
      menu,
      network,
      store: this.store,
      url
    });
    networkManager.init();
  }
  setNetwork() {
    const {
      initializedNetwork
    } = this.state;
    !initializedNetwork && this.initNetwork();
    this.setState({
      initializedNetwork: true
    });
  }
  render() {
    const {
      theme,
      toggleComponent
    } = this.props;
    return /*#__PURE__*/React.createElement(Provider, {
      store: this.store
    }, /*#__PURE__*/React.createElement(ChatContainer$1, {
      theme: {
        ...unstyledTheme,
        ...theme
      },
      toggleComponent: toggleComponent,
      setNetwork: this.setNetwork
    }));
  }
}
class ReactWebChat {
  constructor({
    theme = unstyledTheme,
    avatar,
    client,
    element,
    url = 'http://localhost:8080/echo',
    typingStatus,
    network,
    menu,
    toggleComponent
  } = {}) {
    if (element && element.nodeName) {
      this.element = element;
      this.client = client;
      this.bindEventsToActions();
      ReactDOM.render(/*#__PURE__*/React.createElement(ReactWebChatComponent, {
        theme: theme,
        avatar: avatar || 'http://i.pravatar.cc/300',
        client: client,
        url: url,
        typingStatus: typingStatus,
        network: network,
        menu: menu,
        toggleComponent: toggleComponent
      }), element);
    } else {
      console.error('React Web Chat: expected element passed to constructor to be a DOM node. Received instead: ', element);
    }
  }
  bindEventsToActions() {
    Object.values(actionTypes).map(type => window.addEventListener(`rwc-dispatch-${type}`, ({
      detail: {
        payload
      }
    }) => this.store.dispatch({
      type,
      payload
    })));
  }
}

export { ReactWebChat, ReactWebChatComponent, ReactWebChat as default };
//# sourceMappingURL=react-web-chat.js.map
