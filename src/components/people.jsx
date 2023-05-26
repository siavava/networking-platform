/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../people.style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import debounce from '../modules/debounce';
import { getPeople } from '../store/actions';
import CreatePersonModal from './create-person-modal';

export default function People() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const search = (term) => {
    console.log(term);
  };

  const debouncedSearch = useCallback(debounce(search, 500), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getPeople()(dispatch);
    getCompanies()(dispatch);
  }, []);

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
      case 'profile-pic':
        setNewPic(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = () => {
    const fields = {
      name: newName,
      email: newEmail,
      linkedIn: newlinkedIn,
      description: newDescription,
      associatedCompany: selectedCompany.value,
      tags: selectedTags.map((tag) => tag.value),
      picture: newPic,
    };
    createPerson(fields)(dispatch, navigate);
    // eslint-disable-next-line no-use-before-define
    closeModal();
  };

  // get people from redux instead
  const people = useSelector((state) => state.person.people);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const companyOptions = companies
    ? companies.map((company) => ({ value: company.id, label: company.name }))
    : [];

  const peopleTagOptions = [
    { value: 'alumni', label: 'Alumni' },
    { value: 'coworker', label: 'Coworker' },
    { value: 'friend', label: 'Friend' },
    { value: 'family', label: 'Family' },
    { value: 'other', label: 'Other' },
  ];

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
        <CreatePersonModal
          dispatch={dispatch}
          navigate={navigate}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
