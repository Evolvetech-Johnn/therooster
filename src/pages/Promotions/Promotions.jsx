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
            <section className="promo-hero" aria-label="Promoções em destaque">
                <div className="container promo-hero-content">
                    <motion.span 
                        className="badge-pulse" 
                        initial={{ scale: 0.8 }} 
                        animate={{ scale: 1 }} 
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                    >
                        Ofertas Limitadas
                    </motion.span>
                    <h1>Promoções Imperdíveis</h1>
                    <p>Os melhores combos com preços que você só encontra aqui.</p>
                </div>
            </section>

            <section className="container promo-grid-container" aria-label="Lista de produtos em promoção">
                <div className="promo-grid">
                    {promotions.map(product => (
                        <motion.article key={product.id} className="promo-card" variants={itemVariants}>
                            <div className="promo-image-container">
                                <img 
                                    src={product.image} 
                                    alt={`Foto de ${product.name}`} 
                                    loading="lazy"
                                />
                                {product.originalPrice && (
                                    <span className="discount-badge" aria-label={`${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% de desconto`}>
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>
                            <div className="promo-details">
                                <div className="promo-header">
                                    <h3>{product.name}</h3>
                                    <div className="rating" aria-label="Avaliação 4.9 de 5 estrelas">
                                        <Star size={14} fill="#FFC107" stroke="none" /> 4.9
                                    </div>
                                </div>
                                <p className="promo-desc">{product.description}</p>
                                <div className="promo-footer">
                                    <div className="price-block">
                                        {product.originalPrice && (
                                            <span className="old-price" aria-label={`Preço original: ${formatCurrency(product.originalPrice)}`}>
                                                {formatCurrency(product.originalPrice)}
                                            </span>
                                        )}
                                        <span className="new-price" aria-label={`Preço promocional: ${formatCurrency(product.price)}`}>
                                            {formatCurrency(product.price)}
                                        </span>
                                    </div>
                                    <Link 
                                        to={`/produto/${product.id}`} 
                                        className="btn-add"
                                        aria-label={`Comprar ${product.name}`}
                                    >
                                        Eu Quero <ShoppingBag size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </motion.div>
    );
};

export default Promotions;
