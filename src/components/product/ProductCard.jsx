import React from 'react';
import { Link } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';

const ProductCard = ({ product, onZoom }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`best-seller-item ${product.category === "bebidas" ? "item-drink" : ""}`}
    >
      <div className="bs-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {onZoom && (
          <button
            className="zoom-btn"
            onClick={() => onZoom(product)}
            aria-label="Ampliar imagem"
          >
            <Maximize2 size={20} />
          </button>
        )}
      </div>
      <div className="bs-info">
        <h4>{product.name}</h4>
        <p className="bs-description">{product.description}</p>
        <div className="bs-footer">
          <p className="bs-price">
            {product.originalPrice && (
              <span className="original-price">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            {formatCurrency(product.price)}
          </p>
        </div>
      </div>
      <Link
        to={`/produto/${product.id}`}
        className="btn btn-outline btn-sm btn-icon"
        aria-label={`Ver detalhes de ${product.name}`}
      >
        +
      </Link>
    </motion.div>
  );
};

export default ProductCard;
