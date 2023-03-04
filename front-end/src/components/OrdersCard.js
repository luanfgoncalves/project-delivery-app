import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';

function OrdersCard() {
  //  context será usado para renderização condicional, conforme o card
  const {
    user,
    userOrders,
    setUserOrders,
  } = useContext(DeliveryAppContext);

  const USR = user.role;

  useEffect(() => {
    // função que recupera pedidos realizados do banco de dados
    const getOrders = async () => {
      const { id } = user;
      try {
        console.log('getOrders foi chamada com id:', id);
        if (USR === 'customer') {
          console.log('foram requisitadas vendas pelo id do comprador');
          const { data } = await axios.get('http://localhost:3001/order/user_id', { user_id: id });
          console.log('data');
          setUserOrders(data);
          console.log(`As vendas retornadas foram ${data}`);
        }
        if (USR === 'seller') {
          console.log('Foram requisitadas vendas pelo id do vendedor');
          const { data } = await axios.get('http://localhost:3001/order/seller_id', { seller_id: id });
          setUserOrders(data);
          console.log(`As vendas retornadas foram ${data}`);
        }
      } catch (error) {
        console.log('erro na chamada');
      }
    };

    getOrders();
  }, [setUserOrders, user]);

  // função que rendiza o campo de endereço nos cards do vendedor
  function orderAdress() {
    return (
      <div datatest-id={ `seller_orders__element-card-address-${userOrders[i].id}` }>
        Endereço de entrega:
        { userOrders[i].delivery_adress }
      </div>
    );
  }

  // função que renderiza o card do produto
  function saleCard() {
    return (
      <>
        {userOrders.map((e, i) => (
          <Link
            to={ `${USR}/orders/${e[i].id}` }
            key={ i }
          >
            <div>
              <div datatest-id={ `${USR}_orders__element-order-id-${e[i].id}` }>
                Numero do pedido:
                { e[i].id }
              </div>
              <div>
                <div
                  datatest-id={ `${USR}_orders__element-delivery-status-${e[i].id}` }
                >
                  Estado do pedido:
                  { e[i].status }
                </div>
                <div>
                  <div datatest-id={ `${USR}_orders__element-order-date-${e[i].id}` }>
                    Data de entrega:
                    { e[i].sale_date }
                  </div>
                  <div datatest-id={ `${USR}_orders__element-card-price-${e[i].id}` }>
                    Valor do pedido:
                    { e[i].total_price }
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

  return (
    <>
      { saleCard() }
    </>
  );
}

export default OrdersCard;
