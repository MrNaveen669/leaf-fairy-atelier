import React from 'react';
import { createRoot } from 'react-dom/client';
import AdminRuntime from './AdminRuntime';
import './styles.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><AdminRuntime /></React.StrictMode>);
