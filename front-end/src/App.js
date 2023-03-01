import { Route, Routes } from 'react-router-dom';
import './App.css';
import DeliveryAppProvider from './context/DeliveryAppProvider';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <DeliveryAppProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/customer/checkout" element={ <Checkout /> } />
          <Route exact path="/customer/checkout/:id" element={ <Details /> } />
        </Routes>
      </div>
    </DeliveryAppProvider>
  );
}

export default App;
