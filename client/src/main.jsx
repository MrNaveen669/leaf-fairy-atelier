import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CommerceProvider } from './state/CommerceContext.jsx';
import { AuthProvider } from './state/AuthContext.jsx';
import './styles.css';
import './commerce.css';
import './account.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider><CommerceProvider><App /></CommerceProvider></AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
