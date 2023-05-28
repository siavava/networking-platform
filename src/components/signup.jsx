/* eslint-disable no-console */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import actions
import { signup } from '../store/actions';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFname] = useState('');
  const [lastName, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    const validate = () => firstName !== '' && lastName !== '' && email !== '' && password !== '' && password === confirm;
    if (validate()) {
      signup({
        firstName,
        lastName,
        email,
        password,
      })(dispatch, navigate);
    }
  };

  return (
    <div className="signup-modal">
      <h1>Create An Account</h1>
      <NavLink to="/" className="close-button">x</NavLink>
      <br />

      <label htmlFor="first-name">
        First Name:
        <input id="first-name" type="text" value={firstName} onChange={(e) => setFname(e.target.value)} />
      </label>
      <br />

      <label htmlFor="last-name">
        Last Name:
        <input id="last-name" type="text" value={lastName} onChange={(e) => setLname(e.target.value)} />
      </label>
      <br />

      <label htmlFor="email">
        Email:
        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />

      <label htmlFor="password">
        Password:
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />

      <label htmlFor="confirm-password">
        Confirm Password:
        <input id="confirm-password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </label>
      <br />

      <input id="submit" type="button" value="Create" onClick={handleSubmit} />

    </div>
  );
}
