// @ts-check
//import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes, lifecycle } from 'recompose';
import { withState } from 'recompose';

import infinityIcon from '../../icons/Infinity.svg';
import { Fade } from '../Animation/index';

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

/**
 * An image
 * @param {Object} param
 * @param {string} param.url - image url
 * @param {number} param.width - width of the image in pixels
 * @param {number} param.height - height of the image in pixels
 * @return {Object} React component
 */

export const ImageComponent = ({ url, text, loaded, height = 200 }) => {
    return (
        <Fade in={true} appear={true}>
            <div className="Image">
                {loaded ? (
                    <img className="Image-image" src={url} />
                ) : (
                    <div className="Image-loader" style={{ height }}>
                        <img className="Image-loaderIcon" src={infinityIcon} />
                    </div>
                )}
                {text && (
                    <p className="Image-text Text" dangerouslySetInnerHTML={{ __html: text }} />
                )}
            </div>
        </Fade>
    );
};

export default enhance(ImageComponent);
