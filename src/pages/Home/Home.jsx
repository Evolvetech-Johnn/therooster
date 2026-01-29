import React from 'react';
import { Link } from 'react-router-dom';
import { Drumstick, UtensilsCrossed, Sandwich, Package, Pizza, IceCream, Baby, Coffee, Flame, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSlider from '../../components/home/HeroSlider';
import { products } from '../../services/mockData';
import { formatCurrency } from '../../utils/formatters';
import './Home.css';

const Home = () => {
    
    // Define OnePage Sections based on User Request
    const sections = [
        { 
            id: 'mais-pedidos', 
            title: 'Os Mais Pedidos', 
            icon: <Star size={20} />,
            products: products.filter(p => p.isBestSeller) // Needs isBestSeller in mockData
        },
        { 
            id: 'ofertas', 
            title: 'O Galo Ficou Doido - Super Ofertas', 
            icon: <Flame size={20} />,
            products: products.filter(p => p.category === 'ofertas')
        },
        { 
            id: 'lanches', 
            title: 'Lanches Premium', 
            icon: <Sandwich size={20} />,
            products: products.filter(p => p.category === 'lanches')
        },
        { 
            id: 'combos', 
            title: 'Combos Premium', 
            icon: <UtensilsCrossed size={20} />,
            products: products.filter(p => p.category === 'combos')
        },
        { 
            id: 'baldes', 
            title: 'Baldes de Frango', 
            icon: <Drumstick size={20} />,
            products: products.filter(p => p.category === 'baldes')
        },
        { 
            id: 'porcoes', 
            title: 'Porções', 
            icon: <Package size={20} />,
            products: products.filter(p => p.category === 'porcoes')
        },
        { 
            id: 'molhos', 
            title: 'Molhos Adicionais', 
            icon: <Pizza size={20} />,
            products: products.filter(p => p.category === 'molhos')
        },
        { 
            id: 'bebidas', 
            title: 'Bebidas Geladas', 
            icon: <Coffee size={20} />,
            products: products.filter(p => p.category === 'bebidas')
        },
        { 
            id: 'sobremesas', 
            title: 'Sobremesas', 
            icon: <IceCream size={20} />,
            products: products.filter(p => p.category === 'sobremesas')
        },
        { 
            id: 'kids', 
            title: 'Kids', 
            icon: <Baby size={20} />,
            products: products.filter(p => p.category === 'kids')
        }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Offset for sticky header
            const headerOffset = 140; 
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
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
        <div className="home-page">
            <div className="container">
                {/* 1. Hero Slider */}
                <HeroSlider />

                {/* 2. Sticky Category Nav */}
                <div className="sticky-nav-container">
                    <div className="category-nav">
                        {sections.map(section => (
                            <button 
                                key={section.id} 
                                onClick={() => scrollToSection(section.id)}
                                className="cat-nav-btn"
                            >
                                {section.icon}
                                <span>{section.title.split(' - ')[0]}</span> {/* Shorten title for nav */}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Render Sections */}
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="menu-sections"
                >
                    {sections.map(section => (
                        section.products.length > 0 && (
                            <section key={section.id} id={section.id} className="home-section menu-section">
                                <div className="section-header">
                                    <h2>{section.title}</h2>
                                </div>
                                <div className="best-sellers-list">
                                    {section.products.map(product => (
                                        <motion.div key={product.id} className={`best-seller-item ${product.category === 'bebidas' ? 'item-drink' : ''}`} variants={itemVariants}>
                                            <div className="bs-image">
                                                <img src={product.image} alt={product.name} />
                                            </div>
                                            <div className="bs-info">
                                                <h4>{product.name}</h4>
                                                <p className="bs-description">{product.description}</p>
                                                <div className="bs-footer">
                                                    <p className="bs-price">
                                                        {product.originalPrice && <span className="original-price">{formatCurrency(product.originalPrice)}</span>}
                                                        {formatCurrency(product.price)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Link to={`/produto/${product.id}`} className="btn btn-outline btn-sm btn-icon" aria-label={`Ver detalhes de ${product.name}`}>
                                                +
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
