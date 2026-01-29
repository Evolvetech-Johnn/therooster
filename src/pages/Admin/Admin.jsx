import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { products } from '../../services/mockData';
import { Package, Users, Tag, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';
import './Admin.css';

const Admin = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Auth is now handled by ProtectedRoute wrapper in AppRoutes
    // We can rely on user being present here

    return (
        <div className="container admin-page">
            <div className="admin-header">
                <div>
                    <h1>Painel Administrativo</h1>
                    <p>Bem-vindo, {user.name}</p>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }} 
                  className="btn btn-outline btn-sm"
                >
                  Sair
                </button>
            </div>

            {/* Dashboard Stats */}
            <div className="stats-grid">
                <div 
                    className="stat-card" 
                    onClick={() => navigate('/admin/pedidos')}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="stat-icon">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Pedidos Hoje</h3>
                        <p className="stat-value">32</p>
                    </div>
                </div>
                <div 
                    className="stat-card highlight"
                    onClick={() => navigate('/admin/financeiro')}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="stat-icon">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Faturamento</h3>
                        <p className="stat-value">R$ 2.850,00</p>
                    </div>
                </div>
                <div 
                    className="stat-card"
                    onClick={() => navigate('/admin/estoque')}
                    style={{ cursor: 'pointer' }}
                >
                    <div className="stat-icon">
                        <Package size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Produtos Ativos</h3>
                        <p className="stat-value">{products.length}</p>
                    </div>
                </div>
                <div 
                    className="stat-card"
                    onClick={() => navigate('/admin/metricas')}
                    style={{ cursor: 'pointer' }}
                >
                     <div className="stat-icon">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Usuários Novos</h3>
                        <p className="stat-value">12</p>
                    </div>
                </div>
            </div>

            {/* Quick Actions / Navigation */}
            <div className="admin-actions-grid">
                <button 
                  className="admin-action-btn"
                  onClick={() => navigate('/admin/estoque')}
                >
                    <Package size={32} />
                    <span>Gerenciar Estoque</span>
                </button>
                <button 
                  className="admin-action-btn"
                  onClick={() => navigate('/admin/pedidos')}
                >
                    <ShoppingBag size={32} />
                    <span>Ver Pedidos</span>
                </button>
                <button 
                  className="admin-action-btn"
                  onClick={() => navigate('/admin/financeiro')}
                >
                    <Tag size={32} />
                    <span>Financeiro</span>
                </button>
                <button 
                  className="admin-action-btn"
                  onClick={() => navigate('/admin/metricas')}
                >
                    <TrendingUp size={32} />
                    <span>Métricas</span>
                </button>
            </div>

            <div className="admin-section">
                <div className="section-header-admin">
                    <h2>Últimos Produtos</h2>
                    <button className="btn btn-primary btn-sm">Novo Produto</button>
                </div>
                <div className="admin-products-list">
                    {products.slice(0, 5).map(product => (
                        <div key={product.id} className="admin-product-item">
                            <img src={product.image} alt={product.name} />
                            <div className="admin-product-info">
                                <h4>{product.name}</h4>
                                <p>R$ {product.price.toFixed(2)}</p>
                            </div>
                            <div className="admin-product-actions">
                                <button className="btn btn-outline btn-sm">Editar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Admin;
