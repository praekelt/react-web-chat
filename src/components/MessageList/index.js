// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AvatarContainer from '../AvatarContainer';
import MessageContainer from '../MessageContainer';

import Message from '../Message';

import smoothScrollTo from '../../utils/smooth-scroll-to';

const mapStateToProps = ({ messages }) => {
    return { messages: messages.messages };
};

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0
        };
    }

    componentDidUpdate() {
        smoothScrollTo({
            to: this._last,
            container: this._ref,
            duration: 20
        });
    }

    render() {
        let { theme, messages } = this.props;
        return (
            <ul className="ChatContainer-content" ref={ref => (this._ref = ref)}>
                <div className="MessagesList">
                    {messages.map((message, i) => (
                        <li
                            key={i}
                            ref={ref => {
                                if (i === messages.length - 1) {
                                    this._last = ref;
                                }
                            }}
                        >
                            {message.origin === 'remote' && (
                                <AvatarContainer AvatarComponent={theme.AvatarComponent} />
                            )}
                            <MessageContainer isLocal={message.origin === 'local'}>
                                {message.pages.map((page, i) => (
                                    <Message
                                        key={i}
                                        page={page}
                                        isLocal={message.origin === 'local'}
                                        {...theme}
                                    />
                                ))}
                            </MessageContainer>
                        </li>
                    ))}
                </div>
            </ul>
        );
    }
}

MessageList.PropTypes = {
    messages: PropTypes.object,
    theme: PropTypes.shape({
        ImageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        InputComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        MessageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        TextComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    })
};

export default connect(mapStateToProps)(MessageList);
