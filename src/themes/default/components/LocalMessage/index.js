// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

import Text from '../Text';

const enhance = compose(
    setPropTypes({
        text: PropTypes.string
    })
);

export const LocalMessage = ({ text }) => {
    return (
        <div className="LocalMessage">
            <Text isLocal={true}>{text}</Text>
        </div>
    );
};

export default enhance(LocalMessage);
