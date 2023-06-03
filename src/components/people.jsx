/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../people.style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import debounce from '../modules/debounce';
import { getPeople, searchPeople } from '../store/actions';
import CreatePersonModal from './create-person-modal';

export default function People() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  const search = (term) => {
    if (term) {
      searchPeople(term)(dispatch);
    } else {
      getPeople()(dispatch);
    }
  };

  const debouncedSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const people = useSelector((state) => state.person.people);

  useEffect(() => {
    getPeople()(dispatch);
  }, []);

  const handleShowPerson = (id) => {
    navigate(`/people/${id}`);
  };

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
          <button type="button" onClick={() => setIsGridView(false)}> List </button>
          <button type="button" onClick={() => setIsGridView(true)}> Grid </button>
        </div>
      </div>

      {/* main panel -- contains list of people */}
      <div className="people-main-panel">
        { isGridView
          ? (
            <ul className="people-grid-view">
              { people.map((person) => (
                <li key={person.id} className="people-list-item">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src={person.imageUrl} alt="profile" />
                      </div>
                      <div className="flip-card-back">
                        <h1 className="person-list-item-name">{person.name}</h1>
                        <p className="person-list-item-title">{person.title}</p>
                        <p className="person-list-item-email">{person.email}</p>
                        <p className="person-list-item-description">{person.description}</p>
                      </div>
                    </div>
                  </div>
                  <button className="person-list-item-button" type="button" onClick={() => handleShowPerson(person.id)}>
                    to see full page
                  </button>
                </li>
              ))}
            </ul>
          )
          : (
            <ul className="people-list-view">
              { people.map((person) => (
                <li key={person.id} className="people-list-item">
                  <div className="people-list-card">
                    <div className="person-image">
                      <img src={person.imageUrl} alt="profile" />
                    </div>
                    <div className="person-info">
                      <h1 className="person-name">{person.name}</h1>
                      <p className="person-list-item-title">{person.title}</p>
                      <a className="person-email" href={`mailto:${person.email}`}>{person.email}</a>
                      <p className="person-description">{person.description}</p>
                    </div>
                  </div>
                  <button className="person-more-info-button" type="button" onClick={() => handleShowPerson(person.id)}>
                    to see full page
                  </button>
                </li>
              ))}
            </ul>
          ) }
      </div>

      {isModalOpen && (
        <CreatePersonModal
          closeModal={closeModal}
          personValue={null}
        />
      )}
    </div>
  );
}
