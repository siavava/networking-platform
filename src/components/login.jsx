/* eslint-disable no-console */
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function LogIn() {
  const handleSubmit = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
  };

  return (
    <div className="modal">
      <h1>Welcome!</h1>
      <NavLink to="/">x</NavLink>
      <br />
      <label htmlFor="username">
        username:
        <input id="username" type="text" />
      </label>
      <br />
      <label htmlFor="password">
        password:
        <input id="password" type="text" />
      </label>

      <br />
      <input id="submit" type="button" value="sign in" onClick={handleSubmit} />

    </div>
  );
}
