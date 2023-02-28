import React from 'react';

function ProductQuantity({ id }) {
  return (
    <section>
      <button
             type="button"
             data-testid={ `customer_products__button-card-rm-item-${id}` }
             title="remove"
             onClick={ () =>  }
           >
             -
      </button>

    <p
      data-testid={`customer_products__input-card-quantity-${id}`}>
        quantidade
    </p>

      <button
             type="button"
             data-testid={ `customer_products__button-card-add-item-${id}` }
             title="add"
             onClick={ () =>  }
           >
             +
        </button>
    </section>
  )
}

export default ProductQuantity;
