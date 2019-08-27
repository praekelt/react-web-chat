import React, { Component } from 'react';
import { render } from 'react-dom';

import { ReactWebChatComponent } from '../../src';
import theme from '../../src/themes/default';

class Demo extends Component {
    render() {
        return (
            <div
                style={{
                    height: '684px',
                    width: '427px'
                    // padding: '92px 60px',
                    // backgroundRepeat: 'no-repeat',
                    // backgroundPosition: '-144px 3px',
                    // backgroundSize: '717px, 580px',
                    // backgroundColor: '#16161d',
                    // backgroundImage:
                    //     'url(http://pngimg.com/uploads/iphone/iphone_PNG5724.png)'
                }}
                className="ReactWebChat"
            >
                <ReactWebChatComponent
                    url="https://qa.feersum.io/chat_sockjs"
                    typingStatus={{
                        active: true,
                        baseDelay: 1000,
                        variance: 500
                    }}
                    network={{
                        channel_id: '1065489f-b2af-4a98-820e-a3f4abad6fa4'
                    }}
                    avatar="http://i.pravatar.cc/300"
                    theme={theme}
                    toggleComponent={<button>Toggle</button>}
                />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
