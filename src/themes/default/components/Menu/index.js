// @ts-check
import React from '../../../../utils/dev_react_import';
//import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';

//import Button from '../Button';

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

/**
 * A menu listing several items. (single choice)
 * @param {Object} param
 * @param {Array<Object>} param.items - The menu items to be displayed
 * @param {function(text: string)} param.submitHandler - submit handler function. This will send a message to the server using data supplied as parameter
 * @return {Object} React component
 */
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

/**
 * A menu listing several checkbox items. (multiple choice)
 * @param {Object} param
 * @param {Array<Object>} param.items - The menu items to be displayed
 * @param {function(items: Array<string>)} param.submitHandler - submit handler function. This will send a message to the server using data supplied as parameter
 * @return {Object} React component
 */
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
