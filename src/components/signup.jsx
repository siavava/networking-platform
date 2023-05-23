/* eslint-disable no-console */
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
  const handleSubmit = () => {
    const fname = document.getElementById('first-name').value;
    const lname = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const confirm = document.getElementById('confirm-password').value;
    console.log(fname);
    console.log(lname);
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(confirm);
  };

  return (
    <div className="signup-modal">
      <h1>Create An Account</h1>
      <NavLink to="/" className="close-button">x</NavLink>
      <br />

      <label htmlFor="first-name">
        First Name:
        <input id="first-name" type="text" />
      </label>
      <br />

      <label htmlFor="last-name">
        Last Name:
        <input id="last-name" type="text" />
      </label>
      <br />

      <label htmlFor="email">
        Email:
        <input id="email" type="text" />
      </label>
      <br />

      <label htmlFor="username">
        Username:
        <input id="username" type="text" />
      </label>
      <br />

      <label htmlFor="password">
        Password:
        <input id="password" type="text" />
      </label>
      <br />

      <label htmlFor="confirm-password">
        Confirm Password:
        <input id="confirm-password" type="text" />
      </label>
      <br />

      <input id="submit" type="button" value="Create" onClick={handleSubmit} />

    </div>
  );
}
