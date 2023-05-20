/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../companies.style.scss';
import debounce from '../modules/debounce';

export default function People() {
  const [searchTerm, setSearchTerm] = useState('');
  const search = (term) => {
    console.log(term);
  };

  const debouncedSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const people = [
    {
      id: 1,
      name: 'Swati',
      company: 'Google',
      photo: 'https://source.unsplash.com/random/100x100/?img=1',
      connection: 'College Alumni',
    },
    {
      id: 2,
      name: 'Nilufar',
      company: 'Amazon',
      photo: 'https://source.unsplash.com/random/100x100/?img=1',
      connection: 'Coworker',
    },
    {
      id: 3,
      name: 'Annie',
      company: 'Amazon',
      photo: 'https://source.unsplash.com/random/100x100/?img=1',
      connection: 'College Alumni',
    },
    {
      id: 4,
      name: 'Hampter',
      company: 'Meta',
      photo: 'https://source.unsplash.com/random/100x100/?img=1',
      connection: 'College Alumni',
    },
    {
      id: 5,
      name: 'Sigma',
      company: 'Meta',
      photo: 'https://source.unsplash.com/random/100x100/?img=1',
      connection: 'College Alumni',
    },
    {
      id: 6,
      name: 'Genji',
      company: 'Google',
      photo: 'https://source.unsplash.com/random/100x100/?img=1',
      connection: 'Coworker',
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
          <button type="button"> List </button>
          <button type="button"> Grid </button>
        </div>
      </div>

      {/* main panel -- contains list of companies */}
      <div className="companies-main-panel">
        <ul className="companies-list">
          { people.map((person) => (
            <li key={person.id} className="companies-list-item">
              <div className="companies-list-item-photo">
                <img src={person.photo} alt="profile" />
              </div>
              <div className="companies-list-item-info">
                <div className="companies-list-item-name">
                  {person.name}
                </div>
                <div className="companies-list-item-company">
                  {person.company}
                </div>
                <div className="companies-list-item-company">
                  {person.connection}
                </div>
                <button className="companies-list-item-button" type="button">
                  to see full page
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
