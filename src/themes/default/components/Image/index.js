// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

const enhance = compose(
    setPropTypes({
        url: PropTypes.string.isRequired,
        text: PropTypes.string
    })
);

export const Image = ({ url, text }) => {
    return (
        <div>
            <img src={url} />
            {text && <h2>{text}</h2>}
        </div>
    );
};

export default enhance(Image);
