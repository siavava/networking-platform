/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signin } from '../store/actions';

import '../signup.style.scss';
import { validateEmail, validatePassword } from '../modules/validate';
import AuthErrorModal from './auth-error-modal';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

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

  const showErrorModal = () => {
    setShowError(true);
  };

  const closeErrorModal = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, []);

  const handleSubmit = () => {
    const validate = () => (
      validEmail() && validPassword()
    );
    if (validate()) {
      signin({ email, password })(dispatch, navigate).then((response) => {
        if (response.code === 200) {
          console.log('Sign in successful');
        } else {
          console.log('Sign in failed');
          console.log(`response: ${response.message}`);
          try {
            setErrorCode(response.response.status || 0);
          } catch (error) {
            setErrorCode(0);
          }
          showErrorModal();
        }
      });
    } else {
      setErrorCode(999);
      showErrorModal();
    }
  };

  return (
    <div className="signup-modal">
      <h1>Welcome to Goloco</h1>
      <NavLink to="/" className="close-button">
        <i className="material-icons close-icon" id="svg_options">close</i>
      </NavLink>

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
      <input id="submit" type="button" value="Sign In" onClick={handleSubmit} />

      { showError && (
        <AuthErrorModal
          errorCode={errorCode}
          closeErrorModal={closeErrorModal}
        />
      )}
    </div>
  );
}
