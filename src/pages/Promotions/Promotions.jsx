import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { products } from '../../services/mockData';
import { formatCurrency } from '../../utils/formatters';
import { Star, Flame, Clock, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Promotions.css';

const Promotions = () => {
    // Filter products that are combos or have a discount/originalPrice
    const promotions = useMemo(() => {
        return products.filter(p => p.category === 'combos' || p.originalPrice);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div 
            className="promotions-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="promo-hero">
                <div className="container promo-hero-content">
                    <motion.span className="badge-pulse" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}>Ofertas Limitadas</motion.span>
                    <h1>Promoções Imperdíveis</h1>
                    <p>Os melhores combos com preços que você só encontra aqui.</p>
                </div>
            </div>

            <div className="container promo-grid-container">
                <div className="promo-grid">
                    {promotions.map(product => (
                        <motion.div key={product.id} className="promo-card" variants={itemVariants}>
                            <div className="promo-image-container">
                                <img src={product.image} alt={product.name} />
                                {product.originalPrice && (
                                    <span className="discount-badge">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>
                            <div className="promo-details">
                                <div className="promo-header">
                                    <h3>{product.name}</h3>
                                    <div className="rating">
                                        <Star size={14} fill="#FFC107" stroke="none" /> 4.9
                                    </div>
                                </div>
                                <p className="promo-desc">{product.description}</p>
                                <div className="promo-footer">
                                    <div className="price-block">
                                        {product.originalPrice && <span className="old-price">{formatCurrency(product.originalPrice)}</span>}
                                        <span className="new-price">{formatCurrency(product.price)}</span>
                                    </div>
                                    <Link to={`/produto/${product.id}`} className="btn-add">
                                        Eu Quero <ShoppingBag size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Promotions;
