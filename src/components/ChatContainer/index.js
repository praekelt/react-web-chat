// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import MessageList from '../MessageList';
import InputArea from '../InputArea';

const mapStateToProps = ({ connection }) => {
    return { connection };
};

const enhance = compose(
    setPropTypes({
        theme: PropTypes.shape({
            ImageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
            InputComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
            MessageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
            TextComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
        })
    }),
    connect(mapStateToProps)
);

export const ChatContainer = ({ theme, connection }) => {
    return (
        <div className="ChatContainer">
            <MessageList theme={theme} />
            <InputArea InputComponent={theme.InputComponent} />
        </div>
    );
};

export default enhance(ChatContainer);
