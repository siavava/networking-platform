/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import '../expanded-note-modal.style.scss';
import CreateNoteModal from './create-note-modal';

// import actions
import { getNote } from '../store/actions';

export default function ExpandNoteView() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const noteId = pathname.split('/notes/')[1];
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const closeNoteModal = () => {
    setIsNoteModalOpen(false);
  };

  useEffect(() => {
    getNote(noteId)(dispatch);
  }, []);

  const note = useSelector((state) => state.note.current);

  return (
    <div className="expanded-note-modal">
      <div className="expanded-note-modal-content">
        <div className="content-header">
          <h1>{note.title}</h1>
          <button type="button" id="edit" onClick={() => setIsNoteModalOpen(true)}>
            <i className="material-icons" id="svg_options">edit</i>
          </button>
        </div>
        <NavLink to={pathname.split('notes')[0] || '/home'} className="close-button">x</NavLink>
        <br />
        <div className="content-body">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>
      </div>
      { isNoteModalOpen && (
        <CreateNoteModal closeModal={closeNoteModal}
          noteValue={note}
          isEditing
        />
      ) }
    </div>
  );
}
