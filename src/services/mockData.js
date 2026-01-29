export const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'baldes', name: 'Baldes' },
  { id: 'lanches', name: 'Lanches' },
  { id: 'combos', name: 'Combos' },
  { id: 'porcoes', name: 'Porções' },
  { id: 'molhos', name: 'Molhos' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'sobremesas', name: 'Sobremesas' },
  { id: 'kids', name: 'Kids' }
];

export const products = [
  // --- MAIS PEDIDOS (Categorized) ---
  {
    id: 1,
    name: 'Tiras de Frango Extra Crocante',
    description: '4 tiras de frango extra Crocante, com um tempero inconfundível + Molho de brinde!',
    price: 26.70,
    category: 'porcoes',
    image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&q=80'
  },
  {
    id: 2,
    name: 'Balde Pequeno + Molho Grátis',
    description: 'Frango Crocante, sequinho e delicioso. Ideal para 1 pessoa + 1 molho.',
    price: 58.70,
    category: 'baldes',
    image: 'https://images.unsplash.com/photo-1563897539633-7374c276c212?w=500&q=80'
  },
  {
    id: 3,
    name: 'Combo Galo Maluco',
    description: '2 Lanches (50% off no 2º) + 1 Batata Ind. + 1 Refri Lata 350ml. (Serve até 2 pessoas)',
    price: 59.90,
    originalPrice: 77.90,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1594007731854-5cddb6932152?w=500&q=80'
  },

  // --- LANCHES EXCLUSIVOS ---
  {
    id: 4,
    name: 'Rooster Chicken',
    description: 'Pão selado na manteiga, maionese caseira, 2 filés de sassami crocante, queijo cheddar.',
    price: 33.50,
    category: 'lanches',
    image: 'https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=500&q=80'
  },
  {
    id: 5,
    name: 'Rooster Classic',
    description: 'Pão selado, maionese de alho, 2 filés de sassami crocante, tomate e queijo cheddar.',
    price: 33.50,
    category: 'lanches',
    image: 'https://images.unsplash.com/photo-1615557960916-5f4791effe9d?w=500&q=80'
  },
  {
    id: 6,
    name: 'Rooster Double',
    description: 'Tudo em dobro! Pão, maionese caseira, 2 sassamis, 2 cheddars, 2 bacons.',
    price: 35.50,
    category: 'lanches',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80'
  },

  // --- COMBOS ---
  {
    id: 7,
    name: 'Combo 7 em 1 - Exclusivo',
    description: '2 lanches + 2 sassami + 1 batata frita + 1 refri 600ml + 1 molho.',
    price: 105.70,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=500&q=80'
  },
  {
    id: 8,
    name: 'Combo 8 em 1',
    description: '2 lanches + 4 tiras de Frango + 2 molhos a sua escolha.',
    price: 89.70,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80'
  },
  {
    id: 9,
    name: '4 Lanches no Precinho',
    description: 'Você escolhe os seus 4 lanches favoritos!',
    price: 97.70,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?w=500&q=80'
  },
  {
    id: 10,
    name: '10 em 1 - Famoso Mega Combo',
    description: '4 tiras de Sassami + 2 lanches + 2 refri 350ml + 1 Batata Frita + 1 molho.',
    price: 112.50,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1541592106381-b31e9674c96a?w=500&q=80'
  },

  // --- BALDES ---
  {
    id: 11,
    name: 'Balde p/ 3 Pessoas + 2 Molhos',
    description: 'Frango estilo Americano, crocante e suculento. Serve 3 pessoas. (Acompanha 2 molhos)',
    price: 85.70,
    category: 'baldes',
    image: 'https://images.unsplash.com/photo-1563897539633-7374c276c212?w=500&q=80'
  },
  {
    id: 12,
    name: 'Balde p/ 5 Pessoas + 3 Molhos',
    description: 'Muita crocância! Serve 5 pessoas e leva 3 molhos de brinde.',
    price: 105.70,
    category: 'baldes',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80'
  },

  // --- LANCHES PREMIUM ---
  {
    id: 13,
    name: 'Hamburguer Texas Rooster',
    description: 'Pão, molho, alface, frango, Catupiry, queijo cheddar e bacon.',
    price: 42.70,
    category: 'lanches',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'
  },
  {
    id: 14,
    name: 'Texas Fit',
    description: 'Pão Brioche, Maionese caseira, alface, tomate, cebola roxa, 2 Sassami crocante.',
    price: 41.70,
    category: 'lanches',
    image: 'https://images.unsplash.com/photo-1606754756283-ffc7cd666575?w=500&q=80'
  },

  // --- COMBOS PREMIUM ---
  {
    id: 15,
    name: 'Combo Individual Completo',
    description: 'Lanche + Batata Frita Individual + Refri Lata 350ml + sachês.',
    price: 66.70,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&q=80'
  },
  {
    id: 16,
    name: '5 EM 1 SUPER COMBO',
    description: '1 Lanche + 3 Tiras de Frango + Batata + Refri + Molho.',
    price: 75.70,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1512427691650-2ecf4b6c79a9?w=500&q=80'
  },
  {
    id: 17,
    name: 'Combo Balde Casal',
    description: 'Balde pequeno + Refri Lata + Porção (Batata ou Polenta) + 2 Molhos.',
    price: 69.70,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1562967963-ed7858776c96?w=500&q=80'
  },
  {
    id: 18,
    name: 'Combo Balde Médio (3 Pessoas)',
    description: 'Balde Médio + Porção (Batata ou Polenta) + Refri 350ml + 2 Molhos.',
    price: 95.70,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1606754756283-ffc7cd666575?w=500&q=80'
  },
  {
    id: 19,
    name: 'Combo Família Real (5 Pessoas)',
    description: 'Balde Grande + Polenta Ind. + Batata Ind. + 3 Molhos + Coca 2L.',
    price: 149.90,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&q=80'
  },

  // --- PORÇÕES ---
  {
    id: 20,
    name: 'Polenta Individual',
    description: 'Polenta Frita Saborosa e Crocante.',
    price: 23.70,
    category: 'porcoes',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=500&q=80'
  },
  {
    id: 21,
    name: 'Batata Individual',
    description: '180g de Batata Frita Crocante e sequinha.',
    price: 23.70,
    category: 'porcoes',
    image: 'https://images.unsplash.com/photo-1573080496987-fad718485112?w=500&q=80'
  },
  {
    id: 22,
    name: 'Onion Rings Individual',
    description: 'Cebola Empanada sequinha e saborosa.',
    price: 23.70,
    category: 'porcoes',
    image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&q=80'
  },
  {
    id: 23,
    name: 'Balde de Batata Frita',
    description: 'Ideal para 3 pessoas.',
    price: 39.90,
    category: 'porcoes',
    image: 'https://images.unsplash.com/photo-1585109649139-3668018951a7?w=500&q=80'
  },
  {
    id: 24,
    name: 'Balde de Onion Rings',
    description: 'Anéis de cebola empanados.',
    price: 39.99,
    category: 'porcoes',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?w=500&q=80'
  },
  {
    id: 25,
    name: 'Balde de Polenta Frita',
    description: 'Sequinha e crocante, serve 3.',
    price: 39.99,
    category: 'porcoes',
    image: 'https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=500&q=80'
  },

  // --- MOLHOS ---
  {
    id: 26,
    name: 'Molho de Alho',
    description: 'Famoso Molho de Alho da The Rooster.',
    price: 7.00,
    category: 'molhos',
    image: 'https://images.unsplash.com/photo-1472476443507-ebd90dc1a9b7?w=500&q=80'
  },
  {
    id: 27,
    name: 'Molho de Bacon',
    description: 'Delicioso molho de Bacon com sabor incomparável.',
    price: 7.00,
    category: 'molhos',
    image: 'https://images.unsplash.com/photo-1585238342070-61e1e768b1ff?w=500&q=80'
  },
  {
    id: 28,
    name: 'Molho Barbecue',
    description: 'Lendário Molho de Barbecue.',
    price: 7.00,
    category: 'molhos',
    image: 'https://images.unsplash.com/photo-1623341214823-6627581358c5?w=500&q=80'
  },
  {
    id: 29,
    name: 'Mostarda e Mel',
    description: 'Combinação perfeita... Experimente!',
    price: 7.00,
    category: 'molhos',
    image: 'https://images.unsplash.com/photo-1596450519634-c2d27ad5982c?w=500&q=80'
  },
  {
    id: 30,
    name: 'Goiabada com Pimenta',
    description: 'A mistura do doce com o toque da pimenta.',
    price: 7.00,
    category: 'molhos',
    image: 'https://images.unsplash.com/photo-1581452918880-99905c24e93c?w=500&q=80'
  },

  // --- BEBIDAS ---
  {
    id: 31,
    name: 'Coca-Cola 350ml',
    description: 'Lata super gelada.',
    price: 8.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80'
  },
  {
    id: 32,
    name: 'Guaraná Antarctica 350ml',
    description: 'Lata.',
    price: 8.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1579630528229-45c1a70014b2?w=500&q=80'
  },
  {
    id: 33,
    name: 'Fanta Laranja 350ml',
    description: 'Lata.',
    price: 8.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=500&q=80'
  },
  {
    id: 34,
    name: 'Coca Zero 350ml',
    description: 'Lata.',
    price: 8.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1549753173-0db107a67cb4?w=500&q=80'
  },
  {
    id: 35,
    name: 'Sprite Original 350ml',
    description: 'Lata.',
    price: 8.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a78de83?w=500&q=80'
  },
  {
    id: 36,
    name: 'Coca-Cola 2 Litros',
    description: 'Garrafa.',
    price: 18.50,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1554988775-520a7b0553db?w=500&q=80'
  },
  {
    id: 37,
    name: 'Guaraná Antarctica 2 Litros',
    description: 'Garrafa.',
    price: 17.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1605232840615-56549a0a0397?w=500&q=80'
  },
  {
    id: 38,
    name: 'Coca Zero 600ml',
    description: 'Garrafa.',
    price: 14.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80'
  },
  {
    id: 39,
    name: 'Cerveja Heineken 330ml',
    description: 'Long neck. (Para maiores de 18 anos)',
    price: 13.00,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1618885472179-4e2621434c26?w=500&q=80'
  },

  // --- SOBREMESAS ---
  {
    id: 40,
    name: 'Sorvete',
    description: 'Deliciosa sobremesa refrescante.',
    price: 12.00,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1579954115563-e72bf1381629?w=500&q=80'
  },

  // --- KIDS e Outros ---
  {
    id: 41,
    name: 'Combo Família + Kids',
    description: 'Balde Grande + 2 porções + Balde Kids (Batata/Nuggets) + 5 molhos + Refri 2L.',
    price: 185.90,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1513639776629-7b611594e29b?w=500&q=80'
  },
  {
    id: 42,
    name: 'Balde Kids',
    description: 'Balde com batata e nuggets, pensado para crianças.',
    price: 29.90,
    category: 'kids',
    image: 'https://images.unsplash.com/photo-1563897539633-7374c276c212?w=500&q=80'
  }
];

// --- ADMIN MOCK DATA (Updated to reflect new items randomly) ---

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
