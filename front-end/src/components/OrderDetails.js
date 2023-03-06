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
      console.log(`ordersUpdate foi chamada com status: 'Preparando' e id: '${id}'`);
      const { data } = await axios.put(UPDATEROUTE, { id, status: PREPARANDO });
      console.log(data);
      getOrder();
    } catch (error) {
      console.log('erro na chamada: Status Update para Preparando');
      console.log(error);
    }
  };

  const dispatchOrder = async () => {
    try {
      console.log(`ordersUpdate foi chamada com status: 'Em Trânsito' e id: '${id}'`);
      const { data } = await axios.put(UPDATEROUTE, { id, status: EM_TRANSITO });
      console.log(data);
      getOrder();
    } catch (error) {
      console.log('erro na chamada: Status Update para Em Trânsito');
    }
  };

  const finishOrder = async () => {
    try {
      console.log(`ordersUpdate foi chamada com status: 'Entregue' e id: '${id}'`);
      const { data } = await axios.put(UPDATEROUTE, { id, status: ENTREGUE });
      console.log(data);
      getOrder();
    } catch (error) {
      console.log('erro na chamada: Status Update para Entregue');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'finish-button') {
      console.log('finnishButton foi clicado');
      finishOrder();
    }
    if (e.target.name === 'prepare-button') {
      console.log('prepareButton foi clicado');
      prepareOrder();
    }
    if (e.target.name === 'dispatch-button') {
      console.log('dispatchButton foi clicado');
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
      <div data-testid={ USR + ID01 }>
        P. Vend:
        {orderSeller.name}
      </div>
    );
  }

  function finishButton() {
    return (
      <button
        name="finish-button"
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
        // name={ products.id }
        name="dispatch-button"
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
      <div>
        <div>
          <p>Pedido </p>
          <p data-testid={ USR + ID05 }>{ orderData.id }</p>
        </div>
        {USR === 'customer' && sellerName() }
        <div data-testid={ USR + ID06 }>
          { formatDate(orderData.saleDate) }
        </div>
        <div data-testid={ USR + ID07 }>
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
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>

        <tbody>
          {products.map(({ name, price, SaleProduct: { quantity } }, index) => (
            <tr key={ index }>
              <td data-testid={ `${USR + ID08}${index}` }>
                {index + 1}
              </td>
              <td data-testid={ `${USR + ID09}${index}` }>
                {name}
              </td>
              <td data-testid={ `${USR + ID10}${index}` }>
                {quantity}
              </td>
              <td data-testid={ `${USR + ID11}${index}` }>
                {price}
              </td>
              <td data-testid={ `${USR + ID12}${index}` }>
                {(calcProductPrice(quantity, price)).toFixed(2).replace('.', ',')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Total:</h2>
        <h2 data-testid={ USR + ID13 }>{ calcTotalPrice(products) }</h2>
      </div>
    </>
  );
}

export default OrdersDetails;
