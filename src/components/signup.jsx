/* eslint-disable no-console */
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import actions
import { signup } from '../store/actions';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    // const fname = document.getElementById('first-name').value;
    // const lname = document.getElementById('last-name').value;
    // const email = document.getElementById('email').value;
    // const password = document.getElementById('password').value;
    // const username = document.getElementById('username').value;
    // const confirm = document.getElementById('confirm-password').value;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(confirm);

    const validate = () => username !== '' && password !== '' && confirm !== '' && password === confirm;

    if (validate()) {
      signup(username, password, email, fname, lname)(dispatch, navigate);
    }
  };

  return (
    <div className="signup-modal">
      <h1>Create An Account</h1>
      <NavLink to="/" className="close-button">x</NavLink>
      <br />

      <label htmlFor="first-name">
        First Name:
        <input id="first-name" type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
      </label>
      <br />

      <label htmlFor="last-name">
        Last Name:
        <input id="last-name" type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
      </label>
      <br />

      <label htmlFor="email">
        Email:
        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />

      <label htmlFor="username">
        Username:
        <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />

      <label htmlFor="password">
        Password:
        <input id="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />

      <label htmlFor="confirm-password">
        Confirm Password:
        <input id="confirm-password" type="text" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </label>
      <br />

      <input id="submit" type="button" value="Create" onClick={handleSubmit} />

    </div>
  );
}
