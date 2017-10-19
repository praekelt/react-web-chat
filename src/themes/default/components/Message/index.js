// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';

const enhance = compose(
    setPropTypes({
        text: PropTypes.string,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                text: PropTypes.string
            })
        )
    })
);

export const Message = ({ text, images = [], ImageComponent }) => {
    return (
        <div>
            <h1>{text}</h1>
            {images.length && images.map((image, i) => <ImageComponent key={i} {...image} />)}
            <style jsx>{`
                h1 {
                    color: red;
                }
            `}</style>
        </div>
    );
};

export default enhance(Message);
