/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../people.style.scss';
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
      name: 'Amy',
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
      name: 'Stacy',
      company: 'Jane Street',
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
      name: 'Mark',
      company: 'Google',
      photo: 'https://source.unsplash.com/random/100x100/?img=1',
      connection: 'Coworker',
    },
  ];

  return (
    <div className="people">

      {/* top panel -- contains search-bar and toggle */}
      <div className="people-top-panel">
        {/* search bar */}
        <div className="people-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* list vs. grid view toggle */}
        <div className="people-list-grid-toggle">
          <button type="button"> List </button>
          <button type="button"> Grid </button>
        </div>
      </div>

      {/* main panel -- contains list of people */}
      <div className="people-main-panel">
        <ul className="people-list">
          { people.map((person) => (
            <li key={person.id} className="people-list-item">
              <div className="people-list-item-photo">
                <img src={person.photo} alt="profile" />
              </div>
              <div className="people-list-item-info">
                <div className="people-list-item-name">
                  {person.name}
                </div>
                <div className="people-list-item-company">
                  {person.company}
                </div>
                <div className="people-list-item-company">
                  {person.connection}
                </div>
                <button className="people-list-item-button" type="button">
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
