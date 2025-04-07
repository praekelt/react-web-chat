import React from 'react';
interface Props {
    InputComponent?: React.ComponentType<any>;
    dispatch: (action: any) => void;
}
export declare const InputArea: React.FC<Props>;
declare const _default: import("react-redux").ConnectedComponent<React.FC<Props>, {
    InputComponent?: React.ComponentType<any>;
    context?: import("react-redux/es/components/Context").ReactReduxContextInstance;
    store?: import("redux").Store;
}>;
export default _default;
