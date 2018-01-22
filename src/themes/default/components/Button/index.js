//@ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

const enhance = compose(
    setPropTypes({
        text: PropTypes.string,
        onClick: PropTypes.func
    })
);

/**
 * A simple button component
 * @param {Object} param
 * @param {number} param.text - text to be rendered inside button.
 * @param {function(e: Object)} param.onClick - click handler function
 * @return {Object} React component
 */
export const Button = ({ text, phone, url, onClick }) =>
    phone || url ? (
        <a className="Button Button--solid" href={phone ? `tel:${phone}` : url}>
            {text}
        </a>
    ) : (
        <button className="Button Button--solid" onClick={onClick}>
            {text}
        </button>
    );

export default enhance(Button);
