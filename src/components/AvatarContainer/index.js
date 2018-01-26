import React from 'react';
import { connect } from 'react-redux';

import { compose, setPropTypes } from 'recompose';
import PropTypes from 'prop-types';

const mapStateToProps = ({
    connection,
    messages: { messageQueue },
    config
}) => ({
    connection,
    typing: messageQueue.length,
    avatar: config.avatar
});

const enhance = compose(
    setPropTypes({
        connection: PropTypes.object,
        typing: PropTypes.bool
    }),
    connect(mapStateToProps)
);

export const AvatarContainer = ({
    AvatarComponent,
    avatar,
    connection,
    typing
}) => {
    return (
        <div>
            <AvatarComponent avatar={avatar} {...connection} typing={typing} />
        </div>
    );
};

export default enhance(AvatarContainer);
