import { Route, Routes } from 'react-router-dom';
import './App.css';
import DeliveryAppProvider from './context/DeliveryAppProvider';

import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <DeliveryAppProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route exact path="/login" element={ <Login /> } />
        </Routes>
      </div>
    </DeliveryAppProvider>
  );
}

export default App;
