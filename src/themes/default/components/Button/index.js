//@ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

const enhance = compose(
    setPropTypes({
        text: PropTypes.string
    })
);

const Button = ({ text, onClick }) => (
    <button className="Button Button--solid" onClick={onClick}>
        {text}
    </button>
);

export default enhance(Button);
