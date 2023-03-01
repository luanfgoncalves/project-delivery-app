import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';

function RegisterForm() {
  const { setUserRole } = useContext(DeliveryAppContext);
  const [disabledButton, setDisabledButton] = useState(true);
  const [IsUserDataValid, setIsUserDataValid] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //  estas variaveis servem para a valçidação de senha e nome de usuário
  const minNumber = 6;
  const minUserName = 12;

  const validateUserData = () => {
    const check = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (check.test(email) && userName.length >= minUserName) {
      setIsUserDataValid(true);
    } else {
      setIsUserDataValid(false);
    }
  };

  const validateRegister = () => {
    if (password.length >= minNumber
      && IsUserDataValid === true) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    validateUserData();
    validateRegister();
  }, [email, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'userName') {
      setUserName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const RegisterPost = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/register', { userName, email, password });
      if (data.role === 'customer') {
        setUserRole('customer');
        navigate('/customer/products');
      }
      if (data.role === 'seller') {
        setUserRole('seller');
        navigate('/seller/orders');
      }
      if (data.role === 'admin') {
        setUserRole('admin');
        navigate('/admin/manage');
      }
    } catch (error) {
      setIsUserDataValid(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'Register-button') {
      RegisterPost();
    }
  };

  function renderInvalidDataMsg() {
    return (
      <h7 data-testid="common_register__element-invalid_register">Dados Inválidos</h7>
    );
  }

  return (
    <div className="Register-screen">
      <form className="Register-form">
        <h1>Register</h1>
        <input
          className="Register-input"
          type="text"
          name="userName"
          value={ userName }
          placeholder="User Name"
          data-testid="common_register__input-name"
          onChange={ handleChange }
        />
        <input
          className="Register-input"
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="common_register__input-email"
          onChange={ handleChange }
        />
        <input
          className="Register-input"
          type="password"
          name="password"
          value={ password }
          placeholder="senha"
          data-testid="common_register__input-password"
          onChange={ handleChange }
        />
        <button
          name="Register-button"
          class-name="Register-button"
          type="submit"
          data-testid="common_register__button-register"
          disabled={ disabledButton }
          onClick={ handleClick }
        >
          Cadastro
        </button>

        {!IsUserDataValid && renderInvalidDataMsg()}

      </form>
    </div>
  );
}

export default RegisterForm;
