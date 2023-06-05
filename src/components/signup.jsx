/* eslint-disable no-console */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import '../signup.style.scss';

// import actions
import { signup } from '../store/actions';
import { validateName, validateEmail, validatePassword } from '../modules/validate';
import AuthErrorModal from './auth-error-modal';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('Amittai');
  const [lastName, setLastName] = useState('Siavava');
  const [email, setEmail] = useState('amittai.j.wekesa.24@dartmouth.edu');
  const [confirm, setConfirm] = useState('kJDXDYk*3');
  const [password, setPassword] = useState('kJDXDYk*3');
  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  const showErrorModal = () => {
    setShowError(true);
  };

  const closeErrorModal = () => {
    setShowError(false);
  };

  /**
   * Validate first name
   * @returns {boolean}
   */
  const validFirstName = () => validateName(firstName);

  /**
   * Validate last name
   * @returns {boolean}
   */
  const validLastName = () => validateName(lastName);

  /**
   * Validate email
   * @returns {boolean}
   */
  const validEmail = () => validateEmail(email);

  /**
   * Validate password
   * @returns {boolean}
   */
  const validPassword = () => validatePassword(password);

  /**
   * Validate confirm password
   * @returns {boolean}
   */
  const validConfirm = () => password === confirm;

  const handleSubmit = () => {
    const validate = () => (
      validFirstName() && validLastName() && validEmail() && validPassword() && validConfirm()
    );
    if (validate()) {
      signup({
        firstName,
        lastName,
        email,
        password,
      })(dispatch, navigate).then((response) => {
        if (response.code === 200) {
          console.log('Sign up successful');
        } else {
          console.log('Sign up failed');
          // console.log(`response: ${response.response.status}`);
          console.log(`response: ${Object.keys(response)}`);
          try {
            setErrorCode(response.response.status || 0);
          } catch (error) {
            setErrorCode(0);
          }
          showErrorModal();
        }
      }).catch(() => {
        showErrorModal();
      });
    } else {
      console.log('Invalid input');
      setErrorCode(999);
      showErrorModal();
    }
  };

  return (
    <div className="signup-modal">
      <h1>Create An Account</h1>
      <NavLink to="/" className="close-button">
        <i className="material-icons close-icon" id="svg_options">close</i>
      </NavLink>

      <label htmlFor="first-name">
        <div> First Name</div>
        <input id="first-name"
          className={[
            'verify',
            validFirstName() ? '' : 'error',
          ].join(' ')}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>

      <label htmlFor="last-name">
        <div>Last Name</div>
        <input id="last-name"
          className={[
            'verify',
            validLastName() ? '' : 'error',
          ].join(' ')}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>

      <label htmlFor="email">
        <div>Email</div>
        <input id="email"
          className={[
            'verify',
            validEmail() ? '' : 'error',
          ].join(' ')}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="password">
        <div>Password</div>
        <input id="password"
          className={[
            'verify',
            validPassword() ? '' : 'error',
          ].join(' ')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label htmlFor="confirm-password">
        <div>Confirm Password</div>
        <input id="confirm-password"
          className={[
            'verify',
            validConfirm() ? '' : 'error',
          ].join(' ')}
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </label>

      <input id="submit" type="button" value="Create" onClick={handleSubmit} />

      { showError && (
      <AuthErrorModal
        errorCode={errorCode}
        closeErrorModal={closeErrorModal}
      />
      ) }
    </div>
  );
}
