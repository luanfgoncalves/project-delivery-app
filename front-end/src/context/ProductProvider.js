import { node } from 'prop-types';
import { useMemo } from 'react';
import DeliveryAppContext from './DeliveryAppContext';

export default function ProductsProvider({ children }) {
  const getTotal = () => {
    const totalPrice = localStor.reduce((acc, curr) => acc + curr.subTotal, 0);
    return totalPrice;
  };

  const valueContext = useMemo(() => ({
    getTotal,
  }), []);

  return (
    <DeliveryAppContext.Provider value={ valueContext }>
      { children }
    </DeliveryAppContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: node.isRequired,
};
