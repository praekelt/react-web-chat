// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import { getLatestRemote } from '../../utils/helpers';

const mapStateToProps = ({ messages }) => ({
    latestMessageResponseType: getLatestRemote(messages.messages).responseType
});

const enhance = compose(
    setPropTypes({
        messages: PropTypes.object
    }),
    connect(mapStateToProps)
);

export const InputArea = props => {
    return <div>{props.children}</div>;
};

export default enhance(InputArea);
