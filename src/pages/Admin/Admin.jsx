import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/ProductContext";
import { useStore } from "../../contexts/StoreContext";
import { useStock } from "../../contexts/StockContext";
import {
  Package,
  Users,
  Tag,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Store,
  UtensilsCrossed,
  AlertTriangle,
} from "lucide-react";
import "./Admin.css";

const Admin = () => {
  const { user, logout } = useAuth();
  const { products } = useProducts();
  const { stockItems } = useStock();
  const { isOpen, toggleStoreOpen } = useStore();
  const navigate = useNavigate();

  const lowStockCount = stockItems.filter(
    (item) => item.quantity <= item.minThreshold,
  ).length;

  // Auth is now handled by ProtectedRoute wrapper in AppRoutes
  // We can rely on user being present here

  return (
    <div className="container admin-page">
      <div className="admin-header">
        <div>
          <h1>Painel Administrativo</h1>
          <p>Bem-vindo, {user.name}</p>
        </div>
        <div
          className="header-actions"
          style={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
          <button
            onClick={toggleStoreOpen}
            className={`btn btn-sm ${isOpen ? "btn-success" : "btn-danger"}`}
            style={{
              backgroundColor: isOpen ? "#22c55e" : "#ef4444",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Store size={18} />
            {isOpen ? "Loja Aberta" : "Loja Fechada"}
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="btn btn-outline btn-sm"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="stats-grid">
        <div
          className="stat-card"
          onClick={() => navigate("/admin/pedidos")}
          style={{ cursor: "pointer" }}
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
          onClick={() => navigate("/admin/financeiro")}
          style={{ cursor: "pointer" }}
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
          onClick={() => navigate("/admin/cardapio")}
          style={{ cursor: "pointer" }}
        >
          <div className="stat-icon">
            <UtensilsCrossed size={24} />
          </div>
          <div className="stat-info">
            <h3>Itens do Cardápio</h3>
            <p className="stat-value">{products.length}</p>
          </div>
        </div>
        <div
          className="stat-card"
          onClick={() => navigate("/admin/estoque")}
          style={{
            cursor: "pointer",
            border: lowStockCount > 0 ? "1px solid #ef4444" : "none",
          }}
        >
          <div
            className="stat-icon"
            style={{ color: lowStockCount > 0 ? "#ef4444" : "inherit" }}
          >
            {lowStockCount > 0 ? (
              <AlertTriangle size={24} />
            ) : (
              <Package size={24} />
            )}
          </div>
          <div className="stat-info">
            <h3 style={{ color: lowStockCount > 0 ? "#ef4444" : "inherit" }}>
              {lowStockCount > 0 ? "Alertas de Estoque" : "Insumos em Estoque"}
            </h3>
            <p
              className="stat-value"
              style={{ color: lowStockCount > 0 ? "#ef4444" : "inherit" }}
            >
              {lowStockCount > 0
                ? `${lowStockCount} Baixos`
                : stockItems.length}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions / Navigation */}
      <div className="admin-actions-grid">
        <button
          className="admin-action-btn"
          onClick={() => navigate("/admin/cardapio")}
        >
          <UtensilsCrossed size={32} />
          <span>Itens do Cardápio</span>
        </button>
        <button
          className="admin-action-btn"
          onClick={() => navigate("/admin/estoque")}
        >
          <Package size={32} />
          <span>Controle de Estoque</span>
        </button>
        <button
          className="admin-action-btn"
          onClick={() => navigate("/admin/pedidos")}
        >
          <ShoppingBag size={32} />
          <span>Ver Pedidos</span>
        </button>
        <button
          className="admin-action-btn"
          onClick={() => navigate("/admin/financeiro")}
        >
          <Tag size={32} />
          <span>Financeiro</span>
        </button>
        <button
          className="admin-action-btn"
          onClick={() => navigate("/admin/metricas")}
        >
          <TrendingUp size={32} />
          <span>Métricas</span>
        </button>
      </div>

      <div className="admin-section">
        <div className="section-header-admin">
          <h2>Últimos Produtos</h2>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate("/admin/produtos/novo")}
          >
            Novo Produto
          </button>
        </div>
        <div className="admin-products-list">
          {products.slice(0, 5).map((product) => (
            <div key={product.id} className="admin-product-item">
              <img src={product.image} alt={product.name} />
              <div className="admin-product-info">
                <h4>{product.name}</h4>
                <p>R$ {product.price.toFixed(2)}</p>
              </div>
              <div className="admin-product-actions">
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() =>
                    navigate(`/admin/produtos/editar/${product.id}`)
                  }
                >
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
