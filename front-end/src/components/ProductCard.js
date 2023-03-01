import PropTypes from 'prop-types';
import ProductQuantity from './ProductQuantity';

function ProductCard({ id, urlImage, name, price }) {
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
