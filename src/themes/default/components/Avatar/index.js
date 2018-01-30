//import React from 'react';

/**
 * Renders the chat bot's avatar along with a status indicator. 
 * @param {Object} props
 * @param {string} props.avatar - A url to an image to use as the avatar.
 * @param {boolean} props.connecting - A state variable indicating that the chat app is busy attempting a connection to the server.
 * @param {boolean} props.established - A state variable indicating that the chat server is online and the handshake was successful.
 * @param {boolean} props.offline - A state variable indicating that the chat server is offline.
 * @param {boolean} props.typing - A state variable indicating that the chat app is currently simulating "typing..."
 * @return {Object} React component
 */
const Avatar = props => (
    <div className="AvatarStatus">
        <div className="AvatarStatus-avatar">
            <img className="Avatar" src={props.avatar} />
        </div>
        <div className="AvatarStatus-status">{switchIndicator(props)}</div>
    </div>
);

/**
 * Toggles different indicator states based on connection state variable
 * @todo refactor this to use a map
 */
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
