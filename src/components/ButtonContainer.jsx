import React from 'react';
import PropTypes from 'prop-types';

/**
 * ButtonContainer - Simple container for buttons in the chat
 */
const ButtonContainer = ({ children }) => {
  return <div className="ButtonContainer">{children}</div>;
};

ButtonContainer.propTypes = {
  children: PropTypes.node
};

export default ButtonContainer; 