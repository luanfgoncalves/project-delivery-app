import React from 'react';
import DetailsCheckout from '../components/DetailsCheckout';
import TableCheckout from '../components/TableCheckout';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Checkout() {
  return (
    <>
      <Header />
      <main className="table-container">
        <h1 className="finish-order">Finalizar Pedido</h1>
        <TableCheckout />
        <DetailsCheckout />
        <Footer />
      </main>
    </>
  );
}

export default Checkout;
