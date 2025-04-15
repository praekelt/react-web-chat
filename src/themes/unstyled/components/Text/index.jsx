import React from 'react';
import PropTypes from 'prop-types';
import Markdown from '../../../../components/Markdown';
import LinkifyWrapper from '../../../../components/LinkifyWrapper';

import { Fade } from '../Animation/index';

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

Text.propTypes = {
    title: PropTypes.string,
    isLocal: PropTypes.bool,
    children: PropTypes.string.isRequired
};

export default Text; 