import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Fade } from '../themes/default/components/Animation';

import MessageList from './MessageList';
import InputArea from './InputArea';

/**
 * ChatContainer - The main container for the chat interface
 */
const ChatContainer = ({ theme, toggleComponent, setNetwork }) => {
  const connection = useSelector(state => state.connection);
  const [hasError, setHasError] = useState(false);
  const [showChat, setShowChat] = useState(!toggleComponent);

  // Error boundary functionality
  useEffect(() => {
    const errorHandler = (error) => {
      setHasError(true);
      console.error('Chat error:', error);
    };
    
    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  const toggleShowChat = () => {
    setShowChat(!showChat);
    setNetwork && setNetwork();
  };

  if (hasError) return <Fragment />;

  return (
    <React.Fragment>
      {toggleComponent && (
        <div>
          <button
            aria-label="Open Chat"
            onClick={toggleShowChat}
            className="ChatContainer-button ChatContainer-buttonOpen"
            style={{
              visibility: showChat ? 'hidden' : 'visible'
            }}
          >
            {toggleComponent}
          </button>
          {showChat && (
            <button
              aria-label="Close Chat"
              onClick={toggleShowChat}
              className="ChatContainer-button ChatContainer-buttonClose"
            >
              &times;
            </button>
          )}
        </div>
      )}
      {showChat && (
        <Fade in={true} appear={true}>
          <div className="ChatContainer">
            <MessageList theme={theme} />
            <InputArea {...theme} />
          </div>
        </Fade>
      )}
    </React.Fragment>
  );
};

ChatContainer.propTypes = {
  theme: PropTypes.shape({
    ImageComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    InputComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    MessageComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ]),
    TextComponent: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.func
    ])
  }),
  toggleComponent: PropTypes.node,
  setNetwork: PropTypes.func
};

export default ChatContainer; 