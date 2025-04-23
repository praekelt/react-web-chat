import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * AttachmentMessage - Component for handling file attachments in chat messages
 */
const AttachmentMessage = ({ message, submitHandler }) => {
  const [state, setState] = useState({ error: '', loading: false });

  const convertAndSaveAttachment = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      uploadAttachment(
        message,
        `data:${file.type};base64,${window.btoa(event.target.result)}`
      );
    };
    reader.readAsBinaryString(file);
  };

  const successfulUploadAttachment = (response) => {
    setState({
      loading: false,
      error: ''
    });

    response.json()
      .then(r => {
        submitHandler(
          {
            text: JSON.stringify({
              uuid: r.data.uuid,
              mime_type: r.data.mime_type
            }),
            showMessage: false
          },
          'text'
        );
      })
      .catch(() => failureUploadAttachment());
  };

  const failureUploadAttachment = () => {
    setState({
      loading: false,
      error: 'Something went wrong. Please try uploading again'
    });

    document.getElementById(`file-${message.timeAdded}`).value = '';
  };

  const uploadAttachment = (message, file) => {
    setState({ loading: true, error: '' });

    const {
      attachment_end_point,
      authorization,
      organization_id,
      agent_id,
      bucket
    } = message;

    const headers = new Headers();
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
          meta: {
            bucket
          }
        }
      })
    })
      .then(r => successfulUploadAttachment(r))
      .catch(() => failureUploadAttachment());
  };

  const { loading, error } = state;
  const fileId = `file-${message.timeAdded}`;

  return (
    <div className="MessagesList-attachmentMessageItem">
      {error && <p className="error">{error}</p>}
      {loading && <div className="loader"></div>}
      <input
        type="file"
        name={fileId}
        id={fileId}
        onChange={convertAndSaveAttachment}
      />
      {!loading && (
        <label htmlFor={fileId}>
          Choose a file
        </label>
      )}
    </div>
  );
};

AttachmentMessage.propTypes = {
  message: PropTypes.shape({
    timeAdded: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    attachment_end_point: PropTypes.string.isRequired,
    authorization: PropTypes.string.isRequired,
    organization_id: PropTypes.string.isRequired,
    agent_id: PropTypes.string.isRequired,
    bucket: PropTypes.string.isRequired
  }).isRequired,
  submitHandler: PropTypes.func.isRequired
};

export default AttachmentMessage; 