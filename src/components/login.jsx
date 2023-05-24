/* eslint-disable no-console */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { signin } from '../store/actions';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const validate = () => email !== '' && password !== '';

    if (validate()) {
      signin({ email, password })(dispatch, navigate);
    }
  };

  return (
    <div className="login-modal">
      <h1>Welcome!</h1>
      <NavLink to="/" className="close-button">x</NavLink>
      <br />
      <label htmlFor="username">
        Username:
        <input id="username" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>

      <br />
      <input id="submit" type="button" value="Sign In" onClick={handleSubmit} />

    </div>
  );
}
