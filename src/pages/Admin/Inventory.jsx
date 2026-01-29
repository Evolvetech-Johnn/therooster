import React from 'react';
import { mockInventory } from '../../services/mockData';
import { AlertTriangle, Plus, Search } from 'lucide-react';

const Inventory = () => {
    return (
        <div>
            <div className="section-header-admin">
                <h1>Estoque de Ingredientes</h1>
                <button className="btn btn-primary btn-sm">
                    <Plus size={16} /> Novo Item
                </button>
            </div>

            <div className="admin-section" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)' }}>
                <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                    <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                    <input 
                        type="text" 
                        placeholder="Buscar ingrediente..." 
                        style={{ 
                            width: '100%', 
                            padding: '0.75rem 1rem 0.75rem 3rem', 
                            background: 'var(--bg-input)', 
                            border: '1px solid var(--color-accent)', 
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text-main)'
                        }} 
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {mockInventory.map(item => {
                        const isLow = item.quantity <= item.minLevel;
                        return (
                            <div key={item.id} style={{ 
                                background: 'var(--bg-body)', 
                                padding: '1rem', 
                                borderRadius: 'var(--radius-md)', 
                                border: isLow ? '1px solid #ef4444' : '1px solid var(--color-accent)',
                                position: 'relative'
                            }}>
                                {isLow && (
                                    <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: '#ef4444' }} title="Estoque Baixo">
                                        <AlertTriangle size={18} />
                                    </div>
                                )}
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-main)' }}>{item.name}</h4>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: isLow ? '#ef4444' : 'var(--color-primary)' }}>{item.quantity}</span>
                                    <span style={{ color: 'var(--text-secondary)' }}>{item.unit}</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                    Mínimo: {item.minLevel} {item.unit}
                                </div>
                                <button className="btn btn-outline btn-sm" style={{ width: '100%' }}>Ajustar</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Inventory;
