// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import DeliveryAppContext from '../context/DeliveryAppContext';

// function OrdersCard() {
//   //  context será usado para renderização condicional, conforme o card
//   const { user } = useContext(DeliveryAppContext);

//   // função que recupera pedidos realizados do banco de dados
//   const getOrders = async () => {
//     try {
//       console.log('getOrders foi chamada');
//       const { data } = await axios.get('http://localhost:3001/', { email, password });
//     } catch (error) {
//       console.log('erro na chamada');
//     }
//   };
//   // função que rendiza o campo de endereço nos cards do vendedor
//   function orderAdress() {
//     return (
//       <div datatest-id={ `seller_orders__element-card-address-${ID}` }>
//         Endereço de entrega
//       </div>
//     );
//   }

//   // função que renderiza o card do produto
//   function customerCard() {
//     return (
//       // div que engloba o car
//       <Link to={ `${user.role}/orders` }>
//         <div>
//           <div datatest-id={ `customer_orders__element-order-id-${ID}` }>
//             numero do pedido
//           </div>
//           {/* div que engloba estado, data, valor e endereço */}
//           <div>
//             <div datatest-id={ `customer_orders__element-delivery-status-${ID}` }>
//               estado do pedido
//             </div>
//             {/* div que engloba data e valor */}
//             <div>
//               <div datatest-id={ `customer_orders__element-order-date-${ID}` }>
//                 data de entrega
//               </div>
//               <div datatest-id={ `customer_orders__element-card-price-${ID}` }>
//                 valor do pedido
//               </div>
//             </div>
//             { user.role === 'seller' && orderAdress() }

//           </div>
//         </div>
//       </Link>
//     );
//   }

//   return (
//     <div>
//       { user.role === 'customer' && customerCard() }
//       { user.role === 'seller' && sellerCard() }
//     </div>
//   );
// }

// export default OrdersCard;
