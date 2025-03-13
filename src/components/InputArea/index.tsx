import React, { useState } from 'react';
import { connect } from 'react-redux';
import { messageSend } from '../../actions/messages';

interface Props {
  InputComponent?: React.ComponentType<any>;
  dispatch: (action: any) => void;
}

export const InputArea: React.FC<Props> = ({ InputComponent, dispatch }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (text: string) => {
    if (text.trim()) {
      dispatch(messageSend({ text, isLocal: true }));
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(value);
    }
  };

  const DefaultInput = () => (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Type a message..."
    />
  );

  const Component = InputComponent || DefaultInput;

  return (
    <div className="InputArea">
      <Component
        value={value}
        setValue={setValue}
        onKeyDown={handleKeyDown}
        submitHandler={handleSubmit}
      />
    </div>
  );
};

export default connect()(InputArea); 