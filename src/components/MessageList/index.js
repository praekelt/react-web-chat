import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import smoothScrollTo from 'smooth-scroll-to-js';
import AvatarContainer from '../AvatarContainer';

import MessageContainer from '../MessageContainer';
import * as messageActions from '../../actions/messages';
import MessageListItem from './MessageListItem';

const mapStateToProps = ({ messages, config }) => ({
    messages: messages.messages,
    messageQueue: messages.messageQueue,
    config
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    submitHandler: (message, type = 'button') => {
        dispatch(
            messageActions.messageSend({
                ...message,
                type: type
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

        this.lastMsgRef = React.createRef();
        this.containerRef = React.createRef();
    }

    componentDidUpdate() {
        this.lastMsgRef.current &&
            this.containerRef.current &&
            smoothScrollTo({
                to: this.lastMsgRef.current,
                container: this.containerRef.current,
                duration: 1
            });
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
            <div className="ChatContainer-content" ref={this.containerRef}>
                <ul className="MessagesList">
                    {messages.length < 1 && (
                        <li
                            className={`MessagesList-item is-local loading-chat`}
                        >
                            <AvatarContainer
                                AvatarComponent={theme.AvatarComponent}
                            />
                            <div className="MessagesList-messageItem">
                                <MessageContainer key="typing">
                                    <theme.TypingIndicatorComponent
                                        {...config.TypingIndicator}
                                    />
                                </MessageContainer>
                            </div>
                        </li>
                    )}
                    {messages.map((message, i) => (
                        <MessageListItem
                            key={message.timeAdded}
                            {...{
                                message,
                                prevMessageOrigin: messages[i - 1]
                                    ? messages[i - 1].origin !== 'remote'
                                    : true,

                                submitHandler,
                                theme,
                                ...(messages.length - 1 === i && {
                                    itemRef: this.lastMsgRef
                                })
                            }}
                        />
                    ))}
                    {messageQueue.length && config.typingStatus.active ? (
                        <li>
                            <MessageContainer key="typing">
                                <theme.TypingIndicatorComponent
                                    {...config.TypingIndicator}
                                />
                            </MessageContainer>
                        </li>
                    ) : null}
                </ul>
            </div>
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
