/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../people.style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import debounce from '../modules/debounce';
import { createPerson, getPeople } from '../store/actions';

export default function People() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newlinkedIn, setNewlinkedIn] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const search = (term) => {
    console.log(term);
  };

  const debouncedSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const handleOnChange = (event) => {
    switch (event.target.id) {
      case 'connection-name':
        setNewName(event.target.value);
        break;
      case 'email':
        setNewEmail(event.target.value);
        break;
      case 'linkedIn':
        setNewlinkedIn(event.target.value);
        break;
      case 'description':
        setNewDescription(event.target.value);
        break;
      default:
        // pass
    }
  };

  const handleSubmit = () => {
    const fields = {
      name: newName,
      email: newEmail,
      linkedIn: newlinkedIn,
      description: newDescription,
    };
    createPerson(fields)(dispatch, navigate);

    // eslint-disable-next-line no-use-before-define

    // eslint-disable-next-line no-use-before-define
    closeModal();
  };

  // const people = [
  //   {
  //     id: 1,
  //     name: 'Amy',
  //     company: 'Google',
  //     photo: 'https://source.unsplash.com/random/100x100/?img=1',
  //     connection: 'College Alumni',
  //   },
  //   {
  //     id: 2,
  //     name: 'Nilufar',
  //     company: 'Amazon',
  //     photo: 'https://source.unsplash.com/random/100x100/?img=1',
  //     connection: 'Coworker',
  //   },
  //   {
  //     id: 3,
  //     name: 'Stacy',
  //     company: 'Jane Street',
  //     photo: 'https://source.unsplash.com/random/100x100/?img=1',
  //     connection: 'College Alumni',
  //   },
  //   {
  //     id: 4,
  //     name: 'Hampter',
  //     company: 'Meta',
  //     photo: 'https://source.unsplash.com/random/100x100/?img=1',
  //     connection: 'College Alumni',
  //   },
  //   {
  //     id: 5,
  //     name: 'Sigma',
  //     company: 'Meta',
  //     photo: 'https://source.unsplash.com/random/100x100/?img=1',
  //     connection: 'College Alumni',
  //   },
  //   {
  //     id: 6,
  //     name: 'Mark',
  //     company: 'Google',
  //     photo: 'https://source.unsplash.com/random/100x100/?img=1',
  //     connection: 'Coworker',
  //   },
  // ];

  // get people from redux instead
  const people = useSelector((state) => state.person.people);

  useEffect(() => {
    getPeople()(dispatch);
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowPerson = (id) => {
    navigate(`/people/${id}`);
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
                <button className="people-list-item-button" type="button" onClick={() => handleShowPerson(person.id)}>
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
          <label htmlFor="connection-name">
            Connection Name:
            <input id="connection-name" type="text" onChange={handleOnChange} value={newName} />
          </label>
          <br />

          <label htmlFor="email">
            Connection Email:
            <input id="email" type="text" onChange={handleOnChange} value={newEmail} />
          </label>
          <br />

          <label htmlFor="linkedIn">
            Connection linkedIn:
            <input id="linkedIn" type="text" onChange={handleOnChange} value={newlinkedIn} />
          </label>
          <br />

          <label htmlFor="description">
            Connection Description:
            <input id="description" type="text" onChange={handleOnChange} value={newDescription} />
          </label>
          <br />

          <input id="submit" type="button" value="Create" onClick={handleSubmit} />
        </div>
      </div>
      )}
    </div>
  );
}
