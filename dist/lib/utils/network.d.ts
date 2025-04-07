import { Store } from 'redux';
interface NetworkClient {
    init(config: {
        onAttempt: () => void;
        onDrop: () => void;
        onEstablish: () => void;
        onListening: () => void;
        onMessage: (message: any) => void;
        onPassThrough: (message: any) => void;
    }): void;
    send(payload: any): void;
}
interface NetworkManagerConfig {
    store: Store;
    client: NetworkClient;
}
declare class NetworkManager {
    private store;
    private client;
    private dispatch;
    constructor({ store, client }: NetworkManagerConfig);
    init(): void;
    private messageReceiveHandler;
    private passThroughReceiveHandler;
    private messageSendHandler;
    private passThroughSendHandler;
    private bindEventsToActions;
}
export default NetworkManager;
