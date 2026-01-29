import React, { useState } from "react";
import { mockOrders } from "../../services/mockData";
import { Clock, CheckCircle, Truck, AlertCircle, ShoppingBag } from 'lucide-react';

const OrderManager = () => {
  const [orders, setOrders] = useState(mockOrders);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Recebido":
        return "#3b82f6"; // Blue
      case "Preparando":
        return "#f59e0b"; // Amber
      case "Pronto":
        return "#10b981"; // Green
      default:
        return "#6b7280";
    }
  };

  return (
    <div>
      <div className="section-header-admin">
        <h1>Gerenciamento de Pedidos</h1>
      </div>
      
      <div className="orders-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
        {orders.map((order) => (
            <div key={order.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.id}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <span style={{ 
                            background: order.type === 'delivery' ? '#3b82f620' : '#8b5cf620', 
                            color: order.type === 'delivery' ? '#3b82f6' : '#8b5cf6',
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem'
                        }}>
                            {order.type === 'delivery' ? <Truck size={14} /> : <ShoppingBag size={14} />}
                            {order.type === 'delivery' ? 'Entrega' : 'Retirada'}
                        </span>
                        <span style={{ 
                            background: getStatusColor(order.status) + '20', 
                            color: getStatusColor(order.status),
                            padding: '0.25rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            fontWeight: '700'
                        }}>{order.status}</span>
                    </div>
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{order.customer}</p>
                    <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{order.items}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>R$ {order.total.toFixed(2)}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button 
                            onClick={() => updateStatus(order.id, 'Preparando')}
                            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' }}
                            title="Preparando"
                        >
                            <Clock size={18} color="#f59e0b" />
                        </button>
                        <button 
                            onClick={() => updateStatus(order.id, 'Pronto')}
                            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', background: 'white', cursor: 'pointer' }}
                            title="Pronto"
                        >
                            <CheckCircle size={18} color="#10b981" />
                        </button>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManager;