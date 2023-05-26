/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { createTask, getCompanies, getPeople } from '../store/actions';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateTaskModal(props) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const { closeModal, personValue, companyValue } = props;
  const [selectedPeople, setSelectedPeople] = useState(null);
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
        setNewTask(event.target.value);
        break;
      default:
    }
  };

  useEffect(() => {
    getPeople()(dispatch);
    getCompanies()(dispatch);
    if (companyValue) {
      setSelectedCompany(props.companyValue);
    }
    if (personValue) {
      setSelectedPeople(props.personValue);
    }
  }, []);

  const handleSubmit = () => {
    const fields = {
      title: newTask,
      dueDate,
    };

    if (selectedPeople) {
      fields.associatedPeople = selectedPeople.value;
    }

    if (selectedCompany) {
      fields.associatedCompany = selectedCompany.value;
    }

    createTask(fields)(dispatch);
    closeModal();
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <button className="close" type="submit" onClick={closeModal}>x</button>
          <label htmlFor="task-item">
            Task Title:
            <input id="task-item" type="text" onChange={handleOnChange} value={newTask} />
          </label>
          <br />

          <label htmlFor="task-item">
            Due Date:
            <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
          </label>
          <br />

          <div>
            <label htmlFor="task-people">
              Associated People:
              <Select
                id="task-people"
                options={peopleTagOptions}
                value={selectedPeople}
                onChange={setSelectedPeople}
              />
            </label>
            <br />
          </div>

          <div>
            <label htmlFor="task-companies">
              <div>Associated Companies:</div>
              <Select
                id="task-companies"
                options={companyTagOptions}
                value={selectedCompany}
                onChange={setSelectedCompany}
              />
            </label>
            <br />
          </div>

          <input id="submit" type="button" value="Create" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
