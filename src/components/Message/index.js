import React from 'react';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { ButtonContainer } from '../ButtonContainer';

const enhance = compose(
    setPropTypes({
        page: PropTypes.object,
        isLocal: PropTypes.bool,
        ImageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        InputComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        MessageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        TextComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
        ButtonComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    })
);

export const Message = ({
    page,
    isLocal,
    ImageComponent,
    InputComponent,
    MessageComponent,
    TextComponent,
    ButtonComponent,
    submitHandler
}) => {
    return [
        <TextComponent key="text" isLocal={isLocal}>
            {page.text}
        </TextComponent>,
        page.image_url && <ImageComponent key="image" url={page.image_url} />,
        page.buttons.length > 0 && (
            <ButtonContainer key="buttons">
                {page.buttons.map((button, i) => (
                    <ButtonComponent
                        key={`button-${i}`}
                        {...button}
                        onClick={() => submitHandler(button.text)}
                    />
                ))}
            </ButtonContainer>
        )
    ];
};

export default enhance(Message);
