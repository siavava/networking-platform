/* eslint-disable no-unused-vars */
/* eslint-disable react/function-component-definition */
import React from 'react';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import Counter from './counter';
import Controls from './controls';

function App(props) {
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/test/:id" element={<Test />} />;
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const About = (props) => <div> All there is to know about me </div>;
const Welcome = (props) => <div>Welcome, <Counter /><Controls /></div>;

const Nav = (props) => (
  <nav>
    <ul>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/test/id1">test id1</NavLink></li>
      <li><NavLink to="/test/id2">test id2</NavLink></li>
    </ul>
  </nav>
);

const Test = (props) => {
  const { id } = useParams();
  return <div> ID: {id} </div>;
};

const FallBack = (props) => <div>URL Not Found</div>;

export default App;
