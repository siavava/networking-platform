/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import actions
import { signout } from '../store/actions';

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    signout()(dispatch, navigate);
  }, []);

  return (
    <p>
      Signing out...
    </p>
  );
}
