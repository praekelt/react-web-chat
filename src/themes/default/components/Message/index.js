// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, withProps } from 'recompose';

const enhance = compose(
    setPropTypes({
        text: PropTypes.string,
        origin: PropTypes.oneOf(['local', 'remote']),
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                text: PropTypes.string
            })
        )
    }),
    withProps(({ origin }) => ({
        isLocal: origin === 'local'
    }))
);

export const Message = ({ text, images = [], ImageComponent, isLocal }) => {
    return (
        <div className="Message">
            <div className={`Message--container ${!isLocal ? 'is-remote' : ''}`}>
                <h1>{text}</h1>
                {images.length && images.map((image, i) => <ImageComponent key={i} {...image} />)}
            </div>
        </div>
    );
};

export default enhance(Message);
