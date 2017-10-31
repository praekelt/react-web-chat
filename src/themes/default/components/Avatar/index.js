import React from 'react';

const Avatar = props => (
    <div className="AvatarStatus">
        <div className="AvatarStatus-avatar">
            <img className="Avatar" src={props.avatar} />
        </div>
        <div className="AvatarStatus-status">{switchIndicator(props)}</div>
    </div>
);

const switchIndicator = ({ connecting, established, offline, avatar, typing }) => {
    if (typing) {
        return <StatusIndicator status="typing" />;
    } else {
        if (established) {
            return <StatusIndicator status="online" />;
        }
        if (connecting) {
            return <StatusIndicator status="thinking" />;
        }
        if (offline) {
            return <StatusIndicator status="offline" />;
        }
    }
};

const StatusIndicator = ({ status }) => (
    <div
        className={`StatusIndicator
            ${status ? `StatusIndicator--${status}` : ''}
        `}
    />
);

export default Avatar;
