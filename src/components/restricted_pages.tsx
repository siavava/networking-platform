import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RestrictedPage(props) {
  const navigate = useNavigate();

  const authenticated = localStorage.getItem('token');

  useEffect(() => {
    if (!authenticated) {
      navigate('/login');
    }
  }, [authenticated]);

  return (
    <div>
      {
      authenticated
      && (<props.restrictedPage />)
      }
    </div>
  );
}
