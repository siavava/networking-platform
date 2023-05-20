import React from 'react';
import {
  BrowserRouter, Routes, Route, useParams,
} from 'react-router-dom';
import Landing from './landing';
import Nav from './navabr';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/test/:id" element={<Test />} />;
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
