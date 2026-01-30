import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext';
import { ArrowLeft, Save, Trash, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductById, addProduct, updateProduct, deleteProduct, categories } = useProducts();
    
    const isEditing = !!id;
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'lanches',
        image: '' // We'll just use a text input for URL for now, or keep it empty
    });

    useEffect(() => {
        if (isEditing) {
            const product = getProductById(id);
            if (product) {
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    category: product.category,
                    image: product.image || ''
                });
            } else {
                toast.error('Produto não encontrado');
                navigate('/admin');
            }
        }
    }, [id, isEditing, getProductById, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const priceNumber = parseFloat(formData.price);
        if (isNaN(priceNumber)) {
            toast.error('Preço inválido');
            return;
        }

        const productData = {
            ...formData,
            price: priceNumber
        };

        if (isEditing) {
            updateProduct(id, productData);
            toast.success('Produto atualizado com sucesso!');
        } else {
            addProduct(productData);
            toast.success('Produto criado com sucesso!');
        }
        
        navigate('/admin');
    };

    const handleDelete = () => {
        if (window.confirm('Tem certeza que deseja excluir este produto?')) {
            deleteProduct(id);
            toast.success('Produto excluído');
            navigate('/admin');
        }
    };

    return (
        <div className="container admin-page">
            <div className="admin-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button onClick={() => navigate('/admin')} className="btn btn-outline btn-sm">
                        <ArrowLeft size={20} />
                    </button>
                    <h1>{isEditing ? 'Editar Produto' : 'Novo Produto'}</h1>
                </div>
                {isEditing && (
                    <button 
                        onClick={handleDelete}
                        className="btn btn-danger btn-sm"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Trash size={18} /> Excluir
                    </button>
                )}
            </div>

            <div className="admin-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label>Nome do Produto</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Ex: X-Bacon"
                            className="form-control"
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                background: 'var(--bg-input)', 
                                border: '1px solid var(--color-accent)', 
                                color: 'var(--text-main)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>Descrição</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="Ex: Pão, hambúrguer, queijo..."
                            className="form-control"
                            style={{ 
                                width: '100%', 
                                padding: '0.75rem', 
                                background: 'var(--bg-input)', 
                                border: '1px solid var(--color-accent)', 
                                color: 'var(--text-main)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                        <div className="form-group">
                            <label>Preço (R$)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                className="form-control"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.75rem', 
                                    background: 'var(--bg-input)', 
                                    border: '1px solid var(--color-accent)', 
                                    color: 'var(--text-main)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoria</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="form-control"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.75rem', 
                                    background: 'var(--bg-input)', 
                                    border: '1px solid var(--color-accent)', 
                                    color: 'var(--text-main)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            >
                                {categories.filter(c => c.id !== 'todos').map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Image URL placeholder for now - in future we can add file upload */}
                    <div className="form-group" style={{ marginTop: '1rem' }}>
                        <label>URL da Imagem (Opcional)</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                             <div style={{ 
                                 display: 'flex', 
                                 alignItems: 'center', 
                                 justifyContent: 'center',
                                 width: '40px',
                                 background: 'var(--bg-card)',
                                 border: '1px solid var(--color-accent)',
                                 borderRadius: 'var(--radius-md)'
                             }}>
                                 <ImageIcon size={20} />
                             </div>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="form-control"
                                style={{ 
                                    width: '100%', 
                                    padding: '0.75rem', 
                                    background: 'var(--bg-input)', 
                                    border: '1px solid var(--color-accent)', 
                                    color: 'var(--text-main)',
                                    borderRadius: 'var(--radius-md)'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <button 
                            type="submit" 
                            className="btn btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}
                        >
                            <Save size={20} />
                            Salvar Produto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
