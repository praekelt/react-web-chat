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
                this.props.message.attachment_end_point,
                window.btoa(e.target.result)
            ))(file);
        reader.readAsBinaryString(file);
    }

    successfulUploadAttachment(response) {
        console.log(response);

        this.props.submitHandler({
            // postback: button.postback,
            text: response.text
        });

        this.setState({ loading: false });
        // return response;
    }

    failureUploadAttachment() {
        this.setState({
            loading: false,
            error: 'Something went wrong. Please try uploading again'
        });
        // alert('FAIL');
    }

    uploadAttachment(url, file) {
        this.setState({ loading: true, error: '' });
        let headers = new Headers();

        // headers.set(
        //     'Authorization',
        //     'Basic ' + btoa(authString)
        // );
        fetch(url, {
            method: 'POST',
            // headers: headers
            body: JSON.stringify({
                a: 1,
                b: 2,
                file: file
            })
        })
            .then(r => this.successfulUploadAttachment(r))
            .catch(r => this.failureUploadAttachment(r));
    }

    render() {
        const { message } = this.props;
        const { loading, error } = this.state;

        console.log('STATE', loading);
        return (
            <div>
                {error && <p>{error}</p>}
                {loading && <p>Loading</p>}
                <input
                    type="file"
                    onChange={e => this.convertAndSaveAttachemnt(e)}
                    // accept="image/png, image/jpeg"
                />
            </div>
        );
    }
}

export default AttachmentMessage;
