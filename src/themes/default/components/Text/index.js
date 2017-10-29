//@ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

const createMarkup = (children, title) => {
    const text = title ? `<h1 class="Text-h1">${children}</h1>` : children;
    return { __html: text };
};

const enhance = compose(
    setPropTypes({
        title: PropTypes.string,
        isLocal: PropTypes.bool
    })
);

const Text = ({ title, children, isLocal }) => (
    <div
        className={`Text ${isLocal ? 'is-local' : ''}`}
        dangerouslySetInnerHTML={createMarkup(children, title)}
    />
);

export default enhance(Text);
