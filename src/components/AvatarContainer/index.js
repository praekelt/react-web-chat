import React from 'react';
import { connect } from 'react-redux';

import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

const mapStateToProps = ({ connection, messages: { messageQueue } }) => ({
    connection,
    typing: messageQueue.length
});

const enhance = compose(
    setPropTypes({
        connection: PropTypes.object,
        typing: PropTypes.bool
    }),
    connect(mapStateToProps)
);

export const AvatarContainer = ({ AvatarComponent, connection, typing }) => {
    return (
        <div>
            <AvatarComponent avatar="http://i.pravatar.cc/300" {...connection} typing={typing} />
        </div>
    );
};

export default enhance(AvatarContainer);
