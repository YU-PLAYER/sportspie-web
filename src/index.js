import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
// import ReactDOM from "react-dom";

import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
);
