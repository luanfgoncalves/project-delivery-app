import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from './DeliveryAppContext';

function DeliveryAppProvider({ children }) {
  const [userRole, setUserRole] = useState('');

  const valueContext = useMemo(() => ({
    userRole,
    setUserRole,

  }), [userRole]);

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
