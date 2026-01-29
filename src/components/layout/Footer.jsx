import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>The Rooster</h2>
            <p>O melhor frango no balde da cidade.</p>
          </div>
          <div className="footer-links">
            <h3>Links Úteis</h3>
            <ul>
              <li><Link to="/catalogo">Cardápio</Link></li>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/promocoes">Promoções</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contato</h3>
            <p>Rua Exemplo, 123</p>
            <p>(11) 99999-9999</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Rooster. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
