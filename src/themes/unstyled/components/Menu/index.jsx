import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * A menu listing several items. (single choice)
 * @param {Object} props - Component props
 * @param {Array<Object>} props.items - The menu items to be displayed
 * @param {function} props.submitHandler - submit handler function
 * @return {React.ReactElement} React component
 */
export const Menu = ({ items, submitHandler }) => {
  const [open, setOpen] = useState(false);
  
  const toggleState = () => setOpen(!open);
  
  return (
    <div className={`Menu ${open ? 'is-open' : ''}`}>
      {items && (
        <ul className="Menu-items">
          {items.map((item, i) => (
            <li
              className="Menu-item"
              key={i}
              onClick={() => {
                submitHandler({
                  postback: item.postback,
                  text: item.text,
                  type: 'button'
                });
                toggleState();
              }}
            >
              {item.type === 'url' ? (
                <a target="_blank" href={item.url} rel="noopener noreferrer">
                  {item.text}
                </a>
              ) : (
                item.text
              )}
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
};

/**
 * A menu listing several checkbox items. (multiple choice)
 * @param {Object} props - Component props
 * @param {Array<Object>} props.items - The menu items to be displayed
 * @param {function} props.submitHandler - submit handler function
 * @return {React.ReactElement} React component
 */
export const CheckboxMenu = ({ items, submitHandler }) => {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const toggleState = () => setOpen(!open);
  
  const toggleItem = (itemText) => {
    const newItems = [...selectedItems];
    const index = newItems.indexOf(itemText);
    
    if (index === -1) {
      newItems.push(itemText);
    } else {
      newItems.splice(index, 1);
    }
    
    setSelectedItems(newItems);
  };
  
  return (
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
                readOnly
              />
              <label className="CheckboxMenu-label">
                {item.text}
              </label>
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
  );
};

Menu.propTypes = {
  items: PropTypes.array,
  submitHandler: PropTypes.func
};

CheckboxMenu.propTypes = {
  items: PropTypes.array,
  submitHandler: PropTypes.func
};

export default Menu; 