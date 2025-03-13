import { messageReceive, messageSend } from '../actions/messages';
import { attempted, dropped, established, listening } from '../actions/network';
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

interface CustomEventDetail {
  payload: any;
}

interface NetworkManagerConfig {
  store: Store;
  client: NetworkClient;
}

class NetworkManager {
  private store: Store;
  private client: NetworkClient;
  private dispatch: Store['dispatch'];

  constructor({ store, client }: NetworkManagerConfig) {
    this.store = store;
    this.client = client;
    this.dispatch = store.dispatch;

    this.messageReceiveHandler = this.messageReceiveHandler.bind(this);
    this.passThroughReceiveHandler = this.passThroughReceiveHandler.bind(this);
    this.messageSendHandler = this.messageSendHandler.bind(this);
    this.passThroughSendHandler = this.passThroughSendHandler.bind(this);
  }

  init(): void {
    this.client.init({
      onAttempt: () => this.dispatch(attempted()),
      onDrop: () => this.dispatch(dropped()),
      onEstablish: () => this.dispatch(established()),
      onListening: () => this.dispatch(listening()),
      onMessage: this.messageReceiveHandler,
      onPassThrough: this.passThroughReceiveHandler,
    });

    this.bindEventsToActions();
  }

  private messageReceiveHandler(message: any): void {
    this.dispatch(messageReceive(message));
  }

  private passThroughReceiveHandler(message: any): void {
    this.dispatch(messageSend(message));
  }

  private messageSendHandler(event: CustomEvent<CustomEventDetail>): void {
    this.client.send(event.detail.payload);
  }

  private passThroughSendHandler(event: CustomEvent<CustomEventDetail>): void {
    this.client.send(event.detail.payload);
  }

  private bindEventsToActions(): void {
    const { eventNamespace } = this.store.getState().config.network;

    window.addEventListener(
      `${eventNamespace}-MESSAGE_SEND`,
      this.messageSendHandler as unknown as EventListener
    );

    window.addEventListener(
      `${eventNamespace}-PASSTHROUGH_SEND`,
      this.passThroughSendHandler as unknown as EventListener
    );
  }
}

export default NetworkManager; 