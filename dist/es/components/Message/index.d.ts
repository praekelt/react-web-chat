import React from 'react';
interface Theme {
    ImageComponent?: React.ComponentType<any>;
    TextComponent?: React.ComponentType<any>;
}
interface Props {
    text: string;
    isLocal?: boolean;
    theme: Theme;
}
export declare const Message: React.FC<Props>;
export default Message;
