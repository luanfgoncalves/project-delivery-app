import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import DeliveryAppContext from './DeliveryAppContext';

function DeliveryAppProvider({ children }) {
  const [user, setUser] = useState({});

  const valueContext = useMemo(() => ({
    user,
    setUser,

  }), [user]);

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
