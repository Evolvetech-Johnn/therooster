import React from 'react';
import { mockSalesData } from '../../services/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Metrics = () => {
    return (
        <div>
            <div className="section-header-admin">
                <h1>Métricas de Venda</h1>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                
                {/* Weekly Sales Chart */}
                <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Vendas da Semana</h3>
                    <div style={{ height: '300px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockSalesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-accent)" />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-primary)', color: 'var(--text-main)' }}
                                    itemStyle={{ color: 'var(--text-main)' }}
                                />
                                <Line type="monotone" dataKey="vendas" stroke="var(--color-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                 {/* Top Products (Simulation) */}
                 <div style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Produtos Mais Vendidos</h3>
                    <div style={{ height: '250px', width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                { name: 'Balde 10', qtd: 45 },
                                { name: 'Combo Casal', qtd: 32 },
                                { name: 'Balde 20', qtd: 28 },
                                { name: 'Batata', qtd: 60 },
                                { name: 'Refri', qtd: 55 }
                            ]}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-accent)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--text-secondary)" />
                                <YAxis stroke="var(--text-secondary)" />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-primary)' }}
                                    cursor={{fill: 'transparent'}}
                                />
                                <Bar dataKey="qtd" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Metrics;
