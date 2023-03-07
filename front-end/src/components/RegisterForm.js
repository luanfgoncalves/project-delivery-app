import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeliveryAppContext from '../context/DeliveryAppContext';
import foodyLogo from '../images/foodyLogo.png';

function RegisterForm() {
  const { setUser } = useContext(DeliveryAppContext);
  const [disabledButton, setDisabledButton] = useState(true);
  const [IsUserDataValid, setIsUserDataValid] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //  estas variaveis servem para a validação de senha e nome de usuário
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
      const { data } = await axios.post('http://localhost:3001/register', { name: userName, email, password, role: 'customer' });
      // console.log(data);
      setUser({ ...data, role: 'customer' });

      navigate('/customer/products');
    } catch (error) {
      setIsUserDataValid(false);
      setUser({});
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
      <h4
        className="invalid"
        data-testid="common_register__element-invalid_register"
      >
        Dados Inválidos
      </h4>
    );
  }

  return (
    <>
      <img className="logo" src={ foodyLogo } alt="foody fody logo" />
      <form className="form-container">
        <h2 className="hello">Registre-se e tenha acesso ás melhores bebidas!</h2>
        <input
          className="form-input"
          type="text"
          name="userName"
          value={ userName }
          placeholder="Nome"
          data-testid="common_register__input-name"
          onChange={ handleChange }
        />
        <input
          className="form-input"
          type="email"
          name="email"
          value={ email }
          placeholder="Email"
          data-testid="common_register__input-email"
          onChange={ handleChange }
        />
        <input
          className="form-input"
          type="password"
          name="password"
          value={ password }
          placeholder="Senha"
          data-testid="common_register__input-password"
          onChange={ handleChange }
        />
        <button
          name="Register-button"
          class-name="front-button"
          type="submit"
          data-testid="common_register__button-register"
          disabled={ disabledButton }
          onClick={ handleClick }
        >
          Cadastro
        </button>

        {!IsUserDataValid && renderInvalidDataMsg()}

      </form>
    </>
  );
}

export default RegisterForm;
