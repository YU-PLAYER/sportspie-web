import React from 'react';
// import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';
import './reset.css';
// import { BrowserRouter } from "react-router-dom";

import TopBar from './topBar';
import Nav from './Nav';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <TopBar />
      <App />
      <Nav />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
