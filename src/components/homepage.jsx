/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../homepage.style.scss';
import CreateTaskModal from './create-task-modal';
import {
  getTasks,
} from '../store/actions';

export default function HomePage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = { name: 'Chad IV' };

  useEffect(() => {
    getTasks()(dispatch);
  }, [dispatch]);

  const tasks = useSelector((state) => state.task.all) || [];
  console.log(tasks);
  const todayTasks = tasks.filter((task) => new Date(task.dueDate).getDate()
    === new Date().getDate());
  const overDueTasks = tasks.filter((task) => new Date(task.dueDate).getDate() < new Date().getDate());
  const upcomingTasks = tasks.filter((task) => new Date(task.dueDate).getDate() > new Date().getDate());

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
              { `Overdue Tasks (${overDueTasks.length})`}
            </div>
            <div className="homepage-tasks-overview-item">
              { `Today's Tasks (${todayTasks.length})`}
            </div>
            <div className="homepage-tasks-overview-item">
              { `Upcoming Tasks (${upcomingTasks.length})`}
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

              {todayTasks.map((task, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr className="homepage-tasks-table-row" key={index}>
                  <td className="homepage-tasks-table-cell">{task.title}</td>
                  <td className="homepage-tasks-table-cell">{task.associatedCompany}</td>
                  <td className="homepage-tasks-table-cell">{task.associatedPerson}</td>
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
