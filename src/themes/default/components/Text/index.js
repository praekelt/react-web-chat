//@ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { CSSTransition } from 'react-transition-group';

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

const Fade = ({ children, ...props }) => (
    <CSSTransition in={true} appear={true} {...props} timeout={350} classNames="fade">
        {children}
    </CSSTransition>
);

const Text = ({ title, children, isLocal }) => (
    <Fade>
        <div
            className={`Text ${isLocal ? 'is-local' : ''}`}
            dangerouslySetInnerHTML={createMarkup(children, title)}
        />
    </Fade>
);

export default enhance(Text);
