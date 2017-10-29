// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, withProps } from 'recompose';

const enhance = compose(
    setPropTypes({
        text: PropTypes.string,
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

export const Message = ({ text, images = [], ImageComponent, TextComponent }) => {
    return (
        <TextComponent>{text}</TextComponent>
        //{!!images.length && images.map((image, i) => <ImageComponent key={i} {...image} />)}
    );
};

export default enhance(Message);
