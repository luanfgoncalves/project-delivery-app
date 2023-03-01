import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from './DeliveryAppContext';

function DeliveryAppProvider({ children }) {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [sellerID, setSellerID] = useState('');

  useEffect(() => {
    const arrayTeste = [
      { id: 1, name: 'Carla' },
      { id: 2, name: 'Julia' },
      { id: 3, name: 'Tauri' },
    ];

    // Mudar pelos dados que vem do Back
    setSellers(arrayTeste);
    setSellerID(arrayTeste[0].id);
  }, [setSellers]);

  const valueContext = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    products,
    setProducts,
    totalPrice,
    setTotalPrice,
    sellers,
    setSellers,
    sellerID,
    setSellerID,
  }), [email, password, products, totalPrice, sellers, sellerID]);

  return (
    <DeliveryAppContext.Provider value={ valueContext }>
      { children }
    </DeliveryAppContext.Provider>
  );
}

DeliveryAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DeliveryAppProvider;
