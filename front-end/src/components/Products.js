import React, { useEffect, useState } from 'react';

import ProductCard from './ProductCard';
import Loading from './Loading';
import { requestData } from '../services/axios';

function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async (endpoint) => {
    try {
      const response = await requestData(endpoint);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      setProducts(await getProducts('/customer/products'));
    })();
  }, []);

  // if (products.length === 0) return <Loading />;
  if (!products) return (<Loading />);
  return (
    <section>
      <ul>
        { console.log(products) }
        {
          products.map((item, index) => (
            <li key={ index }>
              <ProductCard
                id={ item.id }
                image={ item.urImage }
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
