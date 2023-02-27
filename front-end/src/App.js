import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DeliveryAppProvider from './context/DeliveryAppProvider';

import Login from './pages/Login';

function App() {
  return (
    <DeliveryAppProvider>
      <div className="app">
        <Routes>
          <Route path="/" exact element={ <Login /> } />
          <Route exact path="/login" element={ <Login /> } />
        </Routes>
      </div>
    </DeliveryAppProvider>
  );
}

export default App;
