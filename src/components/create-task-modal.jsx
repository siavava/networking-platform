/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { createTask, getCompanies, getPeople } from '../store/actions';

export default function Modal(props) {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');
  const { closeModal, person } = props;
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  // const [peopleTagOptions, setPeopleTagOptions] = useState([]);
  const peopleTagOptions = person.people.map((p) => ({ value: p.id, label: p.name }));

  const companies = useSelector((state) => state.company.companies) || [];
  const companyTagOptions = companies.map((c) => ({ value: c.id, label: c.name }));
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
  }, []);

  const handleSubmit = () => {
    const fields = {
      title: newTask,
      associatedPeople: selectedPeople.map((p) => p.value),
      associatedCompany: selectedCompany.value,
    };

    createTask(fields)(dispatch);
    closeModal();
  };

  return (
    <div>
      <div className="modal">
        <div className="modal-content">
          <button className="close" type="submit" onClick={closeModal}>x</button>
          <label htmlFor="task-item">
            New Task:
            <input id="task-item" type="text" onChange={handleOnChange} value={newTask} />
          </label>
          <br />

          <div>
            <label htmlFor="task-people">
              Associated People:
              <Select
                id="task-people"
                isMulti
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
