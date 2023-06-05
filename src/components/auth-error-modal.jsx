import React from 'react';
import '../style/auth-error-modal.style.scss';
import ReactMarkdown from 'react-markdown';

export default function AuthErrorModal(props) {
  const { errorCode, closeErrorModal, signup } = props;

  let invalidFields = '# Invalid field entries. Please try again.\n';
  if (signup) invalidFields += '- First name and last name must be at least 2 characters long.\n';

  invalidFields += '- Email must be a valid email address.\n';
  invalidFields += '- Password must be at least 8 characters long.\n';
  invalidFields += '- Password must contain at least one uppercase letter, one lowercase letter, and one number.\n';

  if (signup) invalidFields += '- Password and confirm password must match.\n';

  const resolutions = {
    0: '# Network Error',
    401: '# Incorrect email or password.',
    422: '# The email is already in use, please try another email.',
    500: '# Internal server error.',
    999: invalidFields,
  };

  return (
    <div className="error-modal">
      <div className="error-modal-content">
        <button type="submit" onClick={closeErrorModal} className="close-button">
          <i className="material-icons close-icon" id="svg_options">close</i>
        </button>
        <div className="error-code"> {errorCode} </div>
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown className="error-message" children={resolutions[errorCode]} />
      </div>
    </div>
  );
}
