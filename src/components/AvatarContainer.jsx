import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * AvatarContainer - Container for avatar component that connects to Redux store
 */
export const AvatarContainer = ({ AvatarComponent }) => {
  const connection = useSelector((state) => state.connection);
  const messageQueue = useSelector((state) => state.messages.messageQueue);
  const avatar = useSelector((state) => state.config.avatar);
  
  return (
    <AvatarComponent 
      avatar={avatar} 
      {...connection} 
      typing={messageQueue.length > 0} 
    />
  );
};

AvatarContainer.propTypes = {
  AvatarComponent: PropTypes.elementType.isRequired
};

export default AvatarContainer; 