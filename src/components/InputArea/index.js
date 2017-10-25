// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import * as messageActions from '../../actions/messages';

import { getLatestRemote } from '../../utils/helpers';

const mapStateToProps = ({ messages }) => ({
    latestMessageResponseType: getLatestRemote(messages.messages).responseType
});

const mapDispatchToProps = dispatch => ({
    submitHandler: text => {
        dispatch(
            messageActions.messageSend({
                text: text
            })
        );
    }
});

const enhance = compose(
    setPropTypes({
        messages: PropTypes.object
    }),
    connect(mapStateToProps, mapDispatchToProps)
);

export const InputArea = ({ InputComponent, submitHandler }) => {
    return (
        <div>
            <InputComponent submitHandler={submitHandler} />
        </div>
    );
};

export default enhance(InputArea);
