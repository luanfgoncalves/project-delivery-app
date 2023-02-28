import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [disabledButton, setDisabledButton] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = () => {
    const check = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
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

  useEffect(() => {
    validateEmail();
    validateLogin();
  }, [email, password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  // funcao p conectar ao back
  const loginPost = async () => {
    await axios.post('http://localhost:3001/login',{email, password})
  }

  const handleClick = (e) => {
   
    if(e.target.name === "login-button"){
      loginPost()
    }
    if(e.target.name === "register-button" ){
      console.log('botão de login foi clicado');
    }
  };

  return (
    <div className="login-screen">
      <form className="login-form">
        <h1>Login</h1>
        <input
          className="login-input"
          type="email"
          name="email"
          value={ email }
          placeholder="email"
          data-testid="common_login__input-email"
          onChange={ handleChange }
        />
        <input
          className="login-input"
          type="password"
          name="password"
          value={ password }
          placeholder="senha"
          data-testid="common_login__input-password"
          onChange={ handleChange }
        />
        <button
          name ="login-button"
          class-name="login-button"
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disabledButton }
          onClick={ (e) => handleClick(e)}
        >
          Login
        </button>

        {!isEmailValid
        && <h4 data-testid="common_login__element-invalid-email"> E-mail Inválido </h4>}

        <button
          name = "register-button"
          class-name="register-button"
          type="submit"
          data-testid="common_login__button-register"
          onClick={ (e) => handleClick(e) }
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
