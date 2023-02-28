import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from './DeliveryAppContext';

function DeliveryAppProvider({ children }) {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const valueContext = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    products,
    setProducts,
    totalPrice,
    setTotalPrice,
  }), [email, password, products, totalPrice]);

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
