import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { requestData } from '../services/axios';
import Loading from './Loading';
import formatDate from '../utils/formatDate';
import { ID01, ID02, ID03, ID04, ID05, ID06, ID07, ID08,
  ID09, ID10, ID11, ID12, ID13 } from '../utils/orderDeatilsIds';

function OrdersDetails() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [orderSeller, setOrderSeller] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const USR = user.role;
  const UPDATEROUTE = 'http://localhost:3001/orders/update';
  const PREPARANDO = 'Preparando';
  const EM_TRANSITO = 'Em Trânsito';
  const ENTREGUE = 'Entregue';

  const getOrder = async () => {
    try {
      const data = await requestData(`/customer/orders/${id}?displayProducts=true`);
      setOrderData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const callGetOrder = () => { getOrder(); };
    callGetOrder();
  }, []);

  useEffect(() => {
    const getSeller = async () => {
      try {
        const allSellers = await requestData('/seller');
        const { sellerId } = orderData;
        const sellerObj = allSellers.find((seller) => seller.id === sellerId);
        setOrderSeller(sellerObj);
      } catch (error) {
        console.log(error);
      }
    };

    getSeller();
    setProducts(orderData.products);
  }, [orderData]);

  useEffect(() => {
    if (orderSeller && products) {
      setIsLoading(false);
    }
  }, [orderSeller, products]);

  const calcProductPrice = (qty, value) => (qty * Number(value));

  const prepareOrder = async () => {
    try {
      await axios.put(UPDATEROUTE, { id, status: PREPARANDO });
      getOrder();
    } catch (error) {
      console.log('erro na chamada: Status Update para Preparando');
    }
  };

  const dispatchOrder = async () => {
    try {
      await axios.put(UPDATEROUTE, { id, status: EM_TRANSITO });
      getOrder();
    } catch (error) {
      console.log('erro na chamada: Status Update para Em Trânsito');
    }
  };

  const finishOrder = async () => {
    try {
      await axios.put(UPDATEROUTE, { id, status: ENTREGUE });
      getOrder();
    } catch (error) {
      console.log('erro na chamada: Status Update para Entregue');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'finish-button') {
      finishOrder();
    }
    if (e.target.name === 'prepare-button') {
      prepareOrder();
    }
    if (e.target.name === 'dispatch-button') {
      dispatchOrder();
    }
  };

  const calcTotalPrice = (productsArr) => productsArr
    .reduce((
      acc,
      { SaleProduct: { quantity }, price },
    ) => calcProductPrice(quantity, price) + acc, 0).toFixed(2).replace('.', ',');

  function sellerName() {
    return (
      <div
        className="order-details-seller"
        data-testid={ USR + ID01 }
      >
        <p>P. Vend:</p>
        {orderSeller.name}
      </div>
    );
  }

  function finishButton() {
    return (
      <button
        name="finish-button"
        className="order-button-customer"
        data-testid={ USR + ID02 }
        type="button"
        disabled={ orderData.status !== EM_TRANSITO }
        onClick={ handleClick }
      >
        Marcar como entregue
      </button>
    );
  }

  function prepareButton() {
    return (
      <button
        name="prepare-button"
        className="order-button-seller"
        data-testid={ USR + ID03 }
        type="button"
        disabled={ orderData.status !== 'Pendente' }
        onClick={ handleClick }
      >
        Preparar pedido
      </button>
    );
  }

  function dispatchButton() {
    return (
      <button
        name="dispatch-button"
        className="order-button-seller"
        data-testid={ USR + ID04 }
        type="button"
        disabled={ orderData.status !== PREPARANDO }
        onClick={ handleClick }
      >
        Saiu para entrega
      </button>
    );
  }

  function tableHeader() {
    return (
      <div className="order-details-header">
        <div className="order-details-id">
          <p>Pedido </p>
          <p data-testid={ USR + ID05 }>{ orderData.id }</p>
        </div>
        {USR === 'customer' && sellerName() }
        <div className="order-details-date" data-testid={ USR + ID06 }>
          { formatDate(orderData.saleDate) }
        </div>
        <div className="order-details-status" data-testid={ USR + ID07 }>
          { orderData.status }
        </div>
        {USR === 'customer' && finishButton()}
        {USR === 'seller' && prepareButton()}
        {USR === 'seller' && dispatchButton()}
      </div>
    );
  }

  if (isLoading) return <Loading />;
  return (
    <>
      { tableHeader() }
      <table>
        <thead>
          <tr>
            <th className="td-item">Item</th>
            <th className="td-description">Descrição do Produto</th>
            <th className="td-qtd">Qtd</th>
            <th className="td-value">Valor</th>
            <th className="td-subtotal">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ name, price, SaleProduct: { quantity } }, index) => (
            <tr key={ index }>
              <td
                className="td-item"
                data-testid={ `${USR + ID08}${index}` }
              >
                {index + 1}
              </td>
              <td
                className="td-description"
                data-testid={ `${USR + ID09}${index}` }
              >
                {name}
              </td>
              <td
                className="td-qtd"
                data-testid={ `${USR + ID10}${index}` }
              >
                {quantity}
              </td>
              <td
                className="td-value"
                data-testid={ `${USR + ID11}${index}` }
              >
                {price}
              </td>
              <td
                className="td-subtotal"
                data-testid={ `${USR + ID12}${index}` }
              >
                {(calcProductPrice(quantity, price)).toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="checkout-total">
        <h2>Total:</h2>
        <h2 data-testid={ USR + ID13 }>{ calcTotalPrice(products) }</h2>
      </div>
    </>
  );
}

export default OrdersDetails;
