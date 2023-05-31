/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROOT_URL, getEmails } from '../store/actions';
import '../settings.style.scss';

export default function GoogleAuth() {
  const [tokenClient, setTokenClient] = useState({}); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const CLIENT_ID = '365906657849-9plkk1n06f756aq12eo0e7vclopb26c3.apps.googleusercontent.com';
  const SCOPE = 'https://mail.google.com/';

  const codeForEmail = () => {
    tokenClient.requestCode();
  };

  useEffect(() => {
    /* global google */

    setTokenClient(google.accounts.oauth2.initCodeClient({
      access_type: 'offline',
      client_id: CLIENT_ID,
      scope: SCOPE,
      ux_mode: 'popup',
      callback: (response) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', `${ROOT_URL}/api/googleauth`, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // Set custom header for CRSF
        xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        xhr.onload = function () {
          console.log(`Auth code response: ${xhr.responseText}`);
        };
        xhr.send(`code=${response.code}`);
      },
    }));
  }, []);

  return (
    <div className="google-auth-modal">
      <div className="google-auth-modal-content">
        <NavLink to="/home" className="close-button">x</NavLink>
        <div className="content-body">
          <h1>Connect To Your Google Account</h1>
          <br />
          <button type="button" id="edit" onClick={codeForEmail}>
            <img src="../src/img/google-sign-in.png" alt="google sign in" />
          </button>
        </div>
      </div>
    </div>
  );
}
