import React from 'react';
import ReactDOM from 'react-dom/client';
import './application/assets/styles/index.scss';
import { BrowserRouter } from 'react-router-dom';
import Application from './application';

function ApplicationWithHandlers() {
  
  const applicationProps = {
    adminApi: {
      baseUrl: process.env.REACT_APP_API_URL,
      authorizationToken: process.env.REACT_APP_TOKEN,
    },
  };

  return <Application {...applicationProps} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ApplicationWithHandlers />
  </BrowserRouter>,
);
