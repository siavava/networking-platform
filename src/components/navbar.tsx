import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  if (path === '/' || path === '/login' || path === '/signup') {
    return (
      <nav>
        <ul className="navbar">
          <li><NavLink to="/">Goloco</NavLink></li>

          <div className="inner-navbar">
            <li className="authbtns"><NavLink to="/login">Log In</NavLink></li>
          </div>
        </ul>
      </nav>
    );
  }
  return (
    <nav>
      <ul className="navbar">
        <li className="goloco">
          <NavLink to="/home">goloco</NavLink>
        </li>

        <div className="inner-navbar">
          <li><NavLink to="/companies">COMPANIES</NavLink></li>
          <li><NavLink to="/people">PEOPLE</NavLink></li>
          <li>
            <button type="button" className="settingButton" onClick={() => navigate('/settings')}>
              <i className="material-icons" id="svg_options">settings</i>
            </button>
          </li>
          <li className="authbtns"><NavLink to="/signout">SIGNOUT</NavLink></li>
        </div>
      </ul>
    </nav>
  );
}
