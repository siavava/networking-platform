import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  const path = location.pathname;
  if (path === '/' || path === '/login' || path === '/signup') {
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
  return (
    <nav>
      <ul className="navbar">
        <li><NavLink to="/">Goloco</NavLink></li>

        <div className="inner-navbar">
          <li><NavLink to="/companies">Companies</NavLink></li>
          <li><NavLink to="/people">People</NavLink></li>
          <li><NavLink to="/profile">Profile Photo</NavLink></li>
        </div>
        {/* <li><NavLink to="/test/id1">test id1</NavLink></li>
          <li><NavLink to="/test/id2">test id2</NavLink></li> */}
      </ul>
    </nav>
  );
}
