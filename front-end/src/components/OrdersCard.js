import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';
import formatDate from '../utils/formatDate';

function OrdersCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [userOrders, setUserOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem('user'));

  const USR = user.role;

  useEffect(() => {
    // função que recupera pedidos realizados do banco de dados
    const getOrders = async () => {
      const { id } = user;
      try {
        if (user) {
          if (USR === 'customer') {
            const { data } = await axios.get('http://localhost:3001/customer/orders', { params: { user_id: id } });
            setUserOrders(data);
          }
          if (USR === 'seller') {
            const { data } = await axios.get('http://localhost:3001/seller/orders', { params: { seller_id: id } });
            setUserOrders(data);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
  }, []);

  // função que rendiza o campo de endereço nos cards do vendedor
  function orderAddress(i) {
    return (
      <div
        data-testid={ `seller_orders__element-card-address-${userOrders[i].id}` }
        className="order-adress"
      >
        Endereço de entrega:
        { userOrders[i].deliveryAddress }
      </div>
    );
  }

  function dateAndValue(order) {
    return (
      <>
        <div className="order-date">
          Data de entrega:
          <div data-testid={ `${USR}_orders__element-order-date-${order.id}` }>
            { formatDate(order.saleDate) }
          </div>
        </div>
        <div className="order-total-value">
          Valor do pedido:
          <div data-testid={ `${USR}_orders__element-card-price-${order.id}` }>
            { order.totalPrice.replace('.', ',') }
          </div>
        </div>
      </>
    );
  }

  // função que renderiza o card do produto
  function saleCard() {
    return (
      <div className="order-card-conainer">
        {userOrders.map((order, i) => (
          <Link
            to={ `./${order.id}` }
            key={ i }
            data-testid={ `${USR}_orders__element-order-id-${order.id}` }
          >
            <div className="order-card">
              <div className="order-number">
                Numero do pedido:
                { order.id }
              </div>
              <div className="order-info-container">
                <div className="order-info">
                  <div
                    data-testid={ `${USR}_orders__element-delivery-status-${order.id}` }
                    className="order-status"
                  >
                    Estado do pedido:
                    { order.status }
                  </div>
                  <div className="date-and-value-container">
                    { dateAndValue(order) }
                  </div>
                </div>
                { USR === 'seller' && orderAddress(i) }
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  if (isLoading) return <Loading />;
  return (
    <>
      { saleCard() }
    </>
  );
}

export default OrdersCard;
