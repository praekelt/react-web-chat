// @ts-check
import React from '../../utils/dev_react_import';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import * as messageActions from '../../actions/messages';
import { getLatestRemote } from '../../utils/helpers';

const mapStateToProps = ({ messages }) => {
    let latestMessage = getLatestRemote(messages.messages);
    return {
        inputExpected: latestMessage && latestMessage.input_expected,
        buttons: latestMessage && latestMessage.buttons
    };
};

const mapDispatchToProps = dispatch => ({
    submitHandler: text => {
        dispatch(
            messageActions.messageSend({
                text: text
            })
        );
    },
    onKeyDown: (event, text) => {
        if (event.keyCode === 13) {
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
    connect(mapStateToProps, mapDispatchToProps)
);

const tmpButtons = {
    buttons: [
        {
            type: 'transition',
            transition: {
                type: 'workflow',
                ref: '_sA3lHnvTG2dam8pXIQiIQ'
            },
            text: 'Speaker'
        },
        {
            type: 'transition',
            transition: {
                type: 'workflow',
                ref: 'X_cXr2oHRHSjazCXsST6AA'
            },
            text: 'Agenda'
        }
    ]
};

// const test = {config: {
//     typingStatus: {
//       active: true,
//       baseDelay: 1000,
//       variance: 500,
//       letterDelay: 10,
//       minDelay: 200,
//       maxDelay: 2000
//     },
//     network: {
//       retransmissionTimeout: 500,
//       retransmissionAttempts: 10,
//       eventNamespace: 'foobar',
//       channel_id: 'f131a49f-b505-4cac-ae0a-7e1fff0aed1b'
//     },
//     avatar: '/demo/src/images/avatar.png'
//   }}

export const InputArea = ({
    InputComponent,
    submitHandler,
    onKeyDown,
    inputExpected,
    MenuComponent,
    CheckboxMenuComponent,
    buttons
}) => {
    return (
        <div className="ChatContainer-input">
            {inputExpected === 'checkbox' && (
                <CheckboxMenuComponent
                    items={buttons}
                    submitHandler={submitHandler}
                />
            )}
            {
                // TODO Change to config instead of tmpButtons
            }
            {tmpButtons.buttons && (
                <MenuComponent
                    items={tmpButtons.buttons}
                    submitHandler={submitHandler}
                />
            )}
            <InputComponent
                onKeyDown={onKeyDown}
                submitHandler={submitHandler}
            />
        </div>
    );
};

export default enhance(InputArea);
