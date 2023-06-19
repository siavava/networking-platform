/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
import React, { useCallback, useState, useEffect } from 'react';
import '../style/companies.style.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import debounce from '../modules/debounce';
import {
  getCompanies,
  searchCompanies,
} from '../store/actions';
import CreateCompanyModal from './create-company-modal';

export default function Companies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  const search = (query?: string) => {
    if (query) {
      searchCompanies(query)(dispatch);
    } else {
      getCompanies()(dispatch);
    }
  };

  const debouncedSearch = useCallback(debounce(search, 200), []);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    getCompanies()(dispatch);
  }, []);

  const companies = useSelector((state: any) => state.company.companies) || [];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleShowCompany = (id: string) => {
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
          <button type="button" onClick={() => setIsGridView(false)}> List </button>
          <button type="button" onClick={() => setIsGridView(true)}> Grid </button>
        </div>
      </div>

      {/* main panel -- contains list of people */}
      <div className="companies-main-panel">
        { isGridView
          ? (
            <ul className="companies-grid-view">
              { companies.map((company: any) => (
                <li key={company.id} className="companies-list-item">
                  <div className="flip-card">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <img src={company.imageUrl} alt="profile" />
                      </div>
                      <div className="flip-card-back">
                        <h1 className="companies-list-item-name">{company.name}</h1>
                        <p className="companies-list-item-website">{company.website}</p>
                        <p className="companies-list-item-location">{company.location}</p>
                        <p className="companies-list-item-info">{company.description}</p>
                      </div>
                    </div>
                  </div>
                  <button className="companies-list-item-button" type="button" onClick={() => handleShowCompany(company.id)}>
                    to see full page
                  </button>
                </li>
              ))}
            </ul>
          )
          : (
            <ul className="companies-list-view">
              { companies.map((company: any) => (
                <li key={company.id} className="companies-list-item">
                  <div className="company-list-card">
                    <div className="company-image">
                      <img src={company.imageUrl} alt="profile" />
                    </div>
                    <div className="company-info">
                      <h1 className="company-name">{company.name}</h1>
                      <a className="company-url" href={company.website}>{company.website}</a>
                      <p className="company-location">{company.location}</p>
                      <p className="company-description">{company.description}</p>
                    </div>
                  </div>
                  <button className="company-more-info-button" type="button" onClick={() => handleShowCompany(company.id)}>
                    to see full page
                  </button>
                </li>
              ))}
            </ul>
          )}
      </div>
      { isModalOpen && <CreateCompanyModal closeModal={closeModal} /> }
    </div>
  );
}
