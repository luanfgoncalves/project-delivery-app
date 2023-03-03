import React, { useEffect, useContext } from 'react';
import DeliveryAppContext from '../context/DeliveryAppContext';

function TableCheckout() {
  const {
    setProducts,
    products,
    setTotalPrice,
    totalPrice,
  } = useContext(DeliveryAppContext);

  useEffect(() => {
    const productsLocalStorage = JSON.parse(localStorage.getItem('carrinho'));
    setProducts(productsLocalStorage);

    let subTotal = 0;
    if (totalPrice === subTotal) {
      productsLocalStorage.forEach((product) => {
        subTotal += totalPrice + product.subTotal;
      });
      setTotalPrice(subTotal);
    }
  }, [totalPrice, setProducts, setTotalPrice]);

  const deleteProduct = (e) => {
    const index = e.target.name;
    const filter = products.filter((product) => product.id !== Number(index));
    setProducts(filter);
    setTotalPrice(0);
    localStorage.setItem('carrinho', JSON.stringify(filter));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={ product.id + index }>
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}

              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {product.name}

              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {product.quantity}

              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {product.unitPrice}

              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {parseFloat(product.subTotal).toFixed(2).replace('.', ',')}

              </td>
              <td>
                <button
                  name={ product.id }
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  type="button"
                  onClick={ (e) => deleteProduct(e) }
                >
                  Remover

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div data-testid="customer_checkout__element-order-total-price">
        {parseFloat(totalPrice).toFixed(2).replace('.', ',')}
      </div>
    </div>
  );
}

export default TableCheckout;
