import React from '../../utils/dev_react_import';
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
    return <AvatarComponent avatar={avatar} {...connection} typing={typing} />;
};

export default enhance(AvatarContainer);
