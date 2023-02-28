import { Route, Routes } from 'react-router-dom';
import './App.css';
import DeliveryAppProvider from './context/DeliveryAppProvider';

import Home from './pages/Home';
import Login from './pages/Login';
import Manage from './pages/Manage';
import Orders from './pages/Orders';
import Products from './pages/Products';
import Register from './pages/Register';

function App() {
  return (
    <DeliveryAppProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route exact path="/login" element={ <Login /> } />
          <Route exact path="/register" element={ <Register /> } />
          <Route exact path="/customer/products" element={ <Products /> } />
          <Route exact path="/seller/orders" element={ <Orders /> } />
          <Route exact path="/admin/manage" element={ <Manage /> } />
        </Routes>
      </div>
    </DeliveryAppProvider>
  );
}

export default App;
