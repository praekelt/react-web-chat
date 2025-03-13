declare module 'react-linkify';
declare module 'react-mark-ii';
declare module 'recompose';
declare module '*.svg' {
  const content: string;
  export default content;
}

interface CustomEventDetail {
  payload: any;
}

interface CustomEvent extends Event {
  detail: CustomEventDetail;
} 