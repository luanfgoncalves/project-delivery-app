import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import Loading from './Loading';
import { requestData } from '../services/axios';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [isActive, setIsActive] = useState(true);

  const getProducts = async (endpoint) => {
    try {
      const response = await requestData(endpoint);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts('/customer/products');
  }, []);

  // Logica com problemas para que o requisito 16 e metade do 15 poder passar

  useEffect(() => {
    const newTotal = cart.reduce(
      (acc, item) => acc + item.quantity * parseFloat(item.unitPrice),
      0,
    );
    setTotal(newTotal);
    localStorage.setItem('cart', JSON.stringify(cart));
    setIsActive(cart.length === 0);
  }, [cart]);

  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) => (cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem)),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  if (!products) return <Loading />;
  return (
    <section>
      <div className="input-group mb-3 justify-content-center">
        <button
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ isActive }
          onClick={ () => navigate('/customer/checkout') }
        >
          <p data-testid="customer_products__checkout-bottom-value">
            {' '}
            {total ? total.toFixed(2).replace('.', ',') : '0,00'}
          </p>
        </button>
      </div>
      <ul>
        {products.map((item, index) => (
          <li key={ index }>
            <ProductCard
              id={ item.id }
              urlImage={ item.urlImage }
              name={ item.name }
              price={ item.price.replace('.', ',') }
              onAddToCart={ () => handleAddToCart(item) }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Products;
