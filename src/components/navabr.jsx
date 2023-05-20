import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {
  return (
    <nav>
      <ul className="navbar">
        <li><NavLink to="/">Goloco</NavLink></li>

        <div className="inner-navbar">
          <li><NavLink to="/signup">Sign Up</NavLink></li>
          <li><NavLink to="/login">Log In</NavLink></li>
        </div>
        {/* <li><NavLink to="/test/id1">test id1</NavLink></li>
        <li><NavLink to="/test/id2">test id2</NavLink></li> */}
      </ul>
    </nav>
  );
}
