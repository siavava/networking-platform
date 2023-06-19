import React from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';

import Companies from './companies';
import CompanyProfile from './company-profile';
import People from './people';
import HomePage from './homepage';
import Landing from './landing';
import SignUp from './signup';
import NavigationBar from './navbar';
import PersonProfile from './person-profile';
import LogIn from './login';
import Signout from './signout';
import RestrictedPage from './restricted_pages';
import ExpandNoteView from './expanded-note-modal';
import GoogleAuth from './googleAuth';
import ExpandTaskView from './expanded-task-modal';

function FallBack() {
  return <div>Not Found</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavigationBar />
        <Routes>
          <Route path="/home" element={<RestrictedPage restrictedPage={HomePage} />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/companies" element={<RestrictedPage restrictedPage={Companies} />} />
          <Route path="/companies/:companyId" element={<RestrictedPage restrictedPage={CompanyProfile} />} />
          <Route path="/people" element={<RestrictedPage restrictedPage={People} />} />
          <Route path="/people/:id/" element={<RestrictedPage restrictedPage={PersonProfile} />}>
            <Route path="notes/:id" element={<RestrictedPage restrictedPage={ExpandNoteView} />} />
            <Route path="tasks/:id" element={<RestrictedPage restrictedPage={ExpandTaskView} />} />
          </Route>
          <Route path="/signout" element={<Signout />} />
          <Route path="/settings" element={<RestrictedPage restrictedPage={GoogleAuth} />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
