/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../companies.style.scss';
import { useNavigate } from 'react-router';
import debounce from '../modules/debounce';

export default function Companies() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const search = (term) => {
    console.log(term);
  };

  const debouncedSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const handleSubmit = () => {
    const companyName = document.getElementById('company-name').value;
    const lname = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const confirm = document.getElementById('confirm-password').value;
    console.log(companyName);
    console.log(lname);
    console.log(email);
    console.log(username);
    console.log(password);
    console.log(confirm);
  };

  const companies = [
    {
      companyID: 1,
      name: 'Google',
      bio: 'search engine company that does a lot of stuff.',
      logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    },
    {
      companyID: 2,
      name: 'Apple',
      bio: 'iPhone company that does a lot of stuff.',
      logo: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png?202106030101',
    },
    {
      companyID: 3,
      name: 'Jane Street',
      bio: 'trading company that does a lot of stuff.',
      logo: 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1490162034/isj6uhveo26gw837zr0m.png',
    },
    {
      companyID: 4,
      name: 'Citadel',
      bio: 'trading company that does a lot of stuff.',
      logo: 'https://www.citadel.com/wp-content/uploads/2022/12/Citadel-Logo.png',
    },
    {
      companyID: 5,
      name: 'McKinsey',
      bio: 'consulting company that does a lot of stuff.',
      logo: 'https://1000logos.net/wp-content/uploads/2021/09/McKinsey-Logo-768x483.png',
    },
    {
      companyID: 6,
      name: 'Meta',
      bio: 'social media company that does a lot of stuff.',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Facebook_Home_logo_old.svg/1200px-Facebook_Home_logo_old.svg.png',
    },
  ];

  return (
    <div className="companies">

      {/* top panel -- contains search-bar and toggle */}
      <div className="companies-top-panel">
        {/* search bar */}
        <div className="companies-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* list vs. grid view toggle */}
        <div className="companies-list-grid-toggle">
          <button type="button" id="openModalBtn">Create</button>
          <button type="button"> List </button>
          <button type="button"> Grid </button>
        </div>
      </div>

      {/* main panel -- contains list of companies */}
      <div className="companies-main-panel">
        <ul className="companies-list">
          { companies.map((company) => (
            <li key={company.id} className="companies-list-item">
              <div className="companies-list-item-logo">
                <img src={company.logo} alt="company logo" />
              </div>
              <div className="companies-list-item-info">
                <div className="companies-list-item-name">
                  {company.name}
                </div>
                <div className="companies-list-item-bio">
                  {company.bio}
                </div>
                <button
                  className="companies-list-item-button"
                  type="button"
                  onClick={() => navigate(`${company.companyID}`)}
                >
                  to see full page
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="modal">
        <div className="modal-content">
          <span className="close">&times;</span>
          <label htmlFor="company-name">
            Company Name:
            <input id="company-name" type="text" />
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
      </div>
    </div>
  );
}
