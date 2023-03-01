import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ProductQuantity({
  id,
  name,
  price,
  handleCard,
  setIsActive,
}) {
  const [quantity, setQuantity] = useState(0);

  const updateLocalStorage = (newQuantity) => {
    const cart = JSON.parse(localStorage.getItem('carrinho'));
    const arrCartPrepared = cart.filter((item) => item.id !== id);
    const newItem = {
      id,
      name,
      quantity: newQuantity,
      unitPrice: price,
    };
    localStorage.setItem(
      'carrinho',
      JSON.stringify([...arrCartPrepared, newItem]),
    );
  };

  const adicionaQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);
    setIsActive(false);
    handleCard(JSON.parse(localStorage.getItem('carrinho')));
  };

  const removeQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity < 0) return setQuantity(0);
    setQuantity(newQuantity);
    updateLocalStorage(newQuantity);

    handleCard(JSON.parse(localStorage.getItem('carrinho')));
  };

  const handleChangeQty = ({ target: { value } }) => {
    setQuantity(Number(value));
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify([]));
  }, []);

  return (
    <section>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        title="remove"
        onClick={ () => removeQuantity }
      >
        -
      </button>

      <input
        type="number"
        min="0"
        value={ quantity }
        name="quantity"
        onChange={ handleChangeQty }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />

      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        title="add"
        onClick={ () => adicionaQuantity }
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
