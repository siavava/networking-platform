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
  const noteId = pathname.split('/tasks/')[1];
  const authorRoute = pathname.split('/tasks/')[0];

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  useEffect(() => {
    getTask(noteId)(dispatch);
  }, []);

  const note = useSelector((state) => state.task.current);
  console.log(note);

  const deleteCurrentNote = () => {
    setIsDeleteNoteModalOpen(true);
  };

  return (
    <div className="expanded-note-modal">
      <div className="expanded-note-modal-content">
        <div className="content-header">
          <h1>{note.title}</h1>
          <button type="button" id="edit" onClick={() => setIsNoteModalOpen(true)}>
            <i className="material-icons" id="svg_options">edit</i>
          </button>
          <button type="button" id="edit" onClick={deleteCurrentNote}>
            <i className="material-icons" id="svg_options">delete</i>
          </button>
        </div>
        <NavLink to={pathname.split('tasks')[0] || '/home'} className="close-button">x</NavLink>
        {/* <button className="edit-task-button" type="submit" onClick={() =>
                openEditTaskModal(e)}>
                  <i className="material-icons" id="svg_options">edit</i>
                </button>
                <button className="delete-task-button" type="submit" onClick={() =>
                  openTaskDeleteModal(e.id)}>
                  <i className="material-icons" id="svg_options">delete</i>
                </button> */}
        <br />
      </div>
      { isNoteModalOpen && (
        <CreateTaskModal closeModal={closeNoteModal}
          taskValue={note}
          isEditing
        />
      ) }
      { isDeleteNoteModalOpen && (
        <DeleteTaskModal
          closeModal={() => setIsDeleteNoteModalOpen(false)}
          taskId={noteId}
          authorRoute={authorRoute}
        />
      ) }
    </div>
  );
}
