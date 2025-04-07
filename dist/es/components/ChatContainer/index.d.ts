import React from 'react';
interface Theme {
    ImageComponent?: React.ComponentType<any>;
    InputComponent?: React.ComponentType<any>;
    MessageComponent?: React.ComponentType<any>;
    TextComponent?: React.ComponentType<any>;
}
interface Props {
    theme: Theme;
    connection: any;
    toggleComponent?: boolean;
    setNetwork?: () => void;
}
export declare const ChatContainer: React.FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, {
    theme: Theme;
    toggleComponent?: boolean;
    setNetwork?: () => void;
    context?: import("react-redux/es/components/Context").ReactReduxContextInstance;
    store?: import("redux").Store;
}>;
export default _default;
