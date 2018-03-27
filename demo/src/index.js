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
                    url='https://dev.feersum.io/chat_sockjs'
                    avatar='/demo/src/images/avatar.png'
                    typingStatus={{
                        active: true,
                        baseDelay: 1000,
                        variance: 500
                    }}
                    network={{
                        eventNamespace: 'foobar',
                        channel_id: 'f131a49f-b505-4cac-ae0a-7e1fff0aed1b',
                    }}
                />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
