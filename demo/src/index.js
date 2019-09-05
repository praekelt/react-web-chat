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
                    // toggleComponent={<button>Toggle</button>} // enable to test toggeling
                />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
