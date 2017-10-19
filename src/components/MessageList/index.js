// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

const mapStateToProps = ({ messages }) => {
    return { messages: messages.messages };
};

const enhance = compose(
    setPropTypes({
        messages: PropTypes.object,
        MessageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        ImageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    }),
    connect(mapStateToProps)
);

export const MessageList = ({ messages, MessageComponent, ImageComponent }) => {
    return (
        <ul>
            {messages.map((message, i) => (
                <li key={i}>
                    <MessageComponent {...message} ImageComponent={ImageComponent} />
                </li>
            ))}
        </ul>
    );
};

export default enhance(MessageList);
