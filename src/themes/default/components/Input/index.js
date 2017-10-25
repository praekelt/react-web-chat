// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, withState } from 'recompose';

const enhance = compose(
    setPropTypes({
        submitHandler: PropTypes.func
    }),
    withState('value', 'setValue', '')
);

export const Input = ({ submitHandler, value, setValue }) => (
    <div className="Input">
        <input type="text" value={value} onChange={({ target: { value } }) => setValue(value)} />
        <button onClick={() => submitHandler(value)}>SUBMIT</button>
    </div>
);

export default enhance(Input);
