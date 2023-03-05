import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

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
            console.log('Foram requisitadas vendas pelo id do vendedor');
            const { data } = await axios.get('http://localhost:3001/order/seller_id', { seller_id: id });
            setUserOrders(data);
            console.log(`As vendas retornadas foram ${data}`);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getOrders();
    if (userOrders && user) setIsLoading(false);
  }, []);

  // função que rendiza o campo de endereço nos cards do vendedor
  function orderAdress() {
    return (
      <div data-testid={ `seller_orders__element-card-address-${userOrders[i].id}` }>
        Endereço de entrega:
        { userOrders[i].delivery_adress }
      </div>
    );
  }

  // função que renderiza o card do produto
  function saleCard() {
    return (
      <>
        {userOrders.map((order, i) => (
          <Link
            to={ `${USR}/orders/${order.id}` }
            key={ i }
            data-testid={ `${USR}_orders__element-order-id-${order.id}` }
          >
            <div>
              <div>
                Numero do pedido:
                { order.id }
              </div>
              <div>
                <div
                  data-testid={ `${USR}_orders__element-delivery-status-${order.id}` }
                >
                  Estado do pedido:
                  { order.status }
                </div>
                <div>
                  <div data-testid={ `${USR}_orders__element-order-date-${order.id}` }>
                    Data de entrega:
                    { order.saleDate }
                  </div>
                  <div data-testid={ `${USR}_orders__element-card-price-${order.id}` }>
                    Valor do pedido:
                    { order.totalPrice }
                  </div>
                </div>
                { USR === 'seller' && orderAdress() }
              </div>
            </div>
          </Link>
        ))}
      </>
    );
  }

  // sobre o css
  // classes:
  // order-card(engloba todo o card): cinza claro com letras pretas e bordas cinza escuto
  // order-data(engloba tudo menos id): fundo cinza escuro sem bordas
  // order-number(engloba id): fundo cinza médio letras pretas
  // order-state(engloba estado): bordas e letras pretas bold, fundo dinâmico: amarelo(a caminho), azul(entregue) verde(parado)
  // order-date(engloba data): letras pretas bold, fundo cinza médio letras pretas
  // order-value(engloba preço): letras pretas bold, fundo cinza médio letras pretas
  // order-adress(engloba endereço): letras menores, fundo cinza escuro letras pretas

  if (isLoading) return <Loading />;
  return (
    <>
      { saleCard() }
    </>
  );
}

export default OrdersCard;
