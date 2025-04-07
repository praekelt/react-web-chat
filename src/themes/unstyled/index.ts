import { Message } from '../../components/Message';
import { InputArea } from '../../components/InputArea';
import type { FC } from 'react';

export default {
  MessageComponent: Message,
  InputComponent: InputArea,
} as {
  MessageComponent: FC<any>;
  InputComponent: FC<any>;
};
