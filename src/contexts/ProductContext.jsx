import React, { createContext, useState, useContext, useEffect } from 'react';
import { products as initialProducts, categories } from '../services/mockData';
import { v4 as uuidv4 } from 'uuid';

const ProductContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};

export const ProductProvider = ({ children }) => {
    // Load from localStorage if available, otherwise use mockData
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('therooster_products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    const [allCategories, setCategories] = useState(categories);

    // Persist to localStorage whenever products change
    useEffect(() => {
        localStorage.setItem('therooster_products', JSON.stringify(products));
    }, [products]);

    const addProduct = (productData) => {
        const newProduct = {
            id: uuidv4(),
            ...productData
        };
        setProducts(prev => [...prev, newProduct]);
        return newProduct;
    };

    const updateProduct = (id, updatedData) => {
        setProducts(prev => prev.map(prod => 
            prod.id === id ? { ...prod, ...updatedData } : prod
        ));
    };

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(prod => prod.id !== id));
    };

    const getProductById = (id) => {
        // Handle both string and number IDs (mockData has numbers, uuid produces strings)
        return products.find(p => String(p.id) === String(id));
    };

    const getProductsByCategory = (categoryId) => {
        if (categoryId === 'todos') return products;
        return products.filter(p => p.category === categoryId);
    };

    const toggleProductAvailability = (id) => {
        setProducts(prev => prev.map(prod => 
            prod.id === id ? { ...prod, available: !prod.available } : prod
        ));
    };

    return (
        <ProductContext.Provider value={{
            products,
            categories: allCategories,
            addProduct,
            updateProduct,
            deleteProduct,
            getProductById,
            getProductsByCategory,
            toggleProductAvailability
        }}>
            {children}
        </ProductContext.Provider>
    );
};
