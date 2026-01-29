import React, { useState } from 'react';
import { mockOrders } from '../../services/mockData';
import { Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

const OrderManager = () => {
    const [orders, setOrders] = useState(mockOrders);

    const updateStatus = (id, newStatus) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'Recebido': return '#3b82f6'; // Blue
            case 'Preparando': return '#f59e0b'; // Amber
            case 'Pronto': return '#10b981'; // Green
            default: return '#6b7280';
        }
    };

    return (
        <div>
            <div className="section-header-admin">
                <h1>Gerenciamento de Pedidos</h1>
            </div>

            <div className="orders-kanban" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {orders.map(order => (
                    <div key={order.id} className="order-card" style={{ 
                        background: 'var(--bg-card)', 
                        padding: '1.5rem', 
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-accent)',
                        borderLeft: `5px solid ${getStatusColor(order.status)}`
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{order.id}</span>
                            <span style={{ 
                                background: getStatusColor(order.status) + '20', 
                                color: getStatusColor(order.status),
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.85rem',
                                fontWeight: '700'
                            }}>{order.status}</span>
                        </div>
                        
                        <div style={{ marginBottom: '1rem' }}>
                            <h4 style={{ marginBottom: '0.25rem' }}>{order.customer}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{order.items}</p>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-accent)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                                <Clock size={16} />
                                <span>{order.time}</span>
                            </div>
                            <span style={{ fontWeight: 'bold', color: 'var(--color-primary)' }}>R$ {order.total.toFixed(2)}</span>
                        </div>

                        <div className="order-actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                            {order.status === 'Recebido' && (
                                <button onClick={() => updateStatus(order.id, 'Preparando')} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                                    Iniciar Preparo
                                </button>
                            )}
                            {order.status === 'Preparando' && (
                                <button onClick={() => updateStatus(order.id, 'Pronto')} className="btn btn-sm" style={{ width: '100%', background: '#10b981', color: 'white' }}>
                                    Marcar Pronto
                                </button>
                            )}
                            {order.status === 'Pronto' && (
                                <button className="btn btn-outline btn-sm" disabled style={{ width: '100%', opacity: 0.5 }}>
                                    Concluído
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderManager;
