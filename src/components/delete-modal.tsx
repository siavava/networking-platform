import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  deleteCompany, deletePerson, deleteNote, deleteTask,
} from '../store/actions';
import '../style/delete.style.scss';

export function DeleteCompanyModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    companyId, closeModal,
  } = props;

  const handleDeleteCompany = () => {
    deleteCompany(companyId)(dispatch, navigate);
    closeModal();
  };

  return (
    <div>
      <div className="task-modal">
        <div className="task-modal-content">
          Are you sure you want to delete this company?
          <div className="delete-options">
            <button type="button" onClick={handleDeleteCompany} className="delete-options-buttons">Yes</button>
            <button type="button" onClick={() => closeModal()} className="delete-options-buttons">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeletePersonModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    personId, closeModal,
  } = props;

  const handleDeletePerson = () => {
    deletePerson(personId)(dispatch, navigate);
  };

  return (
    <div>
      <div className="task-modal">
        <div className="task-modal-content">
          Are you sure you want to delete this contact?
          <div className="delete-options">
            <button type="button" onClick={handleDeletePerson} className="delete-options-buttons">Yes</button>
            <button type="button" onClick={() => closeModal()} className="delete-options-buttons">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function DeleteTaskModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    taskId, closeModal, authorRoute,
  } = props;

  const handleDeleteTask = async () => {
    await deleteTask(taskId)(dispatch);
    await closeModal();
    navigate(authorRoute, { state: { replace: true, deleted: true } });
  };

  return (
    <div>
      <div className="task-modal">
        <div className="task-modal-content">
          Are you sure you want to delete this task?
          <div className="delete-options">
            <button type="button" onClick={handleDeleteTask} className="delete-options-buttons">Yes</button>
            <button type="button" onClick={() => closeModal()} className="delete-options-buttons">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeleteNoteModal(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    noteId, closeModal, authorRoute,
  } = props;

  const handleDeleteNote = async () => {
    await deleteNote(noteId)(dispatch);
    navigate(authorRoute, { state: { replace: true, deleted: true } });
  };

  return (
    <div>
      <div className="task-modal">
        <div className="task-modal-content">
          Are you sure you want to delete this note?
          <div className="delete-options">
            <button type="button" onClick={handleDeleteNote} className="delete-options-buttons">Yes</button>
            <button type="button" onClick={() => closeModal()} className="delete-options-buttons">No</button>
          </div>
        </div>
      </div>
    </div>
  );
}
