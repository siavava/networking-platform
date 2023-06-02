/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import '../company-profile.style.scss';
import { getCompany, getAssociatedPeople, getCompanyEmails } from '../store/actions';
import CreateCompanyModal from './create-company-modal';
import CreatePersonModal from './create-person-modal';
import { DeleteCompanyModal } from './delete-modal';

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const companyId = pathname.split('/companies/')[1];
  const [isCreateCompanyModalOpen, setIsCreateCompanyModalOpen] = useState(false);
  const [isDeleteCompanyModalOpen, setIsDeleteCompanyModalOpen] = useState(false);
  const [isCreatePersonModalOpen, setIsCreatePersonModalOpen] = useState(false);
  const [emailInteractions, setEmailInteractions] = useState([]);

  const openModal = (type) => {
    if (type === 'company') setIsCreateCompanyModalOpen(true);
    else if (type === 'person') setIsCreatePersonModalOpen(true);
    else if (type === 'delete-company') setIsDeleteCompanyModalOpen(true);
  };

  const closeModal = (type) => {
    if (type === 'company') setIsCreateCompanyModalOpen(false);
    else if (type === 'person') setIsCreatePersonModalOpen(false);
    else if (type === 'delete-company') setIsDeleteCompanyModalOpen(false);
  };

  const callEmailInteractions = async () => {
    setEmailInteractions([]);
    let emails = await getCompanyEmails(companyId);
    if (emails.length > 10) {
      emails = emails.slice(0, 10);
    }
    setEmailInteractions(emails);
  };

  const company = useSelector((state) => state.company);
  const people = useSelector((state) => state.person.people);

  useEffect(() => {
    dispatch(getCompany(companyId));
    dispatch(getAssociatedPeople(companyId));
    callEmailInteractions();
  }, [companyId, dispatch]);

  if (company.name !== '') {
    return (
      <div className="company-profile-container">
        <div className="company-profile">
          <div className="company-profile-left-panel">
            <div className="company-profile-header">
              <h1 className="company-profile-name">{`${company.name}: Company Overview`}</h1>
              <div className="action-buttons-container">
                <button onClick={() => openModal('company')} type="button" className="edit-company">Edit</button>
                <button onClick={() => openModal('delete-company')} type="button" className="edit-company">Delete</button>
              </div>
            </div>
            <img className="company-profile-image" src={company.imageUrl} alt="company logo" />
            <div className="company-profile-bottom">
              <div className="company-profile-links">
                <a href={company.website}>Website</a>
                <a href={company.linkedin}>LinkedIn</a>
              </div>
              <div className="company-profile-extended-bio">
                <p>{company.description}</p>
              </div>
            </div>
          </div>
          <div className="company-profile-right-panel">
            <div className="company-profile-header">
              <h1>People Associated With Company</h1>
              <button type="submit" className="add-people" onClick={() => openModal('person')}>+</button>
            </div>
            {people
              && (people.map((person) => (
                <div className="company-profile-person" key={person.id}>
                  <div className="company-profile-person-information">
                    <img src={person.imageUrl || 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt="person" />
                    <div className="bio">
                      <h2>
                        <a href={`../people/${person.id}`}>{person.name}</a> (
                        <a href={`mailto: ${person.email}`}>{person.email}</a>)
                      </h2>
                      <p>{person.title}</p>
                    </div>

                  </div>
                </div>
              ))
              )}
          </div>
        </div>

        <div className="email-container">
          <div className="email-header">
            <h1>Email Interactions</h1>
            <button type="button" onClick={callEmailInteractions}>
              <i className="material-icons" id="svg_options">refresh</i>
            </button>
          </div>
          { emailInteractions.length !== 0 ? (emailInteractions.map((email) => (
            <div className="email-interaction" key={email.id}>
              { email.emailDate
                ? (<><h3>{email.emailDate.replace('T', ' ').replace('.000Z', '')}</h3><p>{email.emailSnippet}</p></>)
                : (<h3>{email.error}</h3>)}
            </div>
          )))
            : (<div className="email-interaction">Loading...</div>)}
        </div>
        {isCreateCompanyModalOpen && (
          <CreateCompanyModal
            companyId={companyId}
            companyValue={company}
            closeModal={() => closeModal('company')}
            isEditing
          />
        )}
        {isCreatePersonModalOpen && (
          <CreatePersonModal
            companyId={companyId}
            closeModal={() => closeModal('person')}
            // isEditing
          />
        )}
        {isDeleteCompanyModalOpen && (
          <DeleteCompanyModal
            companyId={companyId}
            closeModal={() => closeModal('delete-company')}
            // isEditing
          />
        )}
      </div>
    );
  }

  return (
    <div>Loading...</div>
  );
}
