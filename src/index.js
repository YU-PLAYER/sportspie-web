import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './reset.css';

import TopBar from './topBar';
import Nav from './Nav';
import Map from './Map';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TopBar />
    <Nav />
    <Map />
  </React.StrictMode>
);
