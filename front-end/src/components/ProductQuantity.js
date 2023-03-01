import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProductQuantity({
  id,
  name,
  price,
  handleCard,
  setIsActive,
}) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const itemIndex = cart.findIndex((item) => item.id === id);
  const { quantity: initialQuantity } = cart[itemIndex] || { quantity: 0 };

  const adicionaQuantity = () => {
    const newQuantity = initialQuantity + 1;
    const updatedCart = [...cart];
    if (itemIndex >= 0) {
      updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity: newQuantity };
    } else {
      updatedCart.push({ id, name, quantity: newQuantity, unitPrice: price });
    }
    setCart(updatedCart);
    setIsActive(false);
    handleCard(updatedCart);
  };

  const removeQuantity = () => {
    const newQuantity = initialQuantity - 1;
    if (newQuantity < 0) return;
    const updatedCart = [...cart];
    if (itemIndex >= 0) {
      updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity: newQuantity };
      setCart(updatedCart);
      handleCard(updatedCart);
    }
  };

  const handleChangeQty = ({ target: { value } }) => {
    const newQuantity = Number(value);
    const updatedCart = [...cart];
    if (newQuantity >= 0) {
      if (itemIndex >= 0) {
        updatedCart[itemIndex] = { ...updatedCart[itemIndex], quantity: newQuantity };
        setCart(updatedCart);
        handleCard(updatedCart);
      } else {
        updatedCart.push({ id, name, quantity: newQuantity, unitPrice: price });
        setCart(updatedCart);
        setIsActive(false);
        handleCard(updatedCart);
      }
    }
  };

  return (
    <section>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        title="remove"
        onClick={ removeQuantity }
      >
        -
      </button>

      <input
        type="number"
        min="0"
        value={ initialQuantity }
        name="quantity"
        onChange={ handleChangeQty }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        title="add"
        onClick={ adicionaQuantity }
      >
        +
      </button>

    </section>
  );
}

export default ProductQuantity;

ProductQuantity.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleCard: PropTypes.func.isRequired,
  setIsActive: PropTypes.func.isRequired,
};
