/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import '../create-person-modal.style.scss';
import { createPerson, getCompanies } from '../store/actions';

export default function CreatePersonModal(props) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newlinkedIn, setNewlinkedIn] = useState('');
  const [newDescription, setNewDescription] = useState('');

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
      default:
        // pass
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
    };
    createPerson(fields)(props.dispatch, props.navigate);

    // eslint-disable-next-line no-use-before-define

    // eslint-disable-next-line no-use-before-define
    props.closeModal();
  };

  const companies = useSelector((state) => state.company.companies);

  useEffect(() => {
    const fetchData = async () => {
      await getCompanies()(props.dispatch);
    };
    fetchData();
  }, []);

  const companyOptions = companies.map((company) => ({ value: company.id, label: company.name }));

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
          Connection linkedIn:
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

        <input id="submit" type="button" value="Create" onClick={handleSubmit} />
      </div>
    </div>
  );
}
