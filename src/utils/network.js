// @ts-check
import {
    MESSAGE_ADD,
    CONNECTION_ESTABLISHED,
    CONNECTION_ATTEMPTED,
    CONNECTION_DROPPED,
    CONNECTION_LISTENING
} from '../actionTypes';

const networkManager = {
    init({ store, client, url }) {
        client.init(url).then(_ => {
            store.dispatch({ type: CONNECTION_ESTABLISHED });
        });
        store.subscribe(() => {
            if (store.getState().connection.established && !store.getState().connection.listening) {
                client.onmessage(res => {
                    store.dispatch({ type: MESSAGE_ADD, payload: JSON.parse(res.data) });
                });
                store.dispatch({ type: CONNECTION_LISTENING });
            }
        });
    }
};

export default networkManager;
