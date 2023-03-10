import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundCard() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <h2 className="notfound-message">
        Ops! A página que você requisitou não foi encontrada!
      </h2>
      <div className="notfound-direction">
        Você pode retornar para a página inicial clicando
        <Link to="/" className="notfound-link">
          aqui
        </Link>
      </div>
    </div>
  );
}

export default NotFoundCard;
