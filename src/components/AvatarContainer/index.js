import React from 'react';
import { connect } from 'react-redux';

import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

const mapStateToProps = ({ connection }) => ({ connection });

const enhance = compose(
    setPropTypes({
        connection: PropTypes.object
    }),
    connect(mapStateToProps)
);

export const AvatarContainer = ({ AvatarComponent, connection }) => {
    return (
        <div>
            <AvatarComponent avatar="http://i.pravatar.cc/300" {...connection} />
        </div>
    );
};

export default enhance(AvatarContainer);
