import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';

function DetailsCheckout() {
  const {
    sellers,
    sellerID,
    totalPrice,
    // products,
    user,
  } = useContext(DeliveryAppContext);
  const [currentSeller, setCurrentSeller] = useState('');
  const [address, setAdress] = useState('');
  const [number, setNumber] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentSeller(sellerID);
  }, [sellerID]);

  const handleChange = ({ target: { value } }) => {
    setCurrentSeller(value);
  };

  const submitButton = async (e) => {
    e.preventDefault();

    const checkout = {
      userId: user.id, // ver como esta buscando no header
      sellerId: currentSeller,
      totalPrice,
      deliveryAddress: address,
      deliveryNumber: Number(number),
      status: 'Pendente',
    };

    // Enviar os dados para o banco
    await axios.post('http://localhost:3001/order', checkout);

    navigate('/customer/order');
  };

  return (
    <div>
      <form>
        <label htmlFor="select-seller">
          P. Vendedora Responsável:
          <select
            id="select-seller"
            name="select-seller"
            data-testid="customer_checkout__select-seller"
            onChange={ (e) => handleChange(e) }
          >
            {sellers.map((seller) => (
              <option
                key={ seller.name }
                value={ seller.id }
              >
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="input-adress">
          Endereço:
          <input
            type="text"
            name="input-adress"
            placeholder="Ex: Travessa Terceira da Castanheira, Bairro Muruci"
            data-testid="customer_checkout__input-address"
            value={ address }
            onChange={ ({ target }) => setAdress(target.value) }
          />
        </label>
        <br />
        <label htmlFor="input-adress-number">
          Número:
          <input
            type="text"
            name="input-adress-number"
            placeholder="Ex: 198"
            data-testid="customer_checkout__input-address-number"
            value={ number }
            onChange={ ({ target }) => setNumber(target.value) }
          />
        </label>
        <br />
        <button
          name="submit-order-button"
          class-name="submit-order-button"
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ (e) => submitButton(e) }
        >
          FINALIZAR PEDIDO
        </button>
      </form>
    </div>
  );
}

export default DetailsCheckout;
