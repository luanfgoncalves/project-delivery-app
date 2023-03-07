import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';
import foodyLogo from '../images/foodyLogo.png';

function LoginForm() {
  const { setUser } = useContext(DeliveryAppContext);
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const ID01 = 'common_login__element-invalid-email';

  const validateEmail = () => {
    const check = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (check.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const validateLogin = () => {
    const minNumber = 6;
    if (password.length >= minNumber && isEmailValid === true) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  const loginRoute = {
    administrator: '/admin/manage',
    seller: '/seller/orders',
    customer: '/customer/products',
  };

  useEffect(() => {
    validateEmail();
    validateLogin();
  }, [email, password]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.role) {
      navigate(`${loginRoute[user.role]}`);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const loginPost = async () => {
    try {
      console.log('loginPost foi chamada');
      const { data } = await axios.post('http://localhost:3001/login', { email, password });

      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));

      navigate(`${loginRoute[data.role]}`);
    } catch (error) {
      setIsEmailValid(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'login-button') {
      console.log('botão de login foi clicado');
      loginPost();
    }
    if (e.target.name === 'register-button') {
      console.log('botão de registro foi clicado');
      navigate('/register');
    }
  };

  return (
    <>
      <img className="logo" src={ foodyLogo } alt="foody fody logo" />
      <form className="form-container">
        <h1 className="hello">Entre e peça já!</h1>
        <input
          className="form-input"
          type="email"
          name="email"
          value={ email }
          placeholder="Email"
          data-testid="common_login__input-email"
          onChange={ handleChange }
        />
        <input
          className="form-input"
          type="password"
          name="password"
          value={ password }
          placeholder="Senha"
          data-testid="common_login__input-password"
          onChange={ handleChange }
        />
        <button
          name="login-button"
          className="front-button"
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disabledButton }
          onClick={ handleClick }
        >
          Login
        </button>

        {!isEmailValid
        && <h4 className="invalid" data-testid={ ID01 }> E-mail Inválido </h4>}

        <button
          name="register-button"
          className="front-button"
          type="submit"
          data-testid="common_login__button-register"
          onClick={ handleClick }
        >
          Registre-se
        </button>
      </form>
    </>
  );
}

export default LoginForm;
