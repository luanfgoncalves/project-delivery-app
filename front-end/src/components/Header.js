import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';

function Header() {
  const { userRole, setUserRole } = useContext(DeliveryAppContext);
  const navigate = useNavigate();

  // Renderiza link para a tela de produtos a venda pro cliente
  function customerOrders() {
    return (
      <Link
        to="/customer/orders/"
        datatest-id="customer_products__element-navbar-link-products"
      >
        Produtos
      </Link>
    );
  }

  // renderiza as opções(Pedidos do cliente, pedididos do comprador e tela de gerenciamento pro adm)
  function userOptions() {
    return (
      <div datatest-id="customer_products__element-navbar-link-orders">

        { userRole === 'customer' && <Link to="/customer/products">Meus Pedidos</Link> }

        { userRole === 'seller' && <Link to="/seller/orders">Pedidos</Link> }

        { userRole === 'admin' && <Link to="/admin/manage">Gerenciar Usuários</Link> }

      </div>
    );
  }

  // renderiza o nome do usuário
  function userName() {
    return (
      <div datatest-id="customer_products__element-navbar-user-full-name">
        <h1>User</h1>
      </div>
    );
  }

  function logout() {
    setUserRole('');
    navigate('/');
  }

  const handleClick = (e) => {
    e.preventDefault();
    console.log('botão de logout foi clicado');
    logout();
  };

  function logoutButton() {
    return (
      <button
        name="logout-button"
        class-name="logout-button"
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ handleClick }
      >
        Sair
      </button>
    );
  }

  return (
    <header>

      { userRole === 'customer' && customerOrders() }

      { userOptions() }

      { userName() }

      { logoutButton() }

    </header>
  );
}

export default Header;
