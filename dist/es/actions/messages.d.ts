import { Action } from 'redux';
export declare const MESSAGE_RECEIVE = "MESSAGE_RECEIVE";
export declare const MESSAGE_SEND = "MESSAGE_SEND";
interface MessageReceiveAction extends Action {
    type: typeof MESSAGE_RECEIVE;
    payload: any;
}
interface MessageSendAction extends Action {
    type: typeof MESSAGE_SEND;
    payload: any;
}
export type MessageActionTypes = MessageReceiveAction | MessageSendAction;
export declare const messageReceive: (message: any) => MessageReceiveAction;
export declare const messageSend: (message: any) => MessageSendAction;
export {};
