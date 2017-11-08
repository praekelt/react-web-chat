// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';

import Button from '../Button';

const enhance = compose(
    withStateHandlers(
        ({ initialState = false }) => ({
            open: initialState
        }),
        {
            toggleState: ({ open }) => _ => ({
                open: !open
            })
        }
    )
);

export const Menu = ({ open, toggleState, items, submitHandler }) => (
    <div className={`Menu ${open ? 'is-open' : ''}`}>
        {items && (
            <ul className="Menu-items">
                {items.map((item, i) => (
                    <li
                        className="Menu-item"
                        key={i}
                        onClick={() => {
                            submitHandler(item.text);
                            toggleState();
                        }}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        )}
        <button className="Menu-button" onClick={toggleState}>
            <div className="Menu-buttonSegment" />
            <div className="Menu-buttonSegment" />
            <div className="Menu-buttonSegment" />
        </button>
    </div>
);

export default enhance(Menu);
