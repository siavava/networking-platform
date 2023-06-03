/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector, useDispatch } from 'react-redux';
import '../homepage.style.scss';
import CreateTaskModal from './create-task-modal';
import { DeleteTaskModal } from './delete-modal';
import {
  getTasks, getPeopleById,
} from '../store/actions';

export default function HomePage() {
  const dispatch = useDispatch();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tabKey, setTabKey] = useState('today');
  const tasks = useSelector((state) => state.task.all) || [];
  const associatedPeopleList = useSelector((state) => state.person.people) || [];
  const associatedPeopleDict = {};
  const name = localStorage.getItem('name') || 'anonymous user';
  const [isEditTaskModal, setIsEditTaskModal] = useState(false);
  const [isTaskDeleteModalOpen, setTaskDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [currTask, setCurrTask] = useState(null);

  useEffect(() => {
    getTasks()(dispatch);
  }, [isTaskModalOpen, isTaskDeleteModalOpen, isEditTaskModal]);

  useEffect(() => {
    const idStr = '';
    const getAssociatedPerson = async (task) => {
      if (task.associatedPerson) {
        if (idStr !== '') {
          idStr.concat(`,${task.associatedPerson}`);
        } else {
          idStr.concat(task.associatedPerson);
        }
      }
    };
    tasks.forEach(getAssociatedPerson);
    getPeopleById(idStr)(dispatch);
  }, [tasks]);

  if (associatedPeopleList) {
    associatedPeopleList.forEach((person) => {
      associatedPeopleDict[person.id] = person.name;
    });
  }

  const today = new Date(); // Get the current date and time
  const todayTasks = tasks.filter((task) => new Date(task.dueDate).toDateString() === today.toDateString());
  const nonTodayTasks = tasks.filter((task) => new Date(task.dueDate).toDateString() !== today.toDateString());

  const overDueTasks = nonTodayTasks.filter((task) => new Date(task.dueDate) < today);

  const upcomingTasks = nonTodayTasks.filter((task) => new Date(task.dueDate) > today);

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const openTaskDeleteModal = (task) => {
    setTaskId(task.id);
    setTaskDeleteModal(true);
  };

  const closeTaskDeleteModal = () => {
    setTaskDeleteModal(false);
  };

  const openEditTaskModal = (task) => {
    setCurrTask(task);
    setIsEditTaskModal(true);
  };

  const closeEditTaskModal = () => {
    setIsEditTaskModal(false);
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
                <th className="homepage-tasks-table-cell header"> CONTACT </th>
                <th className="homepage-tasks-table-cell header"> STATUS </th>
              </tr>
            </thead>
            <tbody>

              {keyTaskVar[tabKey].map((task, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr className="homepage-tasks-table-row table-body" key={index}>
                  <td className="homepage-tasks-table-cell">{task.dueDate.split('T')[0]}</td>
                  <td className="homepage-tasks-table-cell">{task.title}</td>
                  <td className="homepage-tasks-table-cell">
                    <a href={`people/${task.associatedPerson}`}>{associatedPeopleDict[task.associatedPerson]}</a>
                  </td>
                  <td className="homepage-tasks-table-cell">
                    <button className="delete-task-button" type="submit" onClick={() => openTaskDeleteModal(task)}>
                      <i className="material-icons" id="svg_options">delete</i>
                    </button>
                    <button className="edit-task-button" type="submit" onClick={() => openEditTaskModal(task)}>
                      <i className="material-icons" id="svg_options">edit</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="create-task-button" type="submit" onClick={openTaskModal}>Add New Task</button>
        </div>
      </div>

      { isTaskModalOpen && <CreateTaskModal closeModal={closeTaskModal} /> }
      { isEditTaskModal && (
      <CreateTaskModal closeModal={closeEditTaskModal}
        taskValue={currTask}
        personValue={{
          value: currTask.associatedPerson,
          label: associatedPeopleDict[currTask.associatedPerson],
        }}
        isEditing
      />
      )}
      {isTaskDeleteModalOpen && (
      <DeleteTaskModal
        taskId={taskId}
        closeModal={closeTaskDeleteModal}
      />
      )}
    </div>
  );
}
