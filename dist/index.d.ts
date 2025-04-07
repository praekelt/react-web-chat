import React, { Component } from 'react';
import { Store } from 'redux';

// Define types for the props and configuration options
export interface NetworkConfig {
  channel_id?: string;
  address?: string;
  startNew?: boolean;
  retransmissionTimeout?: number;
  retransmissionMaxTimeout?: number;
  retransmissionAttempts?: number;
  schemaVersion?: string;
}

export interface MenuConfig {
  [key: string]: any;
}

export interface TypingStatusConfig {
  [key: string]: any;
}

export interface AvatarConfig {
  [key: string]: any;
}

export interface ThemeComponents {
  MessageComponent: React.ComponentType<any>;
  InputComponent: React.ComponentType<any>;
  [key: string]: React.ComponentType<any>;
}

export interface ReactWebChatComponentProps {
  theme?: ThemeComponents;
  avatar?: string;
  client?: any;
  url?: string;
  typingStatus?: TypingStatusConfig;
  network?: NetworkConfig;
  menu?: MenuConfig;
  toggleComponent?: React.ComponentType<any>;
}

export interface ReactWebChatOptions extends ReactWebChatComponentProps {
  element: HTMLElement;
}

// Export the main component class
export declare class ReactWebChatComponent extends Component<ReactWebChatComponentProps> {
  store: Store;
  constructor(props: ReactWebChatComponentProps);
  initNetwork(): void;
  setNetwork(): void;
  render(): JSX.Element;
}

// Export the main class
export declare class ReactWebChat {
  element: HTMLElement;
  client: any;
  store: Store;
  constructor(options: ReactWebChatOptions);
  bindEventsToActions(): void;
}

// Export the default
export default ReactWebChat;

// Export action types
export * from './actionTypes';

// Export store creation function
export { createStoreWithState } from './store'; 