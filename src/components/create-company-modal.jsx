import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCompany, updateCompany } from '../store/actions';
import '../create-company-modal.style.scss';

export default function CreateCompanyModal(props) {
  const {
    closeModal, companyId, companyValue, isEditing,
  } = props;
  const [newCompanyName, setNewCompanyName] = useState(companyValue ? companyValue.name : '');
  const [newCompanyLocation, setNewCompanyLocation] = useState(companyValue ? companyValue.location : '');
  const [newWebsite, setNewWebsite] = useState(companyValue ? companyValue.website : '');
  const [newlinkedIn, setNewlinkedIn] = useState(companyValue ? companyValue.linkedin : '');
  const [newEmailDomain, setNewEmailDomain] = useState(companyValue ? companyValue.linkedin : '');
  const [newDescription, setNewDescription] = useState(companyValue ? companyValue.description : '');
  const [newImageUrl, setNewImageUrl] = useState(companyValue ? companyValue.imageUrl : '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      case 'email-domain':
        setNewEmailDomain(event.target.value);
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

    if (isEditing) {
      fields.id = companyId;
      console.log('updating....');
      updateCompany(fields)(dispatch, navigate);
    } else {
      console.log('creating....');
      createCompany(fields)(dispatch, navigate);
    }
    closeModal();
  };

  return (

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

        <label htmlFor="company-email-domain">
          Email Domain: (@example.com)
          <input id="email-domain" type="text" onChange={handleOnChange} value={newEmailDomain} />
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

        <input id="submit" type="button" value={isEditing ? 'Save' : 'Create'} onClick={handleSubmit} />
      </div>
    </div>
  );
}
