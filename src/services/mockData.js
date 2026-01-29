export const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'baldes', name: 'Frango no Balde' },
  { id: 'combos', name: 'Combos' },
  { id: 'acompanhamentos', name: 'Acompanhamentos' },
  { id: 'bebidas', name: 'Bebidas' }
];

export const products = [
  {
    id: 1,
    name: 'Balde Clássico - 10 Pedaços',
    description: '10 pedaços de frango crocante temperados com nossa receita secreta.',
    price: 49.90,
    category: 'baldes',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80'
  },
  {
    id: 2,
    name: 'Balde Família - 20 Pedaços',
    description: '20 pedaços suculentos para dividir com a galera.',
    price: 89.90,
    category: 'baldes',
    image: 'https://images.unsplash.com/photo-1562967963-ed7858776c96?w=500&q=80'
  },
  {
    id: 3,
    name: 'Combo Casal',
    description: '10 pedaços de frango + 2 batatas médias + 2 refrigerantes lata.',
    price: 74.90,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=500&q=80'
  },
  {
    id: 4,
    name: 'Batata Frita',
    description: 'Porção de batata frita crocante.',
    price: 15.90,
    category: 'acompanhamentos',
    image: 'https://images.unsplash.com/photo-1573080496987-fad718485112?w=500&q=80'
  },
  {
    id: 5,
    name: 'Coca-Cola 2L',
    description: 'Refrigerante garrafa 2 litros.',
    price: 12.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80'
  },
  {
    id: 6,
    name: 'Molho Especial',
    description: 'Molho de alho e ervas.',
    price: 3.00,
    category: 'acompanhamentos',
    image: 'https://images.unsplash.com/photo-1472476443507-ebd90dc1a9b7?w=500&q=80'
  }
];

// --- ADMIN MOCK DATA ---

export const mockOrders = [
    { id: '#1024', customer: 'João Silva', items: '1x Balde Clássico, 2x Coca-Cola', total: 73.90, status: 'Pronto', time: '18:30' },
    { id: '#1025', customer: 'Maria Oliveira', items: '1x Combo Casal', total: 74.90, status: 'Preparando', time: '19:15' },
    { id: '#1026', customer: 'Carlos Souza', items: '2x Batata Frita', total: 31.80, status: 'Recebido', time: '19:42' },
    { id: '#1027', customer: 'Ana Lima', items: '1x Balde Família', total: 89.90, status: 'Recebido', time: '19:45' },
];

export const mockFinancials = {
    dailyRevenue: 2850.00,
    monthlyRevenue: 45200.00,
    expenses: [
        { id: 1, name: 'Fornecedor Frango', amount: 1200.00, date: '2023-10-25', status: 'Pago' },
        { id: 2, name: 'Conta de Luz', amount: 450.00, date: '2023-10-28', status: 'Pendente' },
        { id: 3, name: 'Embalagens', amount: 300.00, date: '2023-10-30', status: 'Pendente' },
        { id: 4, name: 'Marketing Insta', amount: 150.00, date: '2023-11-01', status: 'Agendado' },
    ]
};

export const mockInventory = [
    { id: 1, name: 'Frango (kg)', quantity: 45, unit: 'kg', minLevel: 20, status: 'Ok' },
    { id: 2, name: 'Óleo (L)', quantity: 12, unit: 'L', minLevel: 10, status: 'Ok' },
    { id: 3, name: 'Embalagem Balde', quantity: 8, unit: 'un', minLevel: 50, status: 'Baixo' },
    { id: 4, name: 'Batata (kg)', quantity: 30, unit: 'kg', minLevel: 15, status: 'Ok' },
    { id: 5, name: 'Refrigerante 2L', quantity: 24, unit: 'un', minLevel: 12, status: 'Ok' },
];

export const mockSalesData = [
    { name: 'Seg', vendas: 1200 },
    { name: 'Ter', vendas: 1400 },
    { name: 'Qua', vendas: 1100 },
    { name: 'Qui', vendas: 1800 },
    { name: 'Sex', vendas: 3200 },
    { name: 'Sáb', vendas: 4500 },
    { name: 'Dom', vendas: 3800 },
];
