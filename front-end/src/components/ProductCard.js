import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductQuantity from './ProductQuantity';
import { requestData } from '../services/axios';
import DeliveryAppContext from '../context/DeliveryAppContext';

function CustomerProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState();
  const [isActive, setIsActive] = useState(true);
  const { setTotalPrice } = useContext(DeliveryAppContext);

  const getProducts = async (endpoint) => {
    try {
      const response = await requestData(endpoint);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = (storage) => {
    if (storage) {
      const totalPrice = storage.reduce((acc, curr) => acc + curr.subTotal, 0);
      setTotal(totalPrice);
    }
    return 0;
  };

  const handleCard = (storage) => {
    getTotal(storage);
  };

  const setCheckout = () => {
    setTotalPrice(0);
    navigate('/customer/checkout');
  };
  useEffect(() => {
    getProducts('/customer/products');
  }, []);

  useEffect(() => {
    handleCard(JSON.parse(localStorage.getItem('carrinho')));
  }, []);

  return (
    <main>
      <button
        type="button"
        className="product-total-value"
        data-testid="customer_products__button-cart"
        disabled={ isActive }
        onClick={ () => setCheckout() }
      >
        <p>Finalizar</p>
        <p
          data-testid="customer_products__checkout-bottom-value"
        >
          {total ? total.toFixed(2).replace('.', ',') : 0}

        </p>
      </button>
      <div className="product-card-conainer">
        {products.map((item, index) => (
          <div key={ index } className="product-card">
            <ProductQuantity
              id={ item.id }
              urlImage={ item.urlImage }
              name={ item.name }
              price={ item.price.replace('.', ',') }
              handleCard={ (e) => handleCard(e) }
              setIsActive={ () => setIsActive() }
            />
          </div>
        ))}
      </div>

    </main>
  );
}

export default CustomerProducts;
