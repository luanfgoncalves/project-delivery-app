import React from 'react';
import DetailsCheckout from '../components/DetailsCheckout';
import TableCheckout from '../components/TableCheckout';

function Checkout() {
  return (
    <div>
      <p>Finalizar Pedido</p>
      <TableCheckout />
      <p>Detalhes e Endereço para Entrega</p>
      <DetailsCheckout />
    </div>
  );
}

export default Checkout;
