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
  const isLocal = message.origin === 'local';

  return (
    <li
      className={`MessagesList-item${isLocal ? ' is-local' : ''}`}
      ref={itemRef}
    >
      {!isLocal && prevMessageOrigin && (
        <AvatarContainer AvatarComponent={theme.AvatarComponent} />
      )}
      <div className="MessagesList-messageItem">
        <MessageContainer key="text" {...message}>
          {!isLocal ? (
            message.pages.map((page, i) => (
              <Message
                key={i}
                page={page}
                isLocal={isLocal}
                submitHandler={submitHandler}
                {...theme}
              />
            ))
          ) : (
            <Message
              page={{ text: message.text }}
              isLocal={true}
              {...theme}
            />
          )}
        </MessageContainer>
        {message.buttons && message.buttonStyle === 'default' && (
          <MessageContainer key="buttons" {...message}>
            {message.buttons.map((button, i) => (
              <theme.ButtonComponent
                key={i}
                text={button.text}
                phone={button.phone}
                url={button.url}
                onClick={() =>
                  submitHandler({
                    postback: button.postback,
                    text: button.text
                  })
                }
              />
            ))}
          </MessageContainer>
        )}
        {message.message_type === 'attachment' && (
          <MessageContainer
            key={`attachment-${message.timeAdded}`}
            {...message}
          >
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
    text: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      phone: PropTypes.string,
      url: PropTypes.string,
      postback: PropTypes.any
    })),
    buttonStyle: PropTypes.string,
    message_type: PropTypes.string,
    timeAdded: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  prevMessageOrigin: PropTypes.bool,
  submitHandler: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    AvatarComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ...PropTypes.object.isRequired
  }).isRequired,
  itemRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};

export default MessageListItem; 