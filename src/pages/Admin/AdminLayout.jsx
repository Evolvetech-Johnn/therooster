import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  DollarSign,
  Package,
  BarChart2,
  LogOut,
  UtensilsCrossed,
} from "lucide-react";
import "./Admin.css"; // Reusing/Extending Admin CSS

const AdminLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    {
      path: "/admin/pedidos",
      icon: <ShoppingBag size={20} />,
      label: "Pedidos",
    },
    {
      path: "/admin/financeiro",
      icon: <DollarSign size={20} />,
      label: "Financeiro",
    },
    {
      path: "/admin/cardapio",
      icon: <UtensilsCrossed size={20} />,
      label: "Itens do Cardápio",
    },
    {
      path: "/admin/estoque",
      icon: <Package size={20} />,
      label: "Estoque (Insumos)",
    },
    {
      path: "/admin/metricas",
      icon: <BarChart2 size={20} />,
      label: "Métricas",
    },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-link logout-btn">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
