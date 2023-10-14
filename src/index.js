import React from 'react';
// import ReactDOM from "react-dom";
import ReactDOM from 'react-dom/client';
import './reset.css';
// import { BrowserRouter } from "react-router-dom";

import TopBar from './topBar';
import NavBar from './NavBar';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <TopBar />
      <App />
      <NavBar />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
