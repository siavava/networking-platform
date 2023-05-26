/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

export default function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleOnChange = (event) => {
    switch (event.target.id) {
      case 'task-item':
        setNewTask(event.target.value);
        break;
      default:
    }
  };

  const handleSubmit = () => {
    const fields = {
      task: newTask,
    };
    // eslint-disable-next-line no-use-before-define
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button type="button" className="create-task" onClick={openModal}>Create</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <span className="close" onClick={closeModal}>x</span>
            <label htmlFor="task-item">
              New Task:
              <input id="task-item" type="text" onChange={handleOnChange} value={newTask} />
            </label>
            <br />

            <input id="submit" type="button" value="Create" onClick={handleSubmit} />
          </div>
        </div>
      )};
    </div>
  );
}
