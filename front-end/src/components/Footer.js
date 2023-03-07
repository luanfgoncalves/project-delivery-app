import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <Link to="/about" className="footer-link">
        Desenvolvido por Luan Filipe, Bianca Oura, Anderson Silva,
        Andressa Ribeiro e Ana Beatriz.
      </Link>
    </footer>
  );
}

export default Footer;
