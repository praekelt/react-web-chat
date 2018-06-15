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
                    url="https://fe-pr-87.dev.feersum.io/chat_sockjs"
                    element={document.getElementById('my-chat-element')}
                    typingStatus={{
                        active: true,
                        baseDelay: 1000,
                        variance: 500,
                        active: true,
                        baseDelay: 200,
                        variance: 100,
                        letterDelay: 10,
                        minDelay: 200,
                        maxDelay: 2000
                    }}
                    network={{
                        channel_id: 'd120d516-a2f2-4d3a-b2ec-f3e9909b546d'
                    }}
                    menu={{buttons:[]}}
                />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
