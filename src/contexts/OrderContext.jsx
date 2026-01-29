import React, { createContext, useContext, useState, useEffect } from "react";
import { mockOrders } from "../services/mockData";

const OrderContext = createContext();

export const useOrder = () => {
  return useContext(OrderContext);
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("rooster_orders");
    if (savedOrders) {
      return JSON.parse(savedOrders);
    }
    // Initialize with mock data if no local storage, adding default type if missing
    return mockOrders.map(order => ({
        ...order,
        type: order.type || 'delivery' // Default to delivery if not specified
    }));
  });

  useEffect(() => {
    localStorage.setItem("rooster_orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    const orderWithId = {
      ...newOrder,
      id: `#${Math.floor(1000 + Math.random() * 9000)}`, // Random ID
      status: "Recebido",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString(),
    };
    setOrders((prevOrders) => [orderWithId, ...prevOrders]);
    return orderWithId;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const removeOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const getActiveOrders = () => {
    return orders.filter(order => !['Entregue', 'Retirado', 'Cancelado'].includes(order.status));
  };

  const value = {
    orders,
    addOrder,
    updateOrderStatus,
    removeOrder,
    getActiveOrders
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
