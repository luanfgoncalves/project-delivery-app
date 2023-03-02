import PropTypes, { string, number } from 'prop-types';
import { useState, useEffect } from 'react';

export default function ProductCard({
  id,
  name,
  urlImage,
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
      subTotal: parseFloat(price.replace(',', '.')) * newQuantity,
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

  const inputQuantity = ({ value }) => {
    if (value < 0) return setQuantity(0);
    setQuantity(value);
    updateLocalStorage(value);

    handleCard(JSON.parse(localStorage.getItem('carrinho')));
  };

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify([]));
  }, []);

  return (

    <div>
      <div>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt=""
        />
      </div>

      <div>
        <h5
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </h5>

        <p
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$ ${price}`}
        </p>

        <div>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            title="remove"
            onClick={ () => removeQuantity() }
          >
            -
          </button>

          <input
            type="text"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantity }
            title="inputQuantity"
            onChange={ (e) => inputQuantity(e.target) }
          />

          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            title="add"
            onClick={ () => adicionaQuantity() }
          >
            +
          </button>

        </div>

      </div>
    </div>

  );
}

ProductCard.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  urlImage: string.isRequired,
  price: string.isRequired,
  handleCard: PropTypes.func.isRequired,
  setIsActive: PropTypes.func.isRequired,
};
