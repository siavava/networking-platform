/* eslint-disable react/function-component-definition */
import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.scss';

const App = () => <div className="test">All the REACT are belong to us!</div>;

const root = createRoot(document.getElementById('main'));
root.render(<App />);
