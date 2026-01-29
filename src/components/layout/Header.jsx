import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import './Header.css';

const logo = '/logo.png';

import { AnimatePresence, motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
// ... existing imports

const Header = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        {/* ... Logo ... */}
        <div className="header-logo">
          <Link to="/">
            <img src={logo} alt="The Rooster - Frango no Balde" className="logo-img" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/catalogo" className="nav-link">Cardápio</Link>
          <Link to="/promocoes" className="nav-link">Promoções</Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link to="/login" className="action-btn" aria-label="Login">
            <User size={24} />
          </Link>
          <Link to="/carrinho" className="action-btn cart-btn" aria-label="Carrinho">
            <ShoppingBag size={24} />
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
          <button 
            className="mobile-menu-btn" 
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="mobile-nav-links">
              <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/catalogo" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Cardápio</Link>
              <Link to="/promocoes" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Promoções</Link>
              <Link to="/login" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Minha Conta</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
