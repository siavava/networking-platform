/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import '../person-profile.style.scss';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  getPerson, deletePerson, getAssociatedTasks, getAssociatedNotes, getEmails,
} from '../store/actions';
import CreateTaskModal from './create-task-modal';
import CreateNoteModal from './create-note-modal';
import CreatePersonModal from './create-person-modal';
import { DeletePersonModal, DeleteTaskModal } from './delete-modal';

export default function PersonProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const personId = pathname.split('/people/')[1].split('/')[0];
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeletePersonModalOpen, setIsDeletePersonModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditPersonModal, setIsEditPersonModal] = useState(false);
  const [emailInteractions, setEmailInteractions] = useState([]);

  const [isTaskDeleteModalOpen, setTaskDeleteModal] = useState(false);
  const [taskId, setTaskId] = useState(null);

  // for person delete modal
  const openDeleteModal = () => {
    setIsDeletePersonModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeletePersonModalOpen(false);
  };

  // for task delete modal
  const openTaskDeleteModal = (id) => {
    setTaskId(id);
    console.log(id);
    setTaskDeleteModal(true);
  };

  const closeTaskDeleteModal = () => {
    setTaskDeleteModal(false);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  const openExpandedNoteView = (event) => {
    navigate(`notes/${event.target.id}`);
  };

  useEffect(() => {
    dispatch(getPerson(personId));
    dispatch(getAssociatedTasks(personId, 'people'));
    dispatch(getAssociatedNotes(personId, 'people'));
  }, [personId, isTaskModalOpen, isNoteModalOpen]);

  const person = useSelector((state) => state.person);
  const tasks = useSelector((state) => state.task.all);
  const notes = useSelector((state) => state.note.all);

  const setEmails = async () => {
    let emails = await getEmails(personId);
    if (emails.length > 10) {
      emails = emails.slice(0, 10);
    }
    setEmailInteractions(emails);
  };

  return (
    <div className="person-profile">
      <div className="first-row">
        <div className="basic-info">
          <div className="person-bio">
            <div className="profile-pic">
              {/* show default image (unsplash) if no image is provided */}
              <img src={person.imageUrl || 'https://img.freepik.com/free-icon/user_318-159711.jpg'} alt="profile" />
              <div className="info-text">
                <div className="action-buttons-container">
                  <button className="edit-button" type="button" onClick={() => setIsEditPersonModal(true)}>Edit</button>
                  <button className="edit-button" onClick={() => openDeleteModal()} type="button">Delete</button>
                </div>
                <div className="contact-details-container">
                  <h1>{`${person.name}`}</h1>
                  <p>{person.title}</p>
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                  <a href={person.linkedin}>{person.linkedin}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="person-notes">
            { selectedItem
              ? (
                <>
                  <h1 className="person-notes-title">{selectedItem.title}</h1>
                  <ReactMarkdown className="person-notes-content">{selectedItem.content || selectedItem.description || selectedItem.company}</ReactMarkdown>
                </>
              )
              : <div className="person-notes-content empty">Click on a Task or Note for more information.</div>}
          </div>
        </div>
        <div className="first-row-right">

          <div className="todos">
            <h1>Tasks/To Dos</h1>
            <button type="submit" className="add-tasks" onClick={() => setIsTaskModalOpen(true)}>+</button>
            {tasks && (tasks.map((e) => (
              <div className="task">
                <div key={e.id} onClick={() => setSelectedItem(e)} role="button">{e.dueDate.split('T')[0]} - {e.title}</div>
                <button className="delete-task-button" type="submit" onClick={() => openTaskDeleteModal(e.id)}>Delete</button>
              </div>
            )))}
          </div>
          <div className="notes">
            <h1>Notes</h1>
            <button type="submit" className="add-notes" onClick={() => setIsNoteModalOpen(true)}>+</button>
            {notes && (notes.map((e) => (
              // eslint-disable-next-line jsx-a11y/interactive-supports-focus
              <div className="note" id={e.id} key={e.id} onClick={openExpandedNoteView} role="button">{e.title}</div>
            )))}
          </div>
        </div>
      </div>

      <div className="email-container">
        <h1>Email Interactions</h1>
        <button type="button" onClick={setEmails}>Get Emails</button>
        {emailInteractions.map((email) => (
          <div className="email-interaction" key={email.id}>
            <h3>{email}</h3>
          </div>
        ))}
      </div>
      { isTaskModalOpen && (
        <CreateTaskModal closeModal={closeTaskModal}
          personValue={{ value: personId, label: person.name }}
        />
      ) }
      { isNoteModalOpen && (
        <CreateNoteModal closeModal={closeNoteModal}
          personValue={{ value: personId, label: person.name }}
        />
      ) }
      { isEditPersonModal && (
        <CreatePersonModal closeModal={() => setIsEditPersonModal(false)}
          personValue={person}
          personId={personId}
          isEditing
        />
      )}
      {isDeletePersonModalOpen && (
      <DeletePersonModal
        personId={personId}
        closeModal={() => closeDeleteModal()}
      />
      )}
      {isTaskDeleteModalOpen && (
      <DeleteTaskModal
        taskId={taskId}
        closeModal={() => closeTaskDeleteModal()}
      />
      )}
      <Outlet />
    </div>
  );
}
