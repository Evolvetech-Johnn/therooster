import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { products, categories } from '../../services/mockData';
import './Catalog.css';

const Catalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'todos' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container catalog-page">
      <div className="catalog-header">
        <h1>Cardápio</h1>
        <p>Escolha o seu pedido e aproveite!</p>
        <div className="search-bar">
            {/* Simple search input */}
            <input 
                type="text" 
                placeholder="🔎 Buscar produto..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="category-filters">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/produto/${product.id}`} className="product-link">
                <div className="product-image">
                <img src={product.image} alt={product.name} />
                </div>
            </Link>
            <div className="product-info">
              <Link to={`/produto/${product.id}`}>
                  <h3>{product.name}</h3>
              </Link>
              <p className="product-desc">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => addToCart(product)}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
