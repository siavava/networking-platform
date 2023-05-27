/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import '../create-person-modal.style.scss';
import { getCompanies, createPerson } from '../store/actions';

export default function CreatePersonModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newlinkedIn, setNewlinkedIn] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const handleOnChange = (event) => {
    switch (event.target.id) {
      case 'connection-name':
        setNewName(event.target.value);
        break;
      case 'email':
        setNewEmail(event.target.value);
        break;
      case 'connection-title':
        setNewTitle(event.target.value);
        break;
      case 'linkedIn':
        setNewlinkedIn(event.target.value);
        break;
      case 'description':
        setNewDescription(event.target.value);
        break;
      case 'imageUrl':
        setNewImageUrl(event.target.value);
        break;
      default:
        // pass
    }
  };

  const handleSubmit = () => {
    const fields = {
      name: newName,
      title: newTitle,
      email: newEmail,
      linkedIn: newlinkedIn,
      description: newDescription,
      imageUrl: newImageUrl,
      tags: selectedTags.map((tag) => tag.value),
    };

    if (selectedCompany) {
      fields.associatedCompany = selectedCompany.value;
    }

    createPerson(fields)(dispatch, navigate);

    // eslint-disable-next-line no-use-before-define

    // eslint-disable-next-line no-use-before-define
    props.closeModal();
  };

  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    getCompanies()(dispatch);
    if (props.companyValue) {
      setSelectedCompany(props.companyValue);
    }
  }, []);

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

  return (
    <div className="modal">
      <div className="modal-content">
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <span className="close" onClick={props.closeModal}>&times;</span>
        <label htmlFor="connection-name">
          Name:
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

        <label htmlFor="connection-title">
          Title:
          <input id="connection-title" type="text" onChange={handleOnChange} value={newTitle} />
        </label>
        <br />

        <label htmlFor="email">
          Email:
          <input id="email" type="text" onChange={handleOnChange} value={newEmail} />
        </label>
        <br />

        <label htmlFor="linkedIn">
          linkedIn:
          <input id="linkedIn" type="text" onChange={handleOnChange} value={newlinkedIn} />
        </label>
        <br />

        <div>
          <label>
            Tags:
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
          Description:
          <input id="description" type="text" onChange={handleOnChange} value={newDescription} />
        </label>
        <br />

        <label htmlFor="imageUrl">
          Image URL:
          <input id="imageUrl" type="text" onChange={handleOnChange} value={newImageUrl} />
        </label>
        <br />

        <input id="submit" type="button" value="Create" onClick={handleSubmit} />
      </div>
    </div>
  );
}
