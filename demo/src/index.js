import React, { Component } from 'react';
import { render } from 'react-dom';

import { ReactWebChatComponent } from '../../src';

class Demo extends Component {
    render() {
        return (
            <div
                style={{
                    height: '684px',
                    width: '427px',
                    padding: '92px 60px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '-144px 3px',
                    backgroundSize: '717px, 580px',
                    backgroundColor: '#16161d',
                    backgroundImage:
                        'url(http://pngimg.com/uploads/iphone/iphone_PNG5724.png)'
                }}
                className="ReactWebChat"
            >
                <ReactWebChatComponent
                    url="https://dev.feersum.io/chat_sockjs"
                    typingStatus={{
                        active: true,
                        baseDelay: 1000,
                        variance: 500
                    }}
                    network={{
                        channel_id: '07911543-7d9e-46e3-b4d3-48d1370a98b7'
                    }}
                    menu={{
                      buttons: [
                        {
                          type: "transition",
                          text: "asdf",
                          postback: {
                            route: "f\/w\/3f-1BQnWQbGFeFUi_ZkeNg"
                          }
                        },
                        {
                          type: "url",
                          text: "fdsa",
                          url: "http:\/\/fas.s"
                        }
                      ]
                }}
                />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
