/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../companies.style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import debounce from '../modules/debounce';
import {
  getCompanies, createCompany,
} from '../store/actions';

export default function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyLocation, setNewCompanyLocation] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [newlinkedIn, setNewlinkedIn] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
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
    getCompanies()(dispatch);
  }, []);

  const handleOnChange = (event) => {
    switch (event.target.id) {
      case 'company-name':
        setNewCompanyName(event.target.value);
        break;
      case 'company-location':
        setNewCompanyLocation(event.target.value);
        break;
      case 'website-link':
        setNewWebsite(event.target.value);
        break;
      case 'linkedIn':
        setNewlinkedIn(event.target.value);
        break;
      case 'description':
        setNewDescription(event.target.value);
        break;
      case 'imageURL':
        setNewImageUrl(event.target.value);
        break;
      default:
          // pass
    }
  };

  const handleSubmit = () => {
    const fields = {
      name: newCompanyName,
      website: newWebsite,
      location: newCompanyLocation,
      linkedIn: newlinkedIn,
      description: newDescription,
      imageUrl: newImageUrl,
    };
    createCompany(fields)(dispatch, navigate);
    // eslint-disable-next-line no-use-before-define
    closeModal();
  };

  const companies = useSelector((state) => state.company.companies) || [];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowCompany = (id) => {
    navigate(`/companies/${id}`);
  };

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
          <button type="button" onClick={openModal}>Create</button>
          <button type="button"> List </button>
          <button type="button"> Grid </button>
        </div>
      </div>

      {/* main panel -- contains list of people */}
      <div className="companies-main-panel">
        <ul className="companies-list">
          { companies.map((company) => (
            <li key={company.id} className="companies-list-item">
              <div className="companies-list-item-logo">
                <img src={company.imageUrl} alt="profile" />
              </div>
              <div className="companies-list-item-info">
                <div className="companies-list-item-name">
                  {company.name}
                </div>
                <div className="companies-list-item-company">
                  {company.company}
                </div>
                <div className="companies-list-item-company">
                  {company.connection}
                </div>
                <button className="companies-list-item-button" type="button" onClick={() => handleShowCompany(company.id)}>
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
          <label htmlFor="company-name">
            Company Name:
            <input id="company-name" type="text" onChange={handleOnChange} value={newCompanyName} />
          </label>
          <br />

          <label htmlFor="company-location">
            Company Location:
            <input id="company-location" type="text" onChange={handleOnChange} value={newCompanyLocation} />
          </label>
          <br />

          <label htmlFor="company-website">
            Website Link:
            <input id="website-link" type="text" onChange={handleOnChange} value={newWebsite} />
          </label>
          <br />

          <label htmlFor="company-linkedIn">
            LinkedIn URL:
            <input id="linkedIn" type="text" onChange={handleOnChange} value={newlinkedIn} />
          </label>
          <br />

          <label htmlFor="company-description">
            Company Description:
            <input id="description" type="text" onChange={handleOnChange} value={newDescription} />
          </label>
          <br />

          <label htmlFor="company-description">
            Company Logo Image URL:
            <input id="imageURL" type="text" onChange={handleOnChange} value={newImageUrl} />
          </label>
          <br />

          <input id="submit" type="button" value="Create" onClick={handleSubmit} />
        </div>
      </div>
      )}
    </div>
  );
}
