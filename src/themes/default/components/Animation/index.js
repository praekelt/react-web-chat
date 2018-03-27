//@ts-check
import React from '../../../../utils/dev_react_import';
import { CSSTransition } from 'react-transition-group';

export const Fade = ({ children, ...props }) => (
    <CSSTransition {...props} timeout={350} classNames="fade">
        {children}
    </CSSTransition>
);
