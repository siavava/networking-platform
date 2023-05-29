/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useSelector, useDispatch } from 'react-redux';
import '../person-profile.style.scss';
import { useLocation } from 'react-router-dom';
import { getPerson, getAssociatedTasks, getAssociatedNotes } from '../store/actions';
import CreateTaskModal from './create-task-modal';
import CreateNoteModal from './create-note-modal';
import CreatePersonModal from './create-person-modal';

export default function PersonProfile() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const personId = pathname.split('/people/')[1];
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditPersonModal, setIsEditPersonModal] = useState(false);

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  useEffect(() => {
    dispatch(getPerson(personId));
    dispatch(getAssociatedTasks(personId, 'people'));
    dispatch(getAssociatedNotes(personId, 'people'));
  }, [dispatch, personId, isTaskModalOpen, isNoteModalOpen]);

  const person = useSelector((state) => state.person);
  const tasks = useSelector((state) => state.task.all);
  const notes = useSelector((state) => state.note.all);

  // const imageUrl = person.imageUrl || 'https://unsplash.com/photos/8wTPqxlnKM4'

  const emails = [
    { id: 0, title: 'Meeting?', details: 'When do you think you have time to meet?...' },
    { id: 1, title: 'Working at Meta', details: 'How are you liking it there so far?...' },
  ];

  return (
    <div className="person-profile">
      <div className="first-row">
        <div className="basic-info">
          <div className="person-bio">
            <div className="profile-pic">
              {/* show default image (unsplash) if no image is provided */}
              <img src={person.imageUrl || 'https://source.unsplash.com/MQ2xYBHImKM'} alt="profile" />
              <div className="info-text">
                <button className="edit-button" type="button" onClick={() => setIsEditPersonModal(true)}>Edit</button>
                <div className="contact-details-container">
                  <h1>{`${person.name}`}</h1>
                  <p>{person.email}</p>
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
              : <div className="person-notes-content empty">Click on a Task or Note for more Information.</div>}
          </div>
        </div>
        <div className="first-row-right">

          <div className="todos">
            <h1>Tasks/To Dos</h1>
            <button type="submit" className="add-tasks" onClick={() => setIsTaskModalOpen(true)}>+</button>
            {tasks && (tasks.map((e) => (
              <div className="task" key={e.id} onClick={() => setSelectedItem(e)} role="button">{e.dueDate.split('T')[0]} - {e.title}</div>
            )))}
          </div>
          <div className="notes">
            <h1>Notes</h1>
            <button type="submit" className="add-notes" onClick={() => setIsNoteModalOpen(true)}>+</button>
            {notes && (notes.map((e) => (
              // eslint-disable-next-line jsx-a11y/interactive-supports-focus
              <div className="note" key={e.id} onClick={() => setSelectedItem(e)} role="button">{e.title}</div>
            )))}
          </div>
        </div>
      </div>

      <div className="email-container">
        <h1>Email Interactions</h1>
        {emails.map((email) => (
          <div className="email-interaction" key={email.id}>
            <h2>{email.title}</h2>
            <h3>{email.details}</h3>
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
          isEditing
        />
      )}
    </div>
  );
}
