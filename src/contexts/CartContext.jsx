import React, { createContext, useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  /* Safe initialization with validation */
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('theRoosterCart');
      if (!storedCart) return [];
      
      const parsed = JSON.parse(storedCart);
      if (!Array.isArray(parsed)) return [];

      // Validate items to prevent crashes
      return parsed.filter(item => 
        item && 
        (item.id || item.cartId) && 
        typeof item.price === 'number' && 
        typeof item.quantity === 'number'
      );
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theRoosterCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const lookupId = product.cartId || product.id;
      const existingItemIndex = prevItems.findIndex(item => (item.cartId || item.id) === lookupId);
      
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity
        };
        toast.success(`Quantidade atualizada: ${product.name}`);
        return newItems;
      } else {
        toast.success(`${product.name} adicionado ao carrinho! 🍗`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
        const itemToRemove = prevItems.find(item => (item.cartId || item.id) === productId);
        if (itemToRemove) {
            toast.error(`${itemToRemove.name} removido.`);
        }
        return prevItems.filter(item => (item.cartId || item.id) !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems => 
      prevItems.map(item => 
        (item.cartId || item.id) === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success('Carrinho esvaziado.');
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
