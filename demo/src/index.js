import React, { Component } from 'react';
import { render } from 'react-dom';

import { ReactWebChatComponent } from '../../src';

class Demo extends Component {
    render() {
        return (
            <div style={{ height: '800px' }}>
                <ReactWebChatComponent url="http://localhost:8080/echo/" />
            </div>
        );
    }
}

render(<Demo />, document.querySelector('#demo'));
