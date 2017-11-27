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
                    backgroundImage: 'url(http://pngimg.com/uploads/iphone/iphone_PNG5724.png)'
                }}
                className="ReactWebChat"
            >
                <ReactWebChatComponent
                    url="http://localhost:8080/echo/"
                    typingStatus={{
                        delay: 1000,
                        variance: 500
                    }}
                    network={{
                        retransmissionTimeout: 500,
                        retransmissionAttempts: 10,
                        eventNamespace: 'foobar'
                    }}
                />
            </div>
        );
    }
}

window.addEventListener('foobar-PASSTHROUGH_RECEIVE', function(data) {
    console.log('PASSTHOUGHTY~!', data);
});

render(<Demo />, document.querySelector('#demo'));
