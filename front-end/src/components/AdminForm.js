import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import DeliveryAppContext from '../context/DeliveryAppContext';

function AdminForm() {
  const { setUser } = useContext(DeliveryAppContext);
  const [disabledButton, setDisabledButton] = useState(true);
  const [IsUserDataValid, setIsUserDataValid] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

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

  const addNewUser = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/admin/manage', { name: userName, email, password, role });

      setUser({ ...data });
    } catch (error) {
      setIsUserDataValid(false);
      setUser({});
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (e.target.name === 'Register-button') {
      addNewUser();
    }
  };

  function renderInvalidDataMsg() {
    return (
      <h4 data-testid="common_register__element-invalid_register">Dados Inválidos</h4>
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
          placeholder="Nome e sobrenome"
          data-testid="admin_manage__input-name"
          onChange={ handleChange }
        />
        <input
          className="Register-input"
          type="email"
          name="email"
          value={ email }
          placeholder="seu-email@site.com.br"
          data-testid="admin_manage__input-email"
          onChange={ handleChange }
        />
        <input
          className="Register-input"
          type="password"
          name="password"
          value={ password }
          placeholder="********"
          data-testid="admin_manage__input-password"
          onChange={ handleChange }
        />
        <select
          name="role"
          data-testid="admin_manage__select-role"
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="seller">Vendedor</option>
          <option value="customer">Cliente</option>
        </select>
        <button
          name="Register-button"
          class-name="Register-button"
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ disabledButton }
          onClick={ handleClick }
        >
          Cadastrar
        </button>

        {!IsUserDataValid && renderInvalidDataMsg()}

      </form>
    </div>
  );
}

export default AdminForm;
