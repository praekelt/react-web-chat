// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, withState } from 'recompose';

const enhance = compose(
    setPropTypes({
        submitHandler: PropTypes.func,
        onKeyDown: PropTypes.func
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
export const Input = ({
    submitHandler,
    onKeyDown,
    value,
    setValue,
    ...rest
}) => {
    const onClick = value => {
        submitHandler(value);
        setValue('');
    };
    return (
        <div
            className="Input"
            onKeyDown={event => {
                let success = onKeyDown(event, value);
                if (success) {
                    setValue('');
                }
            }}
        >
            <input
                className="Input-input"
                type="text"
                value={value}
                placeholder="Write message..."
                onChange={({ target: { value } }) => setValue(value)}
                {...rest}
            />
            <button
                className="Input-send"
                onClick={() => {
                    onClick(value);
                    setValue('');
                }}
            />
        </div>
    );
};

export default enhance(Input);
