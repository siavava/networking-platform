/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { createTask, getCompanies, getPeople } from '../store/actions';
import 'react-datepicker/dist/react-datepicker.css';
import '../create-task-modal.style.scss';

export default function CreateTaskModal(props) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const {
    closeModal, personValue, companyValue, toggleRefresh,
  } = props;
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [refresh, setRefresh] = useState(false);
  // const [peopleTagOptions, setPeopleTagOptions] = useState([]);

  const companies = useSelector((state) => state.company.companies) || [];
  const people = useSelector((state) => state.person.people) || [];
  const companyTagOptions = companies.map((c) => ({ value: c.id, label: c.name }));
  const peopleTagOptions = people.map((p) => ({ value: p.id, label: p.name }));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnChange = (event) => {
    switch (event.target.id) {
      case 'task-item':
        setNewTask(event.target.value);
        break;
      default:
    }
  };

  const infoFilled = () => {
    if (newTask !== '' && dueDate) {
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

  const handleSubmit = async () => {
    const fields = {
      title: newTask,
      dueDate,
    };

    if (selectedPerson) {
      fields.associatedPerson = selectedPerson.value;
    }

    if (selectedCompany) {
      fields.associatedCompany = selectedCompany.value;
    }

    await dispatch(createTask(fields, navigate));
    closeModal();
  };

  return (
    <div>
      <div className="task-modal">
        <div className="task-modal-content">
          <button className="close" type="submit" onClick={closeModal}>x</button>

          <div className="modal-fill">
            <label htmlFor="task-item">
              Task Title:
              <input id="task-item" type="text" onChange={handleOnChange} value={newTask} />
            </label>
          </div>

          <div className="modal-fill">
            <label htmlFor="task-item">
              Due Date:
              <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
            </label>
          </div>

          <div className="modal-fill">
            <label htmlFor="task-people">
              Associated People:
              <Select
                id="task-people"
                options={peopleTagOptions}
                value={selectedPerson}
                onChange={setSelectedPerson}
              />
            </label>
          </div>

          <div className="modal-fill">
            <label htmlFor="task-companies">
              <div>Associated Companies:</div>
              <Select
                id="task-companies"
                options={companyTagOptions}
                value={selectedCompany}
                onChange={setSelectedCompany}
              />
            </label>
          </div>
          <div className="submit-btn">
            <button type="button" onClick={handleSubmit} disabled={infoFilled()}>Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
