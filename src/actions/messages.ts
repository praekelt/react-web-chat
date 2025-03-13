import { Action } from 'redux';

export const MESSAGE_RECEIVE = 'MESSAGE_RECEIVE';
export const MESSAGE_SEND = 'MESSAGE_SEND';

interface MessageReceiveAction extends Action {
  type: typeof MESSAGE_RECEIVE;
  payload: any;
}

interface MessageSendAction extends Action {
  type: typeof MESSAGE_SEND;
  payload: any;
}

export type MessageActionTypes = MessageReceiveAction | MessageSendAction;

export const messageReceive = (message: any): MessageReceiveAction => ({
  type: MESSAGE_RECEIVE,
  payload: message,
});

export const messageSend = (message: any): MessageSendAction => ({
  type: MESSAGE_SEND,
  payload: message,
}); 