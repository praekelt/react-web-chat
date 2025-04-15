// @ts-check
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import * as messageActions from '../actions/messages';
import { getLatestRemote } from '../utils/helpers';

/**
 * InputArea - Component for rendering the input area in the chat
 */
const InputArea = ({ InputComponent, MenuComponent, CheckboxMenuComponent }) => {
  const dispatch = useDispatch();
  const messages = useSelector(state => state.messages.messages);
  const config = useSelector(state => state.config);
  
  const latestMessage = getLatestRemote(messages);
  const inputExpected = latestMessage && latestMessage.input_expected;
  const buttons = config.menu.buttons;

  const submitHandler = (payload) => {
    dispatch(messageActions.messageSend(payload));
  };

  const onKeyDown = (event, text) => {
    if (event.keyCode === 13) {
      dispatch(
        messageActions.messageSend({
          text: text
        })
      );
      return true;
    }
    return false;
  };

  return (
    <div
      className={`ChatContainer-input${
        inputExpected ? ' is-expected-input' : ''
      }`}
    >
      {inputExpected === 'checkbox' && (
        <CheckboxMenuComponent
          items={buttons}
          submitHandler={submitHandler}
        />
      )}
      {buttons && (
        <MenuComponent items={buttons} submitHandler={submitHandler} />
      )}
      <InputComponent
        onKeyDown={onKeyDown}
        submitHandler={submitHandler}
        inputExpected={inputExpected}
      />
    </div>
  );
};

InputArea.propTypes = {
  InputComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  MenuComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  CheckboxMenuComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default InputArea; 