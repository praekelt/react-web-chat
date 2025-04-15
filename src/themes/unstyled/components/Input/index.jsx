import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * A simple text Input component.
 */
const Input = ({ submitHandler, onKeyDown }) => {
    const [value, setValue] = useState('');
    
    const handleKeyDown = (event) => {
        const success = onKeyDown(event, value);
        if (success) {
            setValue('');
        }
    };
    
    const handleSubmit = () => {
        submitHandler({ text: value });
        setValue('');
    };
    
    return (
        <div className="Input" onKeyDown={handleKeyDown}>
            <input
                className="Input-input"
                type="text"
                value={value}
                placeholder="Write message..."
                onChange={({ target: { value } }) => setValue(value)}
            />
            <button
                className="Input-send"
                onClick={handleSubmit}
            />
        </div>
    );
};

Input.propTypes = {
    submitHandler: PropTypes.func,
    onKeyDown: PropTypes.func
};

export default Input; 