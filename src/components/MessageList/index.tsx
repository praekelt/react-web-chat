import React from 'react';
import { connect } from 'react-redux';
import Message from '../Message';

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

const mapStateToProps = ({ messages }: { messages: any[] }) => ({
  messages,
});

export const MessageList: React.FC<Props> = ({ theme, messages }) => {
  return (
    <div className="MessageList">
      {messages.map((message, index) => (
        <Message key={index} {...message} theme={theme} />
      ))}
    </div>
  );
};

export default connect(mapStateToProps)(MessageList); 