import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import DeliveryAppContext from './DeliveryAppContext';

function DeliveryAppProvider({ children }) {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [sellerID, setSellerID] = useState('');

  const getSellers = async () => {
    const { data } = await axios.get('http://localhost:3001/seller');
    setSellers(data);
    setSellerID(data[0].id);
  };

  useEffect(() => {
    getSellers();
  }, [setSellers]);

  const valueContext = useMemo(() => ({
    user,
    products,
    setProducts,
    setUser,
    totalPrice,
    setTotalPrice,
    sellers,
    setSellers,
    sellerID,
    setSellerID,
  }), [user, products, totalPrice, sellers, sellerID]);

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
