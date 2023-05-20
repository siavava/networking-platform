import React from 'react';
import { NavLink } from 'react-router-dom';

export default function SignUp() {
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
    </div>
  );
}
