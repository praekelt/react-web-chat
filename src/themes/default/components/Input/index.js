// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, withState } from 'recompose';

import Button from '../Button';

const enhance = compose(
    setPropTypes({
        submitHandler: PropTypes.func
    }),
    withState('value', 'setValue', '')
);

/**
 * A simple text Input component.
 * @param {Object} param
 * @param {string|number} param.value - the input's value.
 * @param {function(text: string)} param.submitHandler - submit handler function. This will send a message to the server using data supplied as parameter
 * @return {Object} React component
 */
export const Input = ({ submitHandler, value, setValue }) => (
    <div className="Input">
        <input
            className="Input-input"
            type="text"
            value={value}
            onChange={({ target: { value } }) => setValue(value)}
        />
        <button className="Input-send" onClick={() => submitHandler(value)}>
            SEND
        </button>
    </div>
);

export default enhance(Input);
