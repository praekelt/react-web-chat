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
            >
                <ReactWebChatComponent url="http://localhost:8080/echo/" />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
