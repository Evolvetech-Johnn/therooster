import React, { createContext, useState, useContext, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};

export const StoreProvider = ({ children }) => {
    const [storeConfig, setStoreConfig] = useState(() => {
        const savedConfig = localStorage.getItem('therooster_store_config');
        return savedConfig ? JSON.parse(savedConfig) : {
            isOpen: true,
            deliveryFee: 5.00,
            minOrder: 20.00,
            waitTime: '40-60 min'
        };
    });

    useEffect(() => {
        localStorage.setItem('therooster_store_config', JSON.stringify(storeConfig));
    }, [storeConfig]);

    const toggleStoreOpen = () => {
        setStoreConfig(prev => ({ ...prev, isOpen: !prev.isOpen }));
    };

    const updateStoreSettings = (newSettings) => {
        setStoreConfig(prev => ({ ...prev, ...newSettings }));
    };

    return (
        <StoreContext.Provider value={{
            storeConfig,
            toggleStoreOpen,
            updateStoreSettings,
            isOpen: storeConfig.isOpen
        }}>
            {children}
        </StoreContext.Provider>
    );
};
