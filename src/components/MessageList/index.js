// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AvatarContainer from '../AvatarContainer';
import MessageContainer from '../MessageContainer';
import Message from '../Message';

import * as messageActions from '../../actions/messages';

//import Avatar from '../../themes/default/components/Avatar/index';
//import networkManager from '../../../es/utils/network';
import TypingIndicator from '../../themes/default/components/TypingIndicator/index';

const mapStateToProps = ({ messages, config }) => ({
    messages: messages.messages,
    messageQueue: messages.messageQueue,
    config
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    submitHandler: message => {
        dispatch(
            messageActions.messageSend({
                ...message,
                type: 'button'
            })
        );
    }
});

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0
        };
    }

    componentDidUpdate() {
        this._last &&
            this._last.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'end'
            });

        // let { messageQueue, delayedMessageAdd } = this.props;

        // messageQueue.length && delayedMessageAdd(messageQueue[messageQueue.length - 1]);
    }

    render() {
        let {
            theme,
            messages,
            messageQueue,
            submitHandler,
            config
        } = this.props;
        return (
            <ul
                className="ChatContainer-content"
                ref={ref => (this._ref = ref)}
            >
                <div className="MessagesList">
                    {messages.map((message, i) => (
                        <li
                            className="MessagesList-item"
                            key={i}
                            ref={ref => {
                                if (i === messages.length - 1) {
                                    this._last = ref;
                                }
                            }}
                        >
                            {message.origin === 'remote' &&
                                (messages[i - 1]
                                    ? messages[i - 1].origin !== 'remote'
                                    : true) && (
                                    <AvatarContainer
                                        AvatarComponent={theme.AvatarComponent}
                                    />
                                )}
                            <div className="MessagesList-messageItem">
                                <MessageContainer key="text" {...message}>
                                    {message.origin === 'remote' ? (
                                        message.pages.map((page, i) => (
                                            <Message
                                                key={i}
                                                page={page}
                                                isLocal={
                                                    message.origin === 'local'
                                                }
                                                {...theme}
                                                submitHandler={submitHandler}
                                            />
                                        ))
                                    ) : (
                                        <Message
                                            key={i}
                                            page={{ text: message.text }}
                                            isLocal={true}
                                            {...theme}
                                        />
                                    )}
                                </MessageContainer>{' '}
                                {message.buttons &&
                                    message.buttonStyle === 'default' && (
                                        <MessageContainer
                                            key="buttons"
                                            {...message}
                                        >
                                            {message.buttons.map(
                                                (button, i) => (
                                                    <theme.ButtonComponent
                                                        key={i}
                                                        text={button.text}
                                                        phone={button.phone}
                                                        url={button.url}
                                                        onClick={() =>
                                                            submitHandler({
                                                                postback:
                                                                    button.postback,
                                                                text:
                                                                    button.text
                                                            })
                                                        }
                                                    />
                                                )
                                            )}
                                        </MessageContainer>
                                    )}
                            </div>
                            {messageQueue.length &&
                            i === messages.length - 1 &&
                            config.typingStatus.active
                                ? [
                                      <MessageContainer key="typing">
                                          <theme.TypingIndicatorComponent
                                              {...config.TypingIndicator}
                                          />
                                      </MessageContainer>
                                  ]
                                : null}
                        </li>
                    ))}
                </div>
            </ul>
        );
    }
}

MessageList.propTypes = {
    messages: PropTypes.array,
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
        TextComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    }),
    config: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
