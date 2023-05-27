/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import '../company-profile.style.scss';
import { useLocation } from 'react-router-dom';
import { getCompany, getAssociatedPeople, createPerson } from '../store/actions';
import CreatePersonModal from './create-person-modal';

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const companyId = pathname.split('/companies/')[1];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const extendedBio = `
    Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet.
    Lorem ipsum dolor sit amet.`;

  const company = useSelector((state) => state.company);
  const people = useSelector((state) => state.person.people);

  useEffect(() => {
    console.log('useEffect');
    const getComp = async () => {
      await dispatch(getCompany(companyId));
    };

    getComp();
    if (company && company.associatedPeople) {
      const ids = company.associatedPeople;
      let idStr = '';
      for (let i = 0; i < ids.length; i++) {
        const id = ids[i];

        idStr = idStr ? `${idStr},${id}` : `${id}`;
      }

      dispatch(getAssociatedPeople(idStr));
    }
  }, [companyId, dispatch]);

  if (company.name !== '') {
    return (
      <div className="company-profile-container">
        <div className="company-profile">
          <div className="company-profile-left-panel">
            <h1 className="company-profile-name">{`${company.name}: full profile`}</h1>
            <img className="company-profile-image" src={company.imageUrl} alt="company logo" />
            <div className="company-profile-bottom">
              <div className="company-profile-links">
                <a href={company.website}>Website</a>
                <a href={company.linkedin}>LinkedIn</a>
              </div>
              <div className="company-profile-extended-bio">
                <p>{extendedBio}</p>
              </div>
            </div>
          </div>
          <div className="company-profile-right-panel">
            <h1>People Associated With Company</h1>
            <button type="submit" className="add-people" onClick={openModal}>+</button>
            {console.log(company.associatedPeople)}
            {console.log(people)}
            {people.map((person) => (company.associatedPeople.includes(person.id) ? (
              <div className="company-profile-person" key={person.id}>
                <img src={person.image} alt="person" />
                <div className="company-profile-person-information">
                  <h2>{person.name}</h2>
                  <p>{person.connection}</p>
                </div>
              </div>
            ) : null))}
          </div>
        </div>
        {isModalOpen && (
          <CreatePersonModal
            companyValue={{ value: companyId, label: company.name }}
            closeModal={closeModal}
          />
        )}
      </div>
    );
  }

  return (
    <div>Loading...</div>
  );
}
