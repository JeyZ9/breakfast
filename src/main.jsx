import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import TicketsProvider from './contexts/TicketsContext.jsx';
import CustomerProvider from './contexts/CustomerContext.jsx';
import CountryProvider, { CountryContext } from './contexts/CountryContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CountryProvider>
    <CustomerProvider>
    <TicketsProvider>
        <App />
    </TicketsProvider>
    </CustomerProvider>
    </CountryProvider>
  </React.StrictMode>,
);
