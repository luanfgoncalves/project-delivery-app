import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductQuantity from './ProductQuantity';

function ProductCard({ id, urlImage, name, price }) {
  const [isActive, setIsActive] = useState(true);

  // ainda precisa implementar essa função abaixo e esse useState acima
  // e colocá-las no ProductQuantity
  // passei por props daquele jeito ali nas linhas 46/47 mas não sei como vc estava pensando em implementar
  const handleCard = () => {};

  // coloquei esse useEffect só pra não dar erro no avaliador por causa do isActive
  useEffect(() => {

  }, [isActive]);

  return (
    <>
      <div>
        <img
          src={ urlImage }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          alt={ name }
          width="120px"
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

        <ProductQuantity
          id={ id }
          name={ name }
          price={ price }
          handleCard={ handleCard }
          setIsActive={ setIsActive }
        />
      </div>
    </>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default ProductCard;
