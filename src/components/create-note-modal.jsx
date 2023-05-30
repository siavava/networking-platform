/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MDEditor from '@uiw/react-md-editor';
import Select from 'react-select';
import { createNote, getCompanies, getPeople } from '../store/actions';
import '../create-note-modal.style.scss';

export default function CreateNoteModal(props) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [content, setContent] = useState('');
  const { closeModal, personValue, companyValue } = props;
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  // const [peopleTagOptions, setPeopleTagOptions] = useState([]);

  const companies = useSelector((state) => state.company.companies) || [];
  const people = useSelector((state) => state.person.people) || [];
  const companyTagOptions = companies.map((c) => ({ value: c.id, label: c.name }));
  const peopleTagOptions = people.map((p) => ({ value: p.id, label: p.name }));

  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    switch (event.target.id) {
      case 'task-item':
        setNewNote(event.target.value);
        break;
      default:
    }
  };

  const infoFilled = () => {
    if (newNote !== '' && content) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    getPeople()(dispatch);
    getCompanies()(dispatch);
    if (companyValue) {
      setSelectedCompany(props.companyValue);
    }
    if (personValue) {
      setSelectedPerson(props.personValue);
    }
  }, []);

  const handleSubmit = () => {
    const fields = {
      title: newNote,
      content,
    };

    if (selectedPerson) {
      fields.associatedPerson = selectedPerson.value;
    }

    if (selectedCompany) {
      fields.associatedCompany = selectedCompany.value;
    }

    createNote(fields)(dispatch);
    closeModal();
  };

  return (
    <div>
      <div className="note-modal">
        <div className="note-modal-content">
          <button className="close" type="submit" onClick={closeModal}>x</button>
          <div className="note-selects">
            <label htmlFor="task-item">
              Task Title:
              <input id="task-item" type="text" onChange={handleOnChange} value={newNote} />
            </label>

            <label htmlFor="note-people">
              Associated People:
              <Select
                id="note-people"
                options={peopleTagOptions}
                value={selectedPerson}
                onChange={setSelectedPerson}
              />
            </label>
            <br />

            <label htmlFor="note-companies">
              <div>Associated Companies:</div>
              <Select
                id="note-companies"
                options={companyTagOptions}
                value={selectedCompany}
                onChange={setSelectedCompany}
              />
            </label>
          </div>
          <br />

          <div className="container">
            <MDEditor
              value={content}
              onChange={setContent}
              preview="edit"
            />
          </div>

          <div className="submit-btn">
            <button type="button" onClick={handleSubmit} disabled={infoFilled()}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
