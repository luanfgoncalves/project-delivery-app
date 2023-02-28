import React from 'react';

function Header() {
  return (
    <header>
      <button
        data-testid="customer_products__element-navbar-link-products"
        type="button"
      >
        produtos
      </button>
      <button
        data-testid="customer_products__element-navbar-link-orders"
        type="button"
      >
        meus pedidos
      </button>
      <h3
        data-testid="customer_products__element-navbar-user-full-name"
      >
        pessoa
      </h3>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
      >
        sair
      </button>
    </header>
  );
}

export default Header;
