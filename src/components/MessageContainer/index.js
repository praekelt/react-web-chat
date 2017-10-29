import React from 'react';

// import AvatarStatus from './AvatarStatus';
// import ContentType from './ContentType';
// import Carousel from './Carousel';
// import ChatCarousel from './ChatCarousel';
// import List from './List';
// import Message from './Message';

// This should be fetched from API/Passed down from config.
// const botId = 0;

// const PlainMessage = (pages, isUser) => {
//     return (
//         <div className="MessageBurst-messages">
//             {pages.map((page, i) => (
//                 <div key={page.key || i} className="MessageBurst-item">
//                     <Message>
//                         <ContentType {...page} isUser={isUser} />
//                     </Message>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const AnswerMessage = ({ pages, isUser = true }) => {
//     return (
//         <div className="MessageBurst-messages">
//             {pages.map((page, i) => (
//                 <div key={page.key || i} className="MessageBurst-item">
//                     <Message>
//                         <ContentType {...page} isUser={isUser} />
//                     </Message>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const ListMessage = pages => (
//     <div className="MessageBurst-messages">
//         {/* this had a key previously pete? is it an issue that it doesnt now? */}
//         <div className="MessageBurst-item">
//             <Message>
//                 <List items={pages} />
//             </Message>
//         </div>
//     </div>
// );

// const CarouselMessage = pages => {
//     // return pages[0].buttons
//     //     ? <ChatCarousel pages={pages}/>
//     //     : <Carousel pages={pages}/>
//     //
//     return <ChatCarousel pages={pages} />;
// };

// const layouts = {
//     plain: PlainMessage,
//     list: ListMessage,
//     carousel: CarouselMessage
// };

// {hasSelectedInput ? (
//     <AnswerMessage
//         {...{
//             pages: [
//                 {
//                     text: pages[0].buttons[rest.selectedInput].text
//                 }
//             ]
//         }}
//     />
// ) : (
//     layouts[layout](pages, isUser)
// )}

const MessageContainer = ({ userId, type, children, layout, isLocal, pages, ...rest }) => {
    let hasSelectedInput = rest.selectedInput !== undefined && rest.selectedInput !== null;
    return <div className={`MessageContainer ${isLocal ? 'is-local' : ''}`}>{children}</div>;
};

export default MessageContainer;
