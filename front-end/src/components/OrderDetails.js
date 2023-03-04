import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';

function OrdersDetails() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [orderSeller, setOrderSeller] = useState([]);
  const { user } = useContext(DeliveryAppContext);

  const USR = user.role;
  const UPDATEROUTE = 'http://localhost:3001/order';
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
  const ID08 = `${USR}_checkout__element-order-table-item-number-`;
  const ID09 = `${USR}_checkout__element-order-table-name-`;
  const ID10 = `${USR}_checkout__element-order-table-quantity-`;
  const ID11 = `${USR}_checkout__element-order-table-unit-price-`;
  const ID12 = `${USR}_checkout__element-order-table-sub-total-`;

  useEffect(() => {
    const getSeller = async () => {
      try {
        console.log('getSeller foi chamada com id:', id);
        const { data } = await axios.get('http://localhost:3001/seller');
        console.log(`OS vendedores retornados foram ${data}`);
        const filteredData = data.find((e) => e.id === orderData.saller_id);
        setOrderSeller(filteredData.name);
        console.log(orderSeller);
      } catch (error) {
        console.log('erro na chamada: Requisição do vendedor');
      }
    };

    const getOrder = async () => {
      console.log(`O id da venda é ${id}`);
      try {
        console.log('getOrders foi chamada com id:', id);
        const { data } = await axios.get('http://localhost:3001/order/id', { id });
        console.log(`A venda retornadas foi ${data}`);
        setOrderData(data);
        getSeller();
      } catch (error) {
        console.log('erro na chamada: Requisição da venda por ID');
      }
    };

    getOrder();
  }, [setOrderData]);

  const finnishOrder = async () => {
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
      finnishOrder();
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
      <div datatestid={ ID01 }>
        P. Vend:
        {orderSeller}
      </div>
    );
  }

  function finnishButton() {
    return (
      <button
        name="finnish-button"
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
        name={ product.id }
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
      <div>
        <div datatest-id={ ID05 }>
          <p>Pedido </p>
          { orderData.id }
          <p>;</p>
        </div>
        {USR === 'customer' && sellerName() }
        <div datatest-id={ ID06 }>
          {/* Data de entrega */}
          { orderData.sale_date }
        </div>
        <div datatest-id={ ID07 }>
          {/* Estado do pedido */}
          { orderData.status }
        </div>
        {USR === 'customer' && finnishButton()}
        {USR === 'seller' && prepareButton()}
        {USR === 'seller' && dispatchButton()}
      </div>
    );
  }

  // função que rendiza itens do pedido
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
            {orderData.map((order, index) => (
              <tr key={ order.id + index }>
                <td data-testid={ `${ID08}${index}` }>
                  {index + 1}
                </td>
                <td data-testid={ `${ID09}${index}` }>
                  {order.name}
                </td>
                <td data-testid={ `${ID10}${index}` }>
                  {order.quantity}
                </td>
                <td data-testid={ `${ID11}${index}` }>
                  {order.unitPrice}
                </td>
                <td data-testid={ `${ID12}${index}` }>
                  {parseFloat(order.subTotal).toFixed(2).replace('.', ',')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }

  return (
    <>
      { orderInfo() }
    </>
  );
}

export default OrdersDetails;
