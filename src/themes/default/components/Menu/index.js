// @ts-check
import React from 'react';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';

import Button from '../Button';

const enhance = compose(
    withStateHandlers(
        ({ initialState = false, initialItems = [] }) => ({
            open: initialState,
            selectedItems: initialItems
        }),
        {
            toggleState: ({ open }) => _ => ({
                open: !open
            }),
            toggleItem: ({ selectedItems }) => item => {
                let newItems = [...selectedItems];
                let index = newItems.indexOf(item);
                if (index === -1) {
                    newItems.push(item);
                } else {
                    newItems.splice(index, 1);
                }
                return { selectedItems: newItems };
            }
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

export const CheckboxMenu = enhance(
    ({ open, toggleState, items, submitHandler, toggleItem, selectedItems }) => (
        <div className={`Menu CheckboxMenu ${open ? 'is-open' : ''}`}>
            {items && (
                <ul className="Menu-items">
                    {items.map((item, i) => (
                        <li
                            className="Menu-item CheckboxMenu-item"
                            key={i}
                            onClick={() => toggleItem(item.text)}
                        >
                            <input
                                className="CheckboxMenu-checkbox"
                                type="checkbox"
                                checked={selectedItems.includes(item.text)}
                            />
                            <label className="CheckboxMenu-label">{item.text}</label>
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="CheckboxMenu-submitButton"
                onClick={() => {
                    submitHandler(selectedItems);
                    toggleState();
                }}
            >
                SEND
            </button>
            <button className="Menu-button" onClick={toggleState}>
                <div className="Menu-buttonSegment" />
                <div className="Menu-buttonSegment" />
                <div className="Menu-buttonSegment" />
            </button>
        </div>
    )
);

export default enhance(Menu);
