import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCompany } from '../store/actions';

export default function DeleteCompanyModal(props) {
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
          Are you sure you want to delete?
          <div className="submit-btn">
            <button type="button" onClick={handleDeleteCompany}>Yes</button>
            <button type="button" onClick={() => closeModal()}>No</button>
          </div>
        </div>
      </div>
    </div>
  );
}
