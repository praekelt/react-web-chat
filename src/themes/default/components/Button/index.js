//@ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

const enhance = compose(
    setPropTypes({
        text: PropTypes.string
    })
);

const Button = ({ text }) => <button className="Button Button--solid">{text}</button>;

export default enhance(Button);
