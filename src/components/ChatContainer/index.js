import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setPropTypes } from 'recompose';
import { Fade } from '../../themes/default/components/Animation';

import MessageList from '../MessageList';
import InputArea from '../InputArea';

const mapStateToProps = ({ connection }) => {
    return { connection };
};

const enhance = compose(
    setPropTypes({
        theme: PropTypes.shape({
            ImageComponent: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.func
            ]),
            InputComponent: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.func
            ]),
            MessageComponent: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.func
            ]),
            TextComponent: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.func
            ])
        })
    }),
    connect(mapStateToProps)
);

export class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            showChat: !props.toggleComponent
        };
    }

    componentDidCatch(error, info) {
        // TODO: Refactor this to dispatch a
        // friendly message to the chat UI.
        // Currently, we simply do not render the UI.
        this.setState({ hasError: true });
        console.error(error, info);
    }

    toggleShowChat() {
        this.setState({ showChat: !this.state.showChat });
    }

    render() {
        const { toggleComponent } = this.props;
        const { showChat } = this.state;
        if (this.state.hasError) return <Fragment />;

        return (
            <React.Fragment>
                {toggleComponent && (
                    <div>
                        <button
                            aria-label="Open Chat"
                            onClick={() => this.toggleShowChat()}
                            className="ChatContainer-button ChatContainer-buttonOpen"
                            style={{visibility: showChat ? 'hidden' : 'visible'}}
                        >
                            {toggleComponent}
                        </button>
                        {showChat && (
                            <button
                                aria-label="Close Chat"
                                onClick={() => this.toggleShowChat()}
                                className="ChatContainer-button ChatContainer-buttonClose"
                            >
                                &times;
                            </button>
                        )}
                    </div>
                )}
                {showChat && (
                    <Fade in={true} appear={true}>
                        <div className="ChatContainer">
                            <MessageList theme={this.props.theme} />
                            <InputArea {...this.props.theme} />
                        </div>
                    </Fade>
                )}
            </React.Fragment>
        );
    }
}

export default enhance(ChatContainer);
