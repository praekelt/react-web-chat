import React from 'react';
import Slider from 'react-slick';

const layoutClasses = {
    plain: 'MessageContainer',
    list: 'ListContainer',
    carousel: 'CarouselContainer'
};

// TODO: Test browser resizing
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <button className="slick-next" />,
    prevArrow: <button className="slick-next" />
};

const MessageContainer = ({ userId, type, children, layout, origin, pages, ...rest }) => {
    let hasSelectedInput = rest.selectedInput !== undefined && rest.selectedInput !== null;

    return (
        <div
            className={`${layoutClasses[layout] || 'MessageContainer'} ${origin === 'local'
                ? 'is-local'
                : ''}`}
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

export default MessageContainer;
