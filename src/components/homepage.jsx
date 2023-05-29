/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector, useDispatch } from 'react-redux';
import '../homepage.style.scss';
import CreateTaskModal from './create-task-modal';
import {
  getTasks,
} from '../store/actions';

export default function HomePage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState('today');

  useEffect(() => {
    getTasks()(dispatch);
  }, [dispatch]);

  const tasks = useSelector((state) => state.task.all) || [];
  const user = useSelector((state) => state.user) || {};
  const name = localStorage.getItem('name') || 'anonymous user';

  const today = new Date().getDate();
  const todayTasks = tasks.filter((task) => new Date(task.dueDate).getDate()
    === today);
  const overDueTasks = tasks.filter((task) => new Date(task.dueDate).getDate() < today);
  const upcomingTasks = tasks.filter((task) => new Date(task.dueDate).getDate() > today);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const keyTaskVar = {
    overdue: overDueTasks,
    today: todayTasks,
    upcoming: upcomingTasks,
  };

  return (
    <div className="homepage">
      <div className="main-panel">
        <div className="homepage-title">
          { `Welcome back, ${`${name.split(' ')[0]}` || 'anonymous user'}!` }
        </div>
        <div className="homepage-subtitle">
          Are you ready for today?
        </div>
        <div className="homepage-tasks">
          <div className="homepage-tasks-overview">
            <Tabs
              defaultActiveKey="profile"
              id="fill-tab-example"
              className="mb-3"
              activeKey={tabKey}
              onSelect={(k) => setTabKey(k)}
              fill
            >
              <Tab eventKey="overdue" title={`Overdue Tasks (${overDueTasks.length})`} />
              <Tab eventKey="today" title={`Today's Tasks (${todayTasks.length})`} />
              <Tab eventKey="upcoming" title={`Upcoming Tasks (${upcomingTasks.length})`} />
            </Tabs>
          </div>
          <table className="homepage-tasks-table">
            <thead>
              <tr className="homepage-tasks-table-row table-header">
                <th className="homepage-tasks-table-cell header"> DUE DATE </th>
                <th className="homepage-tasks-table-cell header"> TASK </th>
                <th className="homepage-tasks-table-cell header"> PERSON </th>
              </tr>
            </thead>
            <tbody>

              {keyTaskVar[tabKey].map((task, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr className="homepage-tasks-table-row table-body" key={index}>
                  <td className="homepage-tasks-table-cell">{task.dueDate.split('T')[0]}</td>
                  <td className="homepage-tasks-table-cell">{task.title}</td>
                  <td className="homepage-tasks-table-cell">{task.associatedPerson}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="create-task-button" type="submit" onClick={openModal}>+ Add New Task</button>
        </div>
      </div>

      { isModalOpen && <CreateTaskModal closeModal={closeModal} /> }
    </div>
  );
}
