import React, { useEffect } from 'react';

import ProductCard from './ProductCard';
import { requestData } from '../services/axios';

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = (endpoint) => {
    try {
      const product = requestData(endpoint);
      setProducts(product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProducts('/customer/products');
  }, [products]);

  return (
    <section>
      <ul>
        {
          products.map((item, index) => (
            <li key={ index }>
              <ProductCard
                id={ item.id }
                image={ item.url_image }
                name={ item.name }
                price={ item.price.replace('.', ',') }
              />
            </li>
          ))
        }
      </ul>
    </section>
  );
}

export default Products;
