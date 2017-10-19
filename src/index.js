// @ts-check
import React from 'react';
import store from './store';

import { Provider } from 'react-redux';
import {
    ADD_MESSAGE,
    CONNECTION_ESTABLISHED,
    CONNECTION_ATTEMPTED,
    CONNECTION_DROPPED,
    CONNECTION_LISTENING
} from './actionTypes';

import ChatContainer from './components/ChatContainer';
import defaultTheme from './themes/default';

import feersumClient from 'rwc-feersum-client';

feersumClient.init('http://localhost:8080/echo').then(_ => {
    store.dispatch({ type: CONNECTION_ESTABLISHED });
});

store.subscribe(() => {
    if (store.getState().connection.established && !store.getState().connection.listening) {
        console.log('CONNECTED :D');
        feersumClient.send('HELLO!!!');
        feersumClient.onmessage(res => {
            store.dispatch({ type: ADD_MESSAGE, message: JSON.parse(res.data) });
        });
        store.dispatch({ type: CONNECTION_LISTENING });
    }
});

export default ({ theme }) => {
    console.log('THEME', theme);
    return (
        <Provider store={store}>
            <ChatContainer theme={{ ...defaultTheme, ...theme }} />
        </Provider>
    );
};
