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
    <>
      <table>
        <thead>
          <tr>
            <th className="td-item">Item</th>
            <th className="td-description">Descrição do Produto</th>
            <th className="td-qtd">Qtd</th>
            <th className="td-value">Valor</th>
            <th className="td-subtotal">Sub-total</th>
            <th className="td-remove-item">Remover Item</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product, index) => (
            <tr key={ product.id + index }>
              <td
                className="td-item"
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}

              </td>
              <td
                className="td-description"
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {product.name}

              </td>
              <td
                className="td-qtd"
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {product.quantity}

              </td>
              <td
                className="td-value"
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {product.unitPrice}

              </td>
              <td
                className="td-subtotal"
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {parseFloat(product.subTotal).toFixed(2).replace('.', ',')}

              </td>
              <td className="td-remove-item">
                <button
                  name={ product.id }
                  className="button-remove-item"
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
      <div
        className="checkout-total"
        data-testid="customer_checkout__element-order-total-price"
      >
        {parseFloat(totalPrice).toFixed(2).replace('.', ',')}
      </div>
    </>
  );
}

export default TableCheckout;
