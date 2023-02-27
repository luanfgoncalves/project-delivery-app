import React from 'react';

// NOta: criar handlechange para validação de dados de login

function loginForm() {
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
          class-name="login-button"
          type="submit"
          data-testid="common_login__button-login"
          disabled={ disabledButton }
          onClick={ handleClick }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default loginForm;
