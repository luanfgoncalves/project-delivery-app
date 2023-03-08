import { Route, Routes } from 'react-router-dom';
import './App.css';
import DeliveryAppProvider from './context/DeliveryAppProvider';
import Checkout from './pages/Checkout';
import Details from './pages/Details';
import Home from './pages/Home';
import Login from './pages/Login';
import Customer from './pages/Customer';
import Manage from './pages/Manage';
import Orders from './pages/Orders';
import Register from './pages/Register';

function App() {
  return (
    <DeliveryAppProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/customer/orders" element={ <Orders /> } />
          <Route exact path="/seller/orders" element={ <Orders /> } />
          <Route exact path="/admin/manage" element={ <Manage /> } />
          <Route exact path="/customer/products" element={ <Customer /> } />
          <Route exact path="/customer/checkout" element={ <Checkout /> } />
          <Route exact path="/customer/orders/:id" element={ <Details /> } />
          <Route exact path="/seller/orders/:id" element={ <Details /> } />
        </Routes>
      </div>
    </DeliveryAppProvider>
  );
}

export default App;
