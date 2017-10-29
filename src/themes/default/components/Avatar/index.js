import React from 'react';

const Avatar = ({ connecting, established, offline, avatar }) => (
    <div className="AvatarStatus">
        <div className="AvatarStatus-avatar">
            <img className="Avatar" src={avatar} />
        </div>
        <div className="AvatarStatus-status">
            {connecting && <StatusIndicator status="connecting" />}
            {established && <StatusIndicator status="online" />}
            {offline && !connecting && <StatusIndicator status="offline" />}
        </div>
    </div>
);

const StatusIndicator = ({ status }) => (
    <div
        className={`StatusIndicator
            ${status ? `StatusIndicator--${status}` : ''}
        `}
    />
);

export default Avatar;
