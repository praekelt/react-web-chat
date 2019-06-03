// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import * as messageActions from '../../actions/messages';
import { getLatestRemote } from '../../utils/helpers';

const mapStateToProps = ({ messages, config, connection }) => {
    let latestMessage = getLatestRemote(messages.messages);
    return {
        inputExpected: latestMessage && latestMessage.input_expected,
        buttons: config.menu.buttons,
        connection
    };
};

const mapDispatchToProps = dispatch => ({
    submitHandler: payload => {
        dispatch(messageActions.messageSend(payload));
    },
    onKeyDown: connection => (event, text) => {
        if (event.keyCode === 13 && !connection.offline) {
            dispatch(
                messageActions.messageSend({
                    text: text
                })
            );
            return true;
        }
        return false;
    }
});

const enhance = compose(
    setPropTypes({
        messages: PropTypes.object
    }),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
);

export const InputArea = ({
    InputComponent,
    submitHandler,
    onKeyDown,
    inputExpected,
    MenuComponent,
    CheckboxMenuComponent,
    buttons,
    connection
}) => {
    return (
        <div
            className={`ChatContainer-input${
                inputExpected ? ' is-expected-input' : ''
            }`}
        >
            {inputExpected === 'checkbox' && (
                <CheckboxMenuComponent
                    items={buttons}
                    submitHandler={submitHandler}
                />
            )}
            {buttons && (
                <MenuComponent items={buttons} submitHandler={submitHandler} />
            )}
            <InputComponent
                onKeyDown={onKeyDown(connection)}
                submitHandler={submitHandler}
                inputExpected={inputExpected}
                disabled={connection.offline}
            />
        </div>
    );
};

export default enhance(InputArea);
