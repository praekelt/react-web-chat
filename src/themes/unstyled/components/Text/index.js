//@ts-check

import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import Mark from 'react-mark-ii';
import Linkify from 'react-linkify';

import { Fade } from '../Animation/index';

const enhance = compose(
    setPropTypes({
        title: PropTypes.string,
        isLocal: PropTypes.bool
    })
);

const componentDecorator = (href, text, key) => (
    <a
        href={href}
        key={key}
        target="_blank"
        style={{ textDecoration: 'underline' }}
    >
        {text}
    </a>
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
            className={`Text ${isLocal ? 'is-local' : ''} ${
                title ? 'title' : ''
            }`}
        >
            {title ? (
                <p className="Text title-text">{children}</p>
            ) : (
                <Mark>
                    <Linkify componentDecorator={componentDecorator}>
                        {children}
                    </Linkify>
                </Mark>
            )}
        </div>
    </Fade>
);

export default enhance(Text);
