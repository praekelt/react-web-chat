import React from 'react';
import PropTypes from 'prop-types';
import AvatarContainer from './AvatarContainer';
import MessageContainer from './MessageContainer';
import Message from './Message';
import AttachmentMessage from './AttachmentMessage';

/**
 * MessageListItem - Component for rendering a single message item in the list
 */
const MessageListItem = ({ message, prevMessageOrigin, submitHandler, theme, itemRef }) => {
  const isLocal = message.origin !== 'remote';

  return (
    <li
      className={`MessagesList-item ${isLocal ? 'is-local' : ''}`}
      ref={itemRef}
    >
      {!isLocal && prevMessageOrigin && (
        <AvatarContainer AvatarComponent={theme.AvatarComponent} />
      )}
      <div className="MessagesList-messageItem">
        <MessageContainer
          origin={message.origin}
          layout={message.layout}
          type={message.type}
          userId={message.userId}
          pages={message.pages}
        >
          {message.pages &&
            message.pages.map((page, i) => (
              <Message
                key={`message-page-${i}`}
                page={page}
                isLocal={isLocal}
                submitHandler={submitHandler}
                {...theme}
              />
            ))}
        </MessageContainer>
        {message.message_type === 'attachment' && (
          <MessageContainer key={`attachment-${message.timeAdded}`} {...message}>
            <AttachmentMessage
              message={message}
              submitHandler={submitHandler}
            />
          </MessageContainer>
        )}
      </div>
    </li>
  );
};

MessageListItem.propTypes = {
  message: PropTypes.shape({
    origin: PropTypes.string,
    layout: PropTypes.string,
    type: PropTypes.string,
    userId: PropTypes.string,
    pages: PropTypes.array,
    message_type: PropTypes.string,
    timeAdded: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  prevMessageOrigin: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  itemRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};

export default MessageListItem; 