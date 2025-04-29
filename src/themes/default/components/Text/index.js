//@ts-check

import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import Markdown from '../../../../components/Markdown';
import LinkifyWrapper from '../../../../components/LinkifyWrapper';

import { Fade } from '../Animation/index';

const enhance = compose(
    setPropTypes({
        title: PropTypes.string,
        isLocal: PropTypes.bool,
        children: PropTypes.string.isRequired
    })
);

const componentDecorator = (href, text, key) => (
    <a
        href={href}
        key={key}
        target="_blank"
        rel="noopener noreferrer"
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
 * @param {boolean} param.isLocal - if the message is from the local user.
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
                <div>
                    <LinkifyWrapper componentDecorator={componentDecorator}>
                        <Markdown source={children} />
                    </LinkifyWrapper>
                </div>
            )}
        </div>
    </Fade>
);

export default enhance(Text);
