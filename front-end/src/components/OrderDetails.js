import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';
import { requestData } from '../services/axios';
import Loading from './Loading';

function OrdersDetails() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState({});
  const [orderSeller, setOrderSeller] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { user } = useContext(DeliveryAppContext);

  const USR = user.role;
  const UPDATEROUTE = 'http://localhost:3001/orders';
  const ENTREGUE = 'Entregue';
  const PREPARANDO = 'Preparando';
  const EM_TRANSITO = 'Em Trânsito';

  const ID01 = `${USR}_order_details__element-order-details-label-seller-name`;
  const ID02 = `${USR}_order_details__button-delivery-check`;
  const ID03 = `${USR}_order_details__button-preparing-check`;
  const ID04 = `${USR}_order_details__button-dispatch-check`;
  const ID05 = `${USR}_order_details__element-order-details-label-order-${id}`;
  const ID06 = `${USR}_order_details__element-order-details-label-order-date`;
  const ID07 = `${USR}_order_details__element-order-details-label-delivery-status-0`;
  const ID08 = `${USR}_order_details__element-order-table-item-number-`;
  const ID09 = `${USR}_order_details__element-order-table-name-`;
  const ID10 = `${USR}_order_details__element-order-table-quantity-`;
  const ID11 = `${USR}_order_details__element-order-table-unit-price-`;
  const ID12 = `${USR}_order_details__element-order-table-sub-total-`;

  useEffect(() => {
    // add a venda no array orderData
    const getOrder = async () => {
      try {
        const data = await requestData(`/customer/orders/${id}?displayProducts=true`);
        setOrderData(data);
      } catch (error) {
        console.log(error);
      }
    };

    getOrder();
  }, []);

  useEffect(() => {
    // retorna o nome da pessoa vendedora
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

  const calcProductPrice = (qty, value) => qty * Number(value);

  const finishOrder = async () => {
    try {
      console.log(`ordersUpdate foi chamada com status: 'Entregue' e id: '${id}'`);
      const { data } = await axios.update(UPDATEROUTE, { id, status: ENTREGUE });
      console.log(data);
    } catch (error) {
      console.log('erro na chamada: Status Update para Entregue');
    }
  };

  const prepareOrder = async () => {
    try {
      console.log(`ordersUpdate foi chamada com status: 'Preparando' e id: '${id}'`);
      const { data } = await axios.update(UPDATEROUTE, { id, status: PREPARANDO });
      console.log(data);
    } catch (error) {
      console.log('erro na chamada: Status Update para Preparando');
    }
  };

  const dispatchOrder = async () => {
    try {
      console.log(`ordersUpdate foi chamada com status: 'Em Trânsito' e id: '${id}'`);
      const { data } = await axios.update(UPDATEROUTE, { id, status: EM_TRANSITO });
      console.log(data);
    } catch (error) {
      console.log('erro na chamada: Status Update para Em Trânsito');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'finnish-button') {
      console.log('botão de login foi clicado');
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

  function sellerName() {
    return (
      <div data-testid={ ID01 }>
        P. Vend:
        {orderSeller.name}
      </div>
    );
  }

  function finishButton() {
    return (
      <button
        name="finish-button"
        data-testid={ ID02 }
        type="button"
        onClick={ handleClick }
      >
        Marcar como entregue
      </button>
    );
  }

  function prepareButton() {
    return (
      <button
        name="prepareButton"
        data-testid={ ID03 }
        type="button"
        onClick={ handleClick }
      >
        Preparar pedido
      </button>
    );
  }

  function dispatchButton() {
    return (
      <button
        name={ products.id }
        data-testid={ ID04 }
        type="button"
        onClick={ handleClick }
      >
        Marcar como entregue
      </button>
    );
  }

  function tableHeader() {
    return (
      <div data-testid={ ID05 }>
        <div>
          <p>Pedido </p>
          <p>{ orderData.id }</p>
        </div>
        {USR === 'customer' && sellerName() }
        <div data-testid={ ID06 }>
          {/* Data de entrega */}
          { orderData.saleDate }
        </div>
        <div data-testid={ ID07 }>
          {/* Estado do pedido */}
          { orderData.status }
        </div>
        {USR === 'customer' && finishButton()}
        {USR === 'seller' && prepareButton()}
        {USR === 'seller' && dispatchButton()}
      </div>
    );
  }

  // função que renderiza itens do pedido
  function orderInfo() {
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
              <th>Remover Item</th>
            </tr>
          </thead>

          <tbody>
            {products.map(({ name, price, SaleProduct: { quantity } }, index) => (
              <tr key={ index }>
                <td data-testid={ `${ID08}${index}` }>
                  {index + 1}
                </td>
                <td data-testid={ `${ID09}${index}` }>
                  {name}
                </td>
                <td data-testid={ `${ID10}${index}` }>
                  {quantity}
                </td>
                <td data-testid={ `${ID11}${index}` }>
                  {price}
                </td>
                <td data-testid={ `${ID12}${index}` }>
                  {(calcProductPrice(quantity, price)).toFixed(2).replace('.', ',')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  if (isLoading) return <Loading />;
  return (
    <>
      { orderInfo() }
    </>
  );
}

export default OrdersDetails;
