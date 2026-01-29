import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Minus, Plus, ArrowLeft, Star } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { products } from '../../services/mockData';
import { formatCurrency } from '../../utils/formatters';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);

  // Mock extras options
  const extrasOptions = [
    { id: 'bbq', name: 'Molho BBQ', price: 3.00 },
    { id: 'batata', name: 'Batata Frita Média', price: 8.00 },
    { id: 'bacon', name: 'Bacon Extra', price: 4.00 },
  ];

  const product = useMemo(() => {
      return products.find(p => p.id === parseInt(id));
  }, [id]);

  useEffect(() => {
    if (!product) {
        navigate('/catalogo');
    }
  }, [product, navigate]);

  const handleExtraChange = (extraId) => {
    setSelectedExtras(prev => {
        if (prev.includes(extraId)) {
            return prev.filter(id => id !== extraId);
        } else {
            return [...prev, extraId];
        }
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    const extras = extrasOptions.filter(e => selectedExtras.includes(e.id));
    const finalProduct = {
        ...product,
        // Create a unique ID for cart item based on extras to allow same product with different config
        cartId: `${product.id}-${selectedExtras.join('-')}`, 
        selectedExtras: extras,
        price: product.price + extras.reduce((acc, curr) => acc + curr.price, 0)
    };
    addToCart(finalProduct, quantity);
    navigate('/carrinho');
  };

  if (!product) return <div className="container" style={{padding:'2rem'}}>Carregando...</div>;

  const currentPrice = product.price + extrasOptions.filter(e => selectedExtras.includes(e.id)).reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="container product-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={24} /> Voltar
      </button>

      <div className="product-layout">
        <div className="product-img-large">
            <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-content">
            <h1>{product.name}</h1>
            <div className="rating">
                <Star size={16} fill="var(--color-primary)" stroke="none" />
                <Star size={16} fill="var(--color-primary)" stroke="none" />
                <Star size={16} fill="var(--color-primary)" stroke="none" />
                <Star size={16} fill="var(--color-primary)" stroke="none" />
                <Star size={16} fill="var(--color-primary)" stroke="none" />
                <span>(4.8)</span>
            </div>
            <p className="product-desc-large">{product.description}</p>
            <h2 className="product-price-large">{formatCurrency(currentPrice)}</h2>

            <div className="extras-section">
                <h3>Adicionar Extras</h3>
                <div className="extras-grid">
                    {extrasOptions.map(extra => {
                        const isSelected = selectedExtras.includes(extra.id);
                        return (
                            <div 
                                key={extra.id} 
                                className={`extra-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleExtraChange(extra.id)}
                            >
                                <div className="extra-card-header">
                                    <span className="extra-name">{extra.name}</span>
                                    {isSelected && <span className="check-icon">✓</span>}
                                </div>
                                <span className="extra-price">+ {formatCurrency(extra.price)}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="action-area">
                <div className="quantity-selector">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><Minus size={20}/></button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}><Plus size={20}/></button>
                </div>
                <button className="btn btn-primary add-to-cart-large" onClick={handleAddToCart}>
                    Adicionar • {formatCurrency(currentPrice * quantity)}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
