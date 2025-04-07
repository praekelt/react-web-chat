import React from 'react';
interface Theme {
    ImageComponent?: React.ComponentType<any>;
    InputComponent?: React.ComponentType<any>;
    MessageComponent?: React.ComponentType<any>;
    TextComponent?: React.ComponentType<any>;
}
interface Props {
    theme: Theme;
    messages: any[];
}
export declare const MessageList: React.FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, {
    theme: Theme;
    context?: import("react-redux/es/components/Context").ReactReduxContextInstance;
    store?: import("redux").Store;
}>;
export default _default;
