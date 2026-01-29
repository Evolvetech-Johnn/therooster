import React from 'react';
import { mockFinancials } from '../../services/mockData';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Calendar, AlertTriangle } from 'lucide-react';

const Financials = () => {
    return (
        <div>
            <div className="section-header-admin">
                <h1>Financeiro</h1>
            </div>

            {/* Cash Flow Summary */}
            <div className="stats-grid">
                <div className="stat-card highlight">
                    <div className="stat-icon"><TrendingUp size={24} /></div>
                    <div className="stat-info">
                        <h3>Receita Mensal</h3>
                        <p className="stat-value">{formatCurrency(mockFinancials.monthlyRevenue)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#ef4444' }}><TrendingDown size={24} /></div>
                    <div className="stat-info">
                        <h3>Despesas Totais</h3>
                        <p className="stat-value">{formatCurrency(2100.00)}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon" style={{ color: '#f59e0b' }}><AlertTriangle size={24} /></div>
                    <div className="stat-info">
                        <h3>A Pagar (Hoje)</h3>
                        <p className="stat-value">{formatCurrency(450.00)}</p>
                    </div>
                </div>
            </div>

            {/* Expenses Table */}
            <div className="admin-section" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-accent)' }}>
                <h2>Controle de Despesas</h2>
                <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--color-accent)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Descrição</th>
                                <th style={{ padding: '1rem' }}>Vencimento</th>
                                <th style={{ padding: '1rem' }}>Valor</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem' }}>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockFinancials.expenses.map(expense => (
                                <tr key={expense.id} style={{ borderBottom: '1px solid var(--color-accent)' }}>
                                    <td style={{ padding: '1rem' }}>{expense.name}</td>
                                    <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Calendar size={16} color="var(--text-secondary)" />
                                        {new Date(expense.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>{formatCurrency(expense.amount)}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            padding: '0.25rem 0.75rem',
                                            borderRadius: '99px',
                                            fontSize: '0.85rem',
                                            background: expense.status === 'Pago' ? '#10b98120' : expense.status === 'Pendente' ? '#ef444420' : '#f59e0b20',
                                            color: expense.status === 'Pago' ? '#10b981' : expense.status === 'Pendente' ? '#ef4444' : '#f59e0b',
                                            fontWeight: '600'
                                        }}>
                                            {expense.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {expense.status !== 'Pago' && (
                                            <button className="btn btn-sm btn-outline">Pagar</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Financials;
