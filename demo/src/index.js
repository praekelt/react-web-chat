import React, { Component } from 'react';
import { render } from 'react-dom';
import theme from '../../src/themes/default';

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
                    // url="https://dev.feersum.io/chat_sockjs"

                    url="http://localhost:8000"
                    typingStatus={{
                        active: true,
                        baseDelay: 1000,
                        variance: 500
                    }}
                    network={{
                        // channel_id: '3998e8a9-b329-4de9-a03c-040cc0348e42'

                        channel_id: '6567c91f-1ece-4289-ba7a-1a2aa34504c9',
                        transportServerUrl: 'http://127.0.0.1:8050'
                    }}
                    avatar="http://i.pravatar.cc/300"
                    theme={theme}
                />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
