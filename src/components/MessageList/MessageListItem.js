import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AvatarContainer from '../AvatarContainer';
import MessageContainer from '../MessageContainer';
import AttachmentMessage from './AttachmentMessage';
import Message from '../Message';

class MessageListItem extends PureComponent {
    render() {
        const {
            itemRef,
            message,
            prevMessageOrigin,
            submitHandler,
            theme
        } = this.props;
        return (
            <li
                className={`MessagesList-item${
                    message.origin === 'local' ? ' is-local' : ''
                }`}
                ref={itemRef}
            >
                {message.origin === 'remote' && prevMessageOrigin && (
                    <AvatarContainer AvatarComponent={theme.AvatarComponent} />
                )}
                <div className="MessagesList-messageItem">
                    <MessageContainer key="text" {...message}>
                        {message.origin === 'remote' ? (
                            message.pages.map((page, i) => (
                                <Message
                                    key={i}
                                    page={page}
                                    isLocal={message.origin === 'local'}
                                    {...theme}
                                    submitHandler={submitHandler}
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
    }
}

export default MessageListItem;
