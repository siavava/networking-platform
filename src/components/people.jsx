/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import Select from 'react-select';
import '../people.style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import debounce from '../modules/debounce';
import { createPerson, getPeople, getCompanies } from '../store/actions';

export default function People() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newlinkedIn, setNewlinkedIn] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPic, setNewPic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const search = (term) => {
    console.log(term);
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
          <span className="close" onClick={closeModal}>x</span>
          <label htmlFor="connection-name">
            Connection Name:
            <input id="connection-name" type="text" onChange={handleOnChange} value={newName} />
          </label>
          <br />

          <div>
            <label>
              Connection Company:
              <Select id="connection-company"
                value={selectedCompany}
                onChange={setSelectedCompany}
                options={companyOptions}
              />
            </label>
            <br />
          </div>

          <label htmlFor="email">
            Connection Email:
            <input id="email" type="text" onChange={handleOnChange} value={newEmail} />
          </label>
          <br />

          <label htmlFor="linkedIn">
            Connection LinkedIn:
            <input id="linkedIn" type="text" onChange={handleOnChange} value={newlinkedIn} />
          </label>
          <br />

          <div>
            <label>
              Connection Tags:
              <Select
                id="connection-tags"
                isMulti
                options={peopleTagOptions}
                value={selectedTags}
                onChange={setSelectedTags}
              />
            </label>
            <br />
          </div>

          <label htmlFor="description">
            Connection Description:
            <input id="description" type="text" onChange={handleOnChange} value={newDescription} />
          </label>
          <br />

          <label htmlFor="profile-pic">
            Connection Picture URL:
            <input id="profile-pic" type="text" onChange={handleOnChange} value={newPic} />
          </label>
          <br />

          <input id="submit" type="button" value="Create" onClick={handleSubmit} />
        </div>
      </div>
      )}
    </div>
  );
}
