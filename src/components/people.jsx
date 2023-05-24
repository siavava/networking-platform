/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../people.style.scss';
import { connect } from 'react-redux';
import debounce from '../modules/debounce';

export default function People() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const search = (term) => {
    console.log(term);
  };

  const debouncedSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const handleSubmit = () => {
    const connectionName = document.getElementById('connection-name').value;
    const connectionCompany = document.getElementById('connection-company').value;
    const email = document.getElementById('email').value;
    const connectionType = document.getElementById('connection-type').value;
    console.log(connectionName);
    console.log(connectionCompany);
    console.log(email);
    console.log(connectionType);

    // eslint-disable-next-line no-use-before-define
    closeModal();
  };

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <button type="button" onClick={openModal}>Create</button>
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

      {isModalOpen && (
      <div className="modal">
        <div className="modal-content">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span className="close" onClick={closeModal}>&times;</span>
          <label htmlFor="company-name">
            Connection Name:
            <input id="connection-name" type="text" />
          </label>
          <br />

          <label htmlFor="last-name">
            Connection Company:
            <input id="connection-company" type="text" />
          </label>
          <br />

          <label htmlFor="email">
            Connection Email:
            <input id="email" type="text" />
          </label>
          <br />

          <label htmlFor="username">
            Connection Type:
            <input id="connection-type" type="text" />
          </label>
          <br />

          <input id="submit" type="button" value="Create" onClick={handleSubmit} />
        </div>
      </div>
      )}
    </div>
  );
}
