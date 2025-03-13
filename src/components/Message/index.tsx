import React from 'react';
import Linkify from 'react-linkify';
import ReactMarkdown from 'react-markdown';

interface Theme {
  ImageComponent?: React.ComponentType<any>;
  TextComponent?: React.ComponentType<any>;
}

interface Props {
  text: string;
  isLocal?: boolean;
  theme: Theme;
}

const DefaultText: React.FC<{ children: string }> = ({ children }) => (
  <Linkify>
    <ReactMarkdown>{children}</ReactMarkdown>
  </Linkify>
);

export const Message: React.FC<Props> = ({ text, isLocal, theme }) => {
  const TextComponent = theme.TextComponent || DefaultText;

  return (
    <div className={`Message ${isLocal ? 'Message--local' : ''}`}>
      <TextComponent>{text}</TextComponent>
    </div>
  );
};

export default Message; 