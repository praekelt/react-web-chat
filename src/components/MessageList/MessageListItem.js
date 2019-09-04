import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AvatarContainer from '../AvatarContainer';
import MessageContainer from '../MessageContainer';
import Message from '../Message';

class MessageListItem extends PureComponent {
    render() {
        const {
            itemRef,
            message,
            prevMessageOrigin,
            submitHandler,
            theme
        } = this.props;
        return (
            <li
                className={`MessagesList-item${
                    message.origin === 'local' ? ' is-local' : ''
                }`}
                ref={itemRef}
            >
                {message.origin === 'remote' && prevMessageOrigin && (
                    <AvatarContainer AvatarComponent={theme.AvatarComponent} />
                )}
                <div className="MessagesList-messageItem">
                    <MessageContainer key="text" {...message}>
                        {message.origin === 'remote' ? (
                            message.pages.map((page, i) => (
                                <Message
                                    key={i}
                                    page={page}
                                    isLocal={message.origin === 'local'}
                                    {...theme}
                                    submitHandler={submitHandler}
                                />
                            ))
                        ) : (
                            <Message
                                page={{ text: message.text }}
                                isLocal={true}
                                {...theme}
                            />
                        )}
                    </MessageContainer>
                    {message.buttons && message.buttonStyle === 'default' && (
                        <MessageContainer key="buttons" {...message}>
                            {message.buttons.map((button, i) => (
                                <theme.ButtonComponent
                                    key={i}
                                    text={button.text}
                                    phone={button.phone}
                                    url={button.url}
                                    onClick={() =>
                                        submitHandler({
                                            postback: button.postback,
                                            text: button.text
                                        })
                                    }
                                />
                            ))}
                        </MessageContainer>
                    )}
                    {message.message_type === 'attachment' && (
                        <MessageContainer key="attachment" {...message}>
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                onChange={e => {
                                    console.log(e.target.files[0], this);
                                    var f = e.target.files[0];
                                    var reader = new FileReader();
                                    // Closure to capture the file information.
                                    reader.onload = (function(theFile) {
                                        return function(e) {
                                            var binaryData = e.target.result;
                                            //Converting Binary Data to base 64
                                            var base64String = window.btoa(
                                                binaryData
                                            );
                                            //showing file converted to base64

                                            alert(
                                                'File converted to base64 successfuly!\nCheck in Textarea'
                                            );

                                            let headers = new Headers();
                                            // headers.set(
                                            //     'Authorization',
                                            //     'Basic ' + btoa(authString)
                                            // );
                                            fetch(
                                                message.attachment_end_point,
                                                {
                                                    method: 'POST',
                                                    // headers: headers
                                                    body: JSON.stringify({
                                                        a: 1,
                                                        b: 2,
                                                        file: base64String
                                                    })
                                                }
                                            ).then(function(response) {
                                                console.log(response);
                                                return response;
                                            });
                                        };
                                    })(f);
                                    // Read in the image file as a data URL.
                                    reader.readAsBinaryString(f);
                                }}
                                // accept="image/png, image/jpeg"
                            />
                            <button
                                onClick={() => {
                                    submitHandler(
                                        {
                                            postback: message.postback,
                                            text: 'http://google.com'
                                        },
                                        'text'
                                    );
                                }}
                            >
                                Test
                            </button>
                        </MessageContainer>
                    )}
                </div>
            </li>
        );
    }
}

export default MessageListItem;
