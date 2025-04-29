import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

const layoutClasses = {
  plain: 'MessageContainer',
  list: 'ListContainer',
  carousel: 'CarouselContainer'
};

// Slider settings for carousel layout
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <button className="slick-next" />,
  prevArrow: <button className="slick-next" />,
  adaptiveHeight: true
};

/**
 * MessageContainer - Component for wrapping messages in different layouts
 */
const MessageContainer = ({ userId, type, children, layout = 'plain', origin, pages, ...rest }) => {
  return (
    <div
      className={`${layoutClasses[layout] || 'MessageContainer'} ${
        origin === 'local' ? 'is-local' : ''
      }`}
    >
      {layout === 'carousel' ? (
        <Slider {...sliderSettings}>
          {React.Children.map(children, child => (
            <div className="CarouselContainer-item">{child}</div>
          ))}
        </Slider>
      ) : (
        children
      )}
    </div>
  );
};

MessageContainer.propTypes = {
  userId: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
  layout: PropTypes.oneOf(['plain', 'list', 'carousel']),
  origin: PropTypes.string,
  pages: PropTypes.array
};

export default MessageContainer; 