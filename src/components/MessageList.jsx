import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import smoothScrollTo from 'smooth-scroll-to-js';
import AvatarContainer from './AvatarContainer';

import MessageContainer from './MessageContainer';
import * as messageActions from '../actions/messages';
import MessageListItem from './MessageListItem';

/**
 * MessageList - Component for rendering the list of messages in the chat
 */
const MessageList = ({ theme }) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.messages);
  const messageQueue = useSelector(state => state.messages.messageQueue);
  const config = useSelector(state => state.config);
  
  const lastMsgRef = useRef(null);
  const containerRef = useRef(null);

  const submitHandler = (message, type = 'button') => {
    dispatch(
      messageActions.messageSend({
        ...message,
        type: type
      })
    );
  };

  // Scroll to the newest message
  useEffect(() => {
    if (lastMsgRef.current && containerRef.current) {
      smoothScrollTo({
        to: lastMsgRef.current,
        container: containerRef.current,
        duration: 1
      });
    }
  }, [messages]);

  return (
    <div className="ChatContainer-content" ref={containerRef}>
      <ul className="MessagesList">
        {messages.length < 1 && (
          <li className="MessagesList-item is-local loading-chat">
            <AvatarContainer AvatarComponent={theme.AvatarComponent} />
            <div className="MessagesList-messageItem">
              <MessageContainer key="typing">
                <theme.TypingIndicatorComponent {...config.TypingIndicator} />
              </MessageContainer>
            </div>
          </li>
        )}
        {messages.map((message, i) => (
          <MessageListItem
            key={message.timeAdded}
            {...{
              message,
              prevMessageOrigin: i === 0 || messages[i - 1].origin === 'local',
              submitHandler,
              theme,
              ...(messages.length - 1 === i && {
                itemRef: lastMsgRef
              })
            }}
          />
        ))}
        {messageQueue.length && config.typingStatus.active ? (
          <li>
            <MessageContainer key="typing">
              <theme.TypingIndicatorComponent {...config.TypingIndicator} />
            </MessageContainer>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

MessageList.propTypes = {
  theme: PropTypes.shape({
    AvatarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ImageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    InputComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    MessageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    TextComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    TypingIndicatorComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
  })
};

export default MessageList; 