/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import '../homepage.style.scss';
import CreateTaskModal from './create-task-modal';

export default function HomePage() {
  const [newTask, setNewTask] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPerson, setNewPerson] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = { name: 'Chad IV' };
  const tasks = {
    overdue: [],
    today: [
      { task: 'follow up', company: 'google', person: 'bob bobby' },
      { task: 'follow up, second email', company: 'apple', person: 'joe bro' },
      { task: 'initial reach out', company: 'McKinsey', person: 'Susan Sue' },
      { task: 'send cover letter', company: 'meta', person: 'Allie Rally' },
    ],
    upcoming: [],
  };

  const handleSubmit = () => {
    const fields = {
      task: newTask,
      company: newCompany,
      person: newPerson,
    };
    console.log(fields);
    // eslint-disable-next-line no-use-before-define
    closeModal();
  };

  const handleOnChange = (event) => {
    console.log(event.target.id);
    switch (event.target.id) {
      case 'company-name':
        setNewTask(event.target.value);
        break;
      case 'company-location':
        setNewCompany(event.target.value);
        break;
      case 'website-link':
        setNewPerson(event.target.value);
        break;
      default:
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="homepage">
      <div className="main-panel">
        <div className="homepage-title">
          { `Welcome back, ${user.name || 'anonymous user'}!` }
        </div>
        <div className="homepage-tasks">
          <div className="homepage-tasks-overview">
            <div className="homepage-tasks-overview-item">
              { `Overdue Tasks (${tasks.overdue.length})`}
            </div>
            <div className="homepage-tasks-overview-item">
              { `Today's Tasks (${tasks.today.length})`}
            </div>
            <div className="homepage-tasks-overview-item">
              { `Upcoming Tasks (${tasks.upcoming.length})`}
            </div>
            <button className="create-task-button" type="submit" onClick={openModal}>+</button>
          </div>
          <table className="homepage-tasks-table">
            <thead>
              <tr className="homepage-tasks-table-row table-header">
                <th className="homepage-tasks-table-cell header"> Task </th>
                <th className="homepage-tasks-table-cell header"> Company </th>
                <th className="homepage-tasks-table-cell header"> Person </th>
              </tr>
            </thead>
            <tbody>

              {tasks.today.map((task, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr className="homepage-tasks-table-row" key={index}>
                  <td className="homepage-tasks-table-cell">{task.task}</td>
                  <td className="homepage-tasks-table-cell">{task.company}</td>
                  <td className="homepage-tasks-table-cell">{task.person}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      { isModalOpen && <CreateTaskModal closeModal={closeModal} /> }
    </div>
  );
}
