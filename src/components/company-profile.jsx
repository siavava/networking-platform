import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
import '../company-profile.style.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCompany } from '../store/actions';
import CreatePersonModal from './create-person-modal';

export default function CompanyProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const companyId = pathname.split('/companies/')[1];
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getCompany(companyId));
  }, [dispatch, companyId]);

  const company = useSelector((state) => state.company);

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

  const people = [
    {
      name: 'Chad I',
      image: 'https://source.unsplash.com/random/200x200/?img=1',
      connection: 'Homie',
    },
    {
      name: 'Chad II',
      image: 'https://source.unsplash.com/random/200x200/?img=2',
      connection: 'College Alumni',
    },
    {
      name: 'Chad V',
      image: 'https://source.unsplash.com/random/200x200/?img=3',
      connection: 'Friend',
    },
  ];

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
          <button type="button" onClick={openModal}>+</button>
          {people.map((person) => (
            <div className="company-profile-person" key={person.name}>
              <img src={person.image} alt="person" />
              <div className="company-profile-person-information">
                <h2>{person.name}</h2>
                <p>{person.connection}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <CreatePersonModal
          closeModal={closeModal}
          associatedCompany={company}
          dispatch={dispatch}
          navigate={navigate}
        />
      )}
    </div>
  );
}
