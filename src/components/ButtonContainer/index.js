import React from '../../utils/dev_react_import';
//import { connect } from 'react-redux';

import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

const enhance = compose(
	setPropTypes({
		connection: PropTypes.object,
		typing: PropTypes.bool
	})
);

export const ButtonContainer = ({ children }) => {
	return <div className="ButtonContainer">{children}</div>;
};

export default enhance(ButtonContainer);
