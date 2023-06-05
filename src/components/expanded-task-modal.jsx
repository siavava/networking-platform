/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../style/expanded-note-modal.style.scss';
import { DeleteTaskModal } from './delete-modal';

// import actions
import { getTask } from '../store/actions';
import CreateTaskModal from './create-task-modal';

export default function ExpandTaskView() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const taskId = pathname.split('/tasks/')[1];
  const authorRoute = pathname.split('/tasks/')[0];

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  useEffect(() => {
    getTask(taskId)(dispatch);
  }, []);

  const task = useSelector((state) => state.task.current);

  const deleteCurrentTask = () => {
    setIsDeleteTaskModalOpen(true);
  };

  return (
    <div className="expanded-note-modal">
      <div className="expanded-note-modal-content">
        <div className="content-header">
          <h1>{task.title}</h1>
          <button type="button" id="edit" onClick={() => setIsTaskModalOpen(true)}>
            <i className="material-icons" id="svg_options">edit</i>
          </button>
          <button type="button" id="edit" onClick={deleteCurrentTask}>
            <i className="material-icons" id="svg_options">delete</i>
          </button>
        </div>
        <NavLink to={pathname.split('tasks')[0] || '/home'} className="close-button">x</NavLink>
        <br />
      </div>
      { isTaskModalOpen && (
        <CreateTaskModal closeModal={closeTaskModal}
          taskValue={task}
          isEditing
        />
      ) }
      { isDeleteTaskModalOpen && (
        <DeleteTaskModal
          closeModal={() => setIsDeleteTaskModalOpen(false)}
          taskId={taskId}
          authorRoute={authorRoute}
        />
      ) }
    </div>
  );
}
