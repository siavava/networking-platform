import React from 'react';
import {
  BrowserRouter, Routes, Route, useParams,
} from 'react-router-dom';

import Companies from './companies';
import CompanyProfile from './company-profile';
import People from './people';
import HomePage from './homepage';
import Landing from './landing';
import SignUp from './signup';
import Nav from './navbar';
import PersonProfile from './person-profile';
import LogIn from './login';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="homepage" element={<HomePage />} />
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:companyId" element={<CompanyProfile />} />
          <Route path="/people" element={<People />} />
          <Route path="/people/:id" element={<PersonProfile />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Test() {
  const { id } = useParams();
  return <div> ID: {id} </div>;
}

function FallBack() {
  return <div>Not Found</div>;
}

export default App;
