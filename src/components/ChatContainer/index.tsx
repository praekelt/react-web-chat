import React from 'react';
import { connect } from 'react-redux';
import MessageList from '../MessageList';
import InputArea from '../InputArea';

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

const mapStateToProps = ({ connection }: { connection: any }) => ({
  connection,
});

export const ChatContainer: React.FC<Props> = ({ theme, connection, toggleComponent, setNetwork }) => {
  return (
    <div className="ChatContainer">
      <MessageList theme={theme} />
      <InputArea {...theme} />
    </div>
  );
};

export default connect(mapStateToProps)(ChatContainer); 