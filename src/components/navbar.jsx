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
        </ul>
      </nav>
    );
  }
  return (
    <nav>
      <ul className="navbar">
        <li>
          <NavLink to="/homepage">goloco</NavLink>
        </li>

        <div className="inner-navbar">
          <li><NavLink to="/companies">COMPANIES</NavLink></li>
          <li><NavLink to="/people">PEOPLE</NavLink></li>
          <li id="signoutbtn"><NavLink to="/signout">SIGNOUT</NavLink></li>
        </div>
      </ul>
    </nav>
  );
}
