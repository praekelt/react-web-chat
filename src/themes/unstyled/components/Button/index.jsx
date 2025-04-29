import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple button component
 */
export const Button = ({ text, phone, url, onClick }) =>
    phone || url ? (
        <a
            className="Button Button--solid"
            target={url ? "_blank" : ""}
            href={phone ? `tel:${phone}` : url}
        >
            {text}
        </a>
    ) : (
        <button className="Button Button--solid" onClick={onClick}>
            {text}
        </button>
    );

Button.propTypes = {
    text: PropTypes.string,
    phone: PropTypes.string,
    url: PropTypes.string,
    onClick: PropTypes.func
};

export default Button; 