import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

/**
 * Markdown component for rendering markdown text
 * Replacement for react-mark-ii to be compatible with React 18
 */
const Markdown = ({ source, className }) => {
  return (
    <div className={className}>
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
};

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
  className: PropTypes.string
};

Markdown.defaultProps = {
  className: ''
};

export default Markdown; 