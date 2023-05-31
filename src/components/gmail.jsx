/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmails } from '../store/actions';

export default function GoogleAuth() {
  const [tokenClient, setTokenClient] = useState({}); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const CLIENT_ID = '365906657849-9plkk1n06f756aq12eo0e7vclopb26c3.apps.googleusercontent.com';
  const SCOPE = 'https://mail.google.com/';

  const createEmail = () => {
    tokenClient.requestCode();
  };

  const getEmailssss = async (tokenResponse) => {
    const res = await axios.get('https://gmail.googleapis.com/gmail/v1/users/evilpiggyfoofoo@gmail.com/messages', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    });
    console.log(res);
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
        xhr.open('POST', 'http://localhost:9090/api/googleauth', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // Set custom header for CRSF
        xhr.setRequestHeader('X-Requested-With', 'XmlHttpRequest');
        xhr.setRequestHeader('Authorization', localStorage.getItem('token'));
        xhr.onload = function () {
          console.log(`Auth code response: ${xhr.responseText}`);
        };
        console.log(response.code);
        xhr.send(`code=${response.code}`);
      },
    }));
  }, []);

  return (
    <div className="gmail-signin">
      <div id="signin-button" />
      <button type="button" onClick={createEmail}>create email</button>
      <button type="button" onClick={getEmails}>get email</button>
    </div>
  );
}
