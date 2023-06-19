import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/landing-page.style.scss';

export default function Landing() {
  return (
    <div className="landing-page">
      <img src="https://i.imgur.com/L9Fd2jv.png" alt="logo" />
      <p>A Modern Solution For Networking</p>
      <button type="button"><NavLink to="/signup">Join Now!</NavLink></button>
    </div>
  );
}
