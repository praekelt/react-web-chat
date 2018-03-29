import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
//import { CSSTransition } from 'react-transition-group';

import { Fade } from '../Animation/index';

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

/**
 * A simple text component for use inside messages.
 * @param {Object} param
 * @param {string} param.title - the text message's title.
 * @param {string} param.children - markdown-generated html to render.
 * @return {Object} React component
 */
const Text = ({ title, children, isLocal }) => (
    <Fade in={true} appear={true}>
        <div
            className={`Text ${isLocal ? 'is-local' : ''}`}
            dangerouslySetInnerHTML={createMarkup(children, title)}
        />
    </Fade>
);

export default enhance(Text);
