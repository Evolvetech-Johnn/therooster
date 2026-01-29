import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Home from '../pages/Home/Home';
import Catalog from '../pages/Catalog/Catalog';
import Cart from '../pages/Cart/Cart';
import Login from '../pages/Login/Login';
import Checkout from '../pages/Checkout/Checkout';
import Admin from '../pages/Admin/Admin';
import Register from '../pages/Register/Register';
import ProductDetails from '../pages/Product/ProductDetails';

import AdminLayout from '../pages/Admin/AdminLayout';
import OrderManager from '../pages/Admin/OrderManager';
import Financials from '../pages/Admin/Financials';
import Inventory from '../pages/Admin/Inventory';
import Metrics from '../pages/Admin/Metrics';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalog />} />
        <Route path="promocoes" element={<Promotions />} />
        <Route path="produto/:id" element={<ProductDetails />} />
        <Route path="carrinho" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Register />} />
        
        {/* Admin Routes - Protected */}
        <Route path="admin" element={
            <ProtectedRoute adminOnly={true}>
                <AdminLayout />
            </ProtectedRoute>
        }>
            <Route index element={<Admin />} /> {/* Default Dashboard */}
            <Route path="pedidos" element={<OrderManager />} />
            <Route path="financeiro" element={<Financials />} />
            <Route path="estoque" element={<Inventory />} />
            <Route path="metricas" element={<Metrics />} />
        </Route>

        {/* Fallback for unknown routes */}
        <Route path="*" element={<div className="container" style={{padding:'2rem'}}><h2>Página não encontrada</h2></div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
