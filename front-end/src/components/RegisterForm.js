import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = () => {
    const check = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (check.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const validateRegister = () => {
    const minNumber = 6;
    if (password.length >= minNumber && isEmailValid === true) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    validateEmail();
    validateRegister();
  }, [email, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const RegisterPost = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/Register', { email, password });
      console.log(data);
    } catch (error) {
      setIsEmailValid(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'Register-button') {
      RegisterPost();
    }
  };

  return (
    <div className="Register-screen">
      <form className="Register-form">
        <h1>Register</h1>
        <input
          className="Register-input"
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="common_Register__input-email"
          onChange={ handleChange }
        />
        <input
          className="Register-input"
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="common_Register__input-email"
          onChange={ handleChange }
        />
        <input
          className="Register-input"
          type="password"
          name="password"
          value={ password }
          placeholder="senha"
          data-testid="common_Register__input-password"
          onChange={ handleChange }
        />
        <button
          name="Register-button"
          class-name="Register-button"
          type="submit"
          data-testid="common_Register__button-Register"
          disabled={ disabledButton }
          onClick={ handleClick }
        >
          Cadastro
        </button>

        {!isEmailValid
        && <h7 data-testid="common_Register__element-invalid-email">Dados Inválidos</h7>}

      </form>
    </div>
  );
}

export default RegisterForm;
