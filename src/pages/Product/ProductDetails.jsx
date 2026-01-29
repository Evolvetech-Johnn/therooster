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

  // Mock extras options - Expanded for Sauces logic
  const extrasOptions = [
    { id: 'bbq', name: 'Molho BBQ', price: 3.00, type: 'sauce' },
    { id: 'alho', name: 'Molho de Alho', price: 3.00, type: 'sauce' },
    { id: 'rose', name: 'Molho Rosé', price: 3.00, type: 'sauce' },
    { id: 'verde', name: 'Molho Verde', price: 3.00, type: 'sauce' },
    { id: 'batata', name: 'Batata Frita Média', price: 8.00, type: 'side' },
    { id: 'bacon', name: 'Bacon Extra', price: 4.00, type: 'addon' },
  ];

  const product = useMemo(() => {
      return products.find(p => p.id === parseInt(id));
  }, [id]);

  useEffect(() => {
    if (!product) {
        navigate('/catalogo');
    }
  }, [product, navigate]);

  // Logic: Extract free sauce count from description
  const maxFreeSauces = useMemo(() => {
      if (!product) return 0;
      const match = product.description.match(/(\d+)\s*molhos/i);
      return match ? parseInt(match[1]) : 0;
  }, [product]);

  const handleExtraChange = (extraId) => {
    setSelectedExtras(prev => {
        if (prev.includes(extraId)) {
            return prev.filter(id => id !== extraId);
        } else {
            return [...prev, extraId];
        }
    });
  };

  // Logic: Calculate total price with free sauces deduction
  const calculateTotalPrice = () => {
      if (!product) return 0;

      let totalPrice = product.price;
      let freeSaucesUsed = 0;

      // Ensure consistent order for calculation (e.g., sauces processed)
      // Actually, we just need to identify which selected items are sauces
      const selectedItems = extrasOptions.filter(e => selectedExtras.includes(e.id));
      
      selectedItems.forEach(item => {
          if (item.type === 'sauce') {
              if (freeSaucesUsed < maxFreeSauces) {
                  // It's free!
                  freeSaucesUsed++;
              } else {
                  totalPrice += item.price;
              }
          } else {
              totalPrice += item.price;
          }
      });

      return totalPrice;
  };

  const currentPrice = calculateTotalPrice();

  const handleAddToCart = () => {
    if (!product) return;
    const extras = extrasOptions.filter(e => selectedExtras.includes(e.id));
    
    // Recalculate which specific extras were free for the cart record? 
    // For simplicity, we just pass the selected extras and the calculated unit price.
    // Or closer manipulation:
    
    const finalProduct = {
        ...product,
        cartId: `${product.id}-${selectedExtras.join('-')}`, 
        selectedExtras: extras,
        price: currentPrice
    };
    addToCart(finalProduct, quantity);
    navigate('/carrinho');
  };

  if (!product) return <div className="container" style={{padding:'2rem'}}>Carregando...</div>;

  // Render Logic helpers
  const getExtraPriceDisplay = (extra) => {
      if (extra.type !== 'sauce') return `+ ${formatCurrency(extra.price)}`;
      
      // Determine if this specific sauce IS currently one of the free ones?
      // Logic: Count how many sauces are selected BEFORE this one effectively?
      // Or simply: If we haven't reached the limit of selected sauces, show "Grátis" for the next available?
      // Better UI: 
      // Count total selected sauces. 
      // If isSelected: is it within the first N selected? -> GRÁTIS. Else Price.
      // If NOT selected: Do we have free slots left? -> GRÁTIS. Else Price.
      
      const selectedSauces = extrasOptions.filter(e => selectedExtras.includes(e.id) && e.type === 'sauce');
      const isSelected = selectedExtras.includes(extra.id);
      const selectedSauceCount = selectedSauces.length;

      if (isSelected) {
          // Find index of this sauce in selected list
          const index = selectedSauces.findIndex(s => s.id === extra.id);
          if (index < maxFreeSauces) return <span className="free-badge">Grátis</span>;
      } else {
          // If not selected, will it be free if I select it?
          if (selectedSauceCount < maxFreeSauces) return <span className="free-badge">Grátis</span>;
      }

      return `+ ${formatCurrency(extra.price)}`;
  };

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

            {/* Extras Section - HIDDEN for BEBIDAS */}
            {product.category !== 'bebidas' && (
                <div className="extras-section">
                    <h3>Adicionar Extras {maxFreeSauces > 0 && <span className="highlight-free">({maxFreeSauces} Molhos Grátis)</span>}</h3>
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
                                    <span className="extra-price">{getExtraPriceDisplay(extra)}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

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
