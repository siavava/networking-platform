import React from 'react';
import '../auth-error-modal.style.scss';

export default function AuthErrorModal(props) {
  const { errorCode, closeErrorModal } = props;

  const resolutions = {
    0: 'Network Error',
    401: 'Incorrect email or password.',
    422: 'The email is already in use, please try another email.',
    500: 'Internal server error.',
    999: 'Invalid field entries. Please try again.',
  };

  return (
    <div className="error-modal">
      <div className="error-modal-content">
        <button type="submit" onClick={closeErrorModal} className="close-button">
          <i className="material-icons close-icon" id="svg_options">close</i>
        </button>
        <div className="error-code"> {errorCode} </div>
        <div className="error-message"> {resolutions[errorCode]} </div>
      </div>
    </div>
  );
}
