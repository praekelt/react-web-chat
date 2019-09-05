import React, { Component } from 'react';

class AttachmentMessage extends Component {
    constructor(props) {
        super(props);
        this.state = { error: '', loading: false };
    }

    convertAndSaveAttachemnt(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (() => e =>
            this.uploadAttachment(
                this.props.message,
                `data:${file.type};base64,${window.btoa(e.target.result)}`
            ))(file);
        reader.readAsBinaryString(file);
    }

    successfulUploadAttachment(response) {

        this.props.submitHandler({
            // postback: button.postback,
            text: response.json()
        });

    }

    failureUploadAttachment() {
        this.setState({
            loading: false,
            error: 'Something went wrong. Please try uploading again'
        });
    }

    uploadAttachment(message, file) {
        this.setState({ loading: true, error: '' });

        const {
            attachment_end_point,
            authorization,
            organization_id,
            agent_id
        } = message;


        let headers = new Headers();

        headers.set('Authorization', authorization);
        headers.set('Content-Type', 'application/json');
        fetch(attachment_end_point, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                file: {
                    base64: file,
                    organization_id,
                    agent_id,
                    meta: {}
                }
            })
        })
            .then(r => this.successfulUploadAttachment(r))
            .catch(r => this.failureUploadAttachment(r));
    }

    render() {
        const { loading, error } = this.state;

        return (
            <div>
                {error && <p>{error}</p>}
                {loading && <p>Loading</p>}
                <input
                    type="file"
                    onChange={e => this.convertAndSaveAttachemnt(e)}
                />
            </div>
        );
    }
}

export default AttachmentMessage;
