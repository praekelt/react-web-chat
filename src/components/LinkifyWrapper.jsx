import React from 'react';
import ReactLinkify from 'react-linkify';
import PropTypes from 'prop-types';

/**
 * LinkifyWrapper - A wrapper around react-linkify with proper typing
 */
const LinkifyWrapper = ({ children, componentDecorator }) => {
  // This component just wraps the react-linkify component to avoid type issues
  return <ReactLinkify componentDecorator={componentDecorator}>{children}</ReactLinkify>;
};

LinkifyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  componentDecorator: PropTypes.func
};

export default LinkifyWrapper; 