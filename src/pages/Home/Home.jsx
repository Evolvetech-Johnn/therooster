import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Drumstick, UtensilsCrossed, Sandwich, Package, Pizza, IceCream, Baby, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSlider from '../../components/home/HeroSlider';
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
                {/* 1. Hero Slider (McD Style) */}
                <HeroSlider />

                {/* 2. Quick Actions (McD Tiles) */}
                <section className="quick-actions-section">
                    <div className="quick-action-grid">
                        <Link to="/catalogo" className="quick-action-card qa-menu">
                            <div className="qa-content">
                                <h3>Peça e Retire</h3>
                                <p>Fure a fila e pegue no balcão</p>
                                <span className="qa-btn">Cardápio Completo</span>
                            </div>
                            <img src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80" alt="Cardápio" className="qa-img" />
                        </Link>

                        <Link to="/login" className="quick-action-card qa-account">
                            <div className="qa-content">
                                <h3>Clube Rooster</h3>
                                <p>Seus pedidos valem pontos!</p>
                                <span className="qa-btn">Minha Conta</span>
                            </div>
                            <img src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&q=80" alt="Conta" className="qa-img" />
                        </Link>
                    </div>
                </section>

                {/* 3. Categorias (Horizontal Scroll Strip) */}
                <section className="home-section categories-section">
                    <div className="section-header">
                        <h2>O que você quer comer hoje?</h2>
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

                {/* 4. Destaques / Cupom (Horizontal Scroll) */}
                <section className="home-section">
                    <div className="section-header">
                        <h2>⭐ Destaques da Semana</h2>
                    </div>
                    <motion.div className="best-sellers-list" variants={containerVariants}>
                        {bestSellers.map(product => (
                            <motion.div key={product.id} className={`best-seller-item ${product.category === 'bebidas' ? 'item-drink' : ''}`} variants={itemVariants}>
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
                        
                        {/* Fake Coupon Card in list for variety */}
                         <motion.div className="best-seller-item coupon-item" variants={itemVariants}>
                            <div className="bs-info">
                                <h4>🎟 Cupom: ROSTHER10</h4>
                                <p className="bs-price" style={{color: 'var(--color-success)'}}>10% OFF</p>
                            </div>
                         </motion.div>
                    </motion.div>
                </section>
            </div>
        </motion.div>
    );
};

export default Home;
