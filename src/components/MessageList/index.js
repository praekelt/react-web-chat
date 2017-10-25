// @ts-check
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { easeInOutQuad } from '../../utils/animation';

const mapStateToProps = ({ messages }) => {
    return { messages: messages.messages };
};

class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0
        };
    }

    componentDidUpdate() {
        let targetOffset = [...this._ref.children].reduce(
            (acc, curr) => acc + curr.offsetHeight,
            0
        );
        this._ref.scrollTop = targetOffset;
    }

    render() {
        let { messages, ImageComponent, MessageComponent } = this.props;
        return (
            <ul className="ChatContainer-content" ref={ref => (this._ref = ref)}>
                {messages.map((message, i) => (
                    <li key={i}>
                        <MessageComponent {...message} ImageComponent={ImageComponent} />
                    </li>
                ))}
            </ul>
        );
    }
}

MessageList.PropTypes = {
    messages: PropTypes.object,
    MessageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
    ImageComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
};

export default connect(mapStateToProps)(MessageList);
