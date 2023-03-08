import React, { useEffect, useState, useContext } from 'react';
import DeliveryAppContext from '../context/DeliveryAppContext';
import { postData, getAllUsers, deleteData } from '../services/axios';

function AdminForm() {
  const { user, setUser } = useContext(DeliveryAppContext);
  const [disabledButton, setDisabledButton] = useState(true);
  const [IsUserDataValid, setIsUserDataValid] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);

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

  // add novo user no DB
  const addNewUser = async () => {
    try {
      const endpoint = '/admin/manage';
      const data = { name: userName, email, password, role };
      await postData(endpoint, data);
      setUser({ ...data });
    } catch (error) {
      console.error(error);
      setIsUserDataValid(false);
      setUser({});
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    await addNewUser();
  };

  const deleteUser = async (id) => {
    await deleteData(id);
    setIsDeleted(!isDeleted);
  };

  const getUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers.data);
  };

  useEffect(() => {
    getUsers();
  }, [user, isDeleted]);

  function renderInvalidDataMsg() {
    return (
      <h4 data-testid="admin_manage__element-invalid-register">Dados Inválidos</h4>
    );
  }

  return (
    <>
      <form autoComplete="off" className="adm-form">
        <h1>Cadastrar novo usuário</h1>
        <div className="adm-form-input-container">
          <input
            className="adm-form-input"
            type="text"
            name="userName"
            value={ userName }
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            onChange={ handleChange }
          />
          <input
            className="adm-form-input"
            type="email"
            name="email"
            value={ email }
            placeholder="seu-email@site.com.br"
            data-testid="admin_manage__input-email"
            onChange={ handleChange }
          />
          <input
            className="adm-form-input"
            type="password"
            name="password"
            value={ password }
            placeholder="********"
            data-testid="admin_manage__input-password"
            onChange={ handleChange }
          />
          <select
            className="adm-form-select"
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ ({ target }) => setRole(target.value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
          <button
            name="Register-button"
            className="adm-add-button"
            type="submit"
            data-testid="admin_manage__button-register"
            disabled={ disabledButton }
            onClick={ handleClick }
          >
            Cadastrar
          </button>

          {!IsUserDataValid && renderInvalidDataMsg()}
        </div>
      </form>

      <table className="table">
        <thead className="text-center">
          <tr>
            <th className="adm-td-id">Item</th>
            <th className="adm-td-name">Name</th>
            <th className="adm-td-email">Email</th>
            <th className="adm-td-role">Role</th>
            <th className="adm-td-delete">Delete</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((elem, index = 1) => (
            <tr key={ index }>
              <td
                className="adm-td-id"
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                className="adm-td-name"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {elem.name}
              </td>
              <td
                className="adm-td-email"
                data-testid={
                  `admin_manage__element-user-table-email-${index}`
                }
              >
                {elem.email}
              </td>
              <td
                className="adm-td-role"
                data-testid={
                  `admin_manage__element-user-table-role-${index}`
                }
              >
                {elem.role}
              </td>
              <td className="adm-td-delete">
                <button
                  className="adm-remove-button"
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                  type="button"
                  onClick={ () => deleteUser(elem.id) }
                >
                  REMOVE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminForm;
