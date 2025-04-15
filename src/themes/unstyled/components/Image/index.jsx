import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Fade } from '../Animation/index';

/**
 * An image component for displaying images with optional text
 * @param {Object} props - Component props
 * @param {string} props.url - image url
 * @param {string} props.text - optional caption text
 * @param {number} props.width - width of the image in pixels
 * @param {number} props.height - height of the image in pixels
 * @return {React.ReactElement} React component
 */
const ImageComponent = ({ url, text, height = 200 }) => {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        const image = new Image(0, 0);
        image.src = url;
        image.addEventListener('load', () => {
            setLoaded(true);
        });
        
        return () => {
            // Clean up the event listener when component unmounts
            image.removeEventListener('load', () => {
                setLoaded(true);
            });
        };
    }, [url]);
    
    return (
        <Fade in={true} appear={true}>
            <div className="Image">
                {loaded && <img className="Image-image" src={url} alt={text} />}
                {text && (
                    <p
                        className="Image-text Text"
                        dangerouslySetInnerHTML={{ __html: text }}
                    />
                )}
            </div>
        </Fade>
    );
};

ImageComponent.propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
};

export default ImageComponent; 