// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, lifecycle } from 'recompose';

const enhance = compose(
    setPropTypes({
        url: PropTypes.string.isRequired,
        text: PropTypes.string
    }),
    lifecycle({
        componentDidMount: function(props) {
            let myImage = new Image(100, 200);
            myImage.src = this.props.url;
            myImage.addEventListener('load', () => {
                console.log('LOADED!');
            });
        }
    })
);

export const ImageComponent = ({ url, text }) => {
    return (
        <div>
            <img src={url} />
            {text && <h2>{text}</h2>}
        </div>
    );
};

export default enhance(ImageComponent);
