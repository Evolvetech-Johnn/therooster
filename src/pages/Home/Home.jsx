import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Drumstick, UtensilsCrossed, Sandwich, Package, Pizza, IceCream, Baby, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { products, categories } from '../../services/mockData';

import { formatCurrency } from '../../utils/formatters';
import './Home.css';

const Home = () => {
    
    // Mock data for UI
    const bestSellers = products.slice(0, 4);
    const mainCategories = categories.filter(c => c.id !== 'todos');
    const promoProduct = products.find(p => p.id === 19) || products[0];

    // Category Icons Map
    const getCategoryIcon = (id) => {
        switch(id) {
            case 'baldes': return <Drumstick size={32} />;
            case 'lanches': return <Sandwich size={32} />;
            case 'combos': return <UtensilsCrossed size={32} />;
            case 'porcoes': return <Package size={32} />;
            case 'molhos': return <Pizza size={32} />; // Using Pizza as generic food/extra icon or Utensils
            case 'bebidas': return <Coffee size={32} />; // Coffee often used for drinks logic, or maybe Beer? let's stick to generic drink if avail or Coffee/Cup
            case 'sobremesas': return <IceCream size={32} />;
            case 'kids': return <Baby size={32} />;
            default: return <UtensilsCrossed size={32} />;
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1 
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <motion.div 
            className="home-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container">
                {/* 1. Banner Promocional */}
                <motion.section className="promo-banner" variants={itemVariants}>
                    <div className="promo-content">
                        <span className="promo-badge">Oferta do Dia</span>
                        <h2>{promoProduct ? promoProduct.name : 'Combo Família'}</h2>
                        <p>{promoProduct ? promoProduct.description : '20% OFF para matar a fome da galera!'}</p>
                        <Link to={promoProduct ? `/produto/${promoProduct.id}` : '/catalogo'} className="btn btn-primary btn-cta" aria-label={`Pedir ${promoProduct ? promoProduct.name : 'Combo'} agora`}>
                            PEDIR AGORA
                        </Link>
                    </div>
                    <div className="promo-image">
                       <img 
                           src={promoProduct ? promoProduct.image : "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80"} 
                           alt={promoProduct ? promoProduct.name : "Combo Família"} 
                       />
                    </div>
                </motion.section>

                {/* 2. Categorias */}
                <section className="home-section">
                    <div className="section-header">
                        <h2>Categorias</h2>
                        <Link to="/catalogo" className="see-all" aria-label="Ver todas as categorias">Ver todas <ArrowRight size={16}/></Link>
                    </div>
                    <motion.div className="categories-grid" variants={containerVariants}>
                        {mainCategories.map(cat => (
                            <motion.div key={cat.id} variants={itemVariants}>
                                <Link to={`/catalogo?cat=${cat.id}`} className="category-card" aria-label={`Categoria ${cat.name}`}>
                                    <div className="cat-icon">{getCategoryIcon(cat.id)}</div>
                                    <span>{cat.name}</span>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* 3. Mais Vendidos */}
                <section className="home-section">
                    <div className="section-header">
                        <h2>⭐ Mais Vendidos</h2>
                    </div>
                    <motion.div className="best-sellers-list" variants={containerVariants}>
                        {bestSellers.map(product => (
                            <motion.div key={product.id} className="best-seller-item" variants={itemVariants}>
                                <div className="bs-image">
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <div className="bs-info">
                                    <h4>{product.name}</h4>
                                    <p className="bs-price">{formatCurrency(product.price)}</p>
                                    <div className="bs-rating">
                                        <Star size={12} fill="var(--color-primary)" stroke="none" /> 4.8
                                    </div>
                                </div>
                                <Link to={`/produto/${product.id}`} className="btn btn-outline btn-sm btn-icon" aria-label={`Ver detalhes de ${product.name}`}>
                                    +
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* 4. Cupom do Dia */}
                <motion.section className="coupon-banner" variants={itemVariants} whileHover={{ scale: 1.02 }}>
                   <div className="coupon-content">
                       <h3>🎟 Cupom do Dia</h3>
                       <div className="coupon-code">ROSTHER10</div>
                       <p>10% de desconto em qualquer pedido</p>
                   </div>
                </motion.section>
            </div>
        </motion.div>
    );
};

export default Home;
