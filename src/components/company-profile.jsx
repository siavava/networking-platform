import React from 'react';
// import { useParams } from 'react-router-dom';
import '../company-profile.style.scss';

export default function CompanyProfile() {
  // const { companyID } = useParams();
  const company = {
    name: 'Google',
    logo: 'https://source.unsplash.com/random/200x200/?img=1',
    website: 'https://www.google.com/',
    linkedin: 'https://www.linkedin.com/company/google/',
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
      name: 'Chad IV',
      image: 'https://source.unsplash.com/random/200x200/?img=3',
      connection: 'Friend',
    },
  ];

  return (
    <div className="company-profile-container">
      <div className="company-profile">
        <div className="company-profile-left-panel">
          <h1 className="company-profile-name">{`${company.name}: full profile`}</h1>
          <img className="company-profile-image" src={company.logo} alt="company logo" />

          <div className="company-profile-links">
            <a href={company.website}>Website</a>
            <a href={company.linkedin}>LinkedIn</a>
          </div>
          <div className="company-profile-extended-bio">
            <p>{extendedBio}</p>
          </div>
        </div>
        <div className="company-profile-right-panel">
          <h1>people you may want to connect with</h1>
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
    </div>
  );
}
