// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, lifecycle } from 'recompose';
import { withState } from 'recompose';

import infinityIcon from '../../icons/Infinity.svg';

const enhance = compose(
    setPropTypes({
        url: PropTypes.string.isRequired,
        text: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number
    }),
    withState('loaded', 'setLoaded', false),
    lifecycle({
        componentDidMount: function(props) {
            let image = new Image(0, 0);
            image.src = this.props.url;
            image.addEventListener('load', () => {
                this.setState({ loaded: true });
            });
        }
    })
);

export const ImageComponent = ({ url, text, loaded, height = 200 }) => {
    return (
        <div className="Image">
            {loaded ? (
                <img className="Image-image" src={url} />
            ) : (
                <div className="Image-loader" style={{ height }}>
                    <img className="Image-loaderIcon" src={infinityIcon} />
                </div>
            )}
            {text && <p className="Image-text">{text}</p>}
        </div>
    );
};

export default enhance(ImageComponent);
