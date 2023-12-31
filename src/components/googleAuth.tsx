/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROOT_URL, updateUser } from '../store/actions';
import '../style/settings.style.scss';

export default function GoogleAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tokenClient, setTokenClient] = useState({}); // eslint-disable-line no-unused-vars
  const [googleEmail, setGoogleEmail] = useState(
    '',
  );
  const [codeSet, setCodeSet] = useState(false);

  const CLIENT_ID = '365906657849-9plkk1n06f756aq12eo0e7vclopb26c3.apps.googleusercontent.com';
  const SCOPE = 'https://mail.google.com/';

  const codeForEmail = () => {
    // @ts-ignore
    tokenClient.requestCode();
  };

  const infoFilled = () => {
    if (googleEmail !== '' && codeSet) {
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const fields = {
      googleEmail,
    };

    updateUser(fields)(dispatch, navigate);
    navigate('/home');
  };

  useEffect(() => {
    /* global google */

    // @ts-ignore
    setTokenClient(google.accounts.oauth2.initCodeClient({
      access_type: 'offline',
      client_id: CLIENT_ID,
      scope: SCOPE,
      ux_mode: 'popup',
      callback: (response: any) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${ROOT_URL}/api/googleauth`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // Set custom header for CRSF
        xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
        xhr.setRequestHeader('Authorization', localStorage.getItem('token') || '');
        xhr.onload = () => {
          console.log(`Auth code response: ${xhr.responseText}`);
        };
        xhr.send(`code=${response.code}`);
        setCodeSet(true);
      },
    }));
  }, []);

  return (
    <div className="google-auth-modal">
      <div className="google-auth-modal-content">
        <NavLink to="/home" className="close-button">x</NavLink>
        <div className="content-body">
          <h1>Connect To Your Google Account</h1>
          <label htmlFor="google-email">
            Google Email:
            <input id="description" type="text" onChange={(e) => setGoogleEmail(e.target.value)} value={googleEmail} />
          </label>
          <br />
          <button type="button" className="signInButton" onClick={codeForEmail}>
            <img src="https://i.imgur.com/QX6Twi6.png" alt="google sign in" />
          </button>
          <button className="save-button" type="button" disabled={infoFilled()} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}
