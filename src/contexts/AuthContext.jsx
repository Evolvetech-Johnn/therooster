import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

// Mock Users Configuration - In a real app, this would be in a database
const MOCK_USERS = {
  ADMIN: {
    email: 'admin@rooster.com',
    password: 'Rooster@2026',
    data: { id: 1, name: 'Admin', role: 'admin' }
  },
  CLIENT: {
    password: 'Rooster@2026', // Generic password for testing
    data: { id: 2, name: 'Cliente Teste', role: 'client' }
  }
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('theRoosterUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    // Mock login logic
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email === MOCK_USERS.ADMIN.email && password === MOCK_USERS.ADMIN.password) {
      const adminUser = { ...MOCK_USERS.ADMIN.data, email };
      setUser(adminUser);
      localStorage.setItem('theRoosterUser', JSON.stringify(adminUser));
      setIsLoading(false);
      return { success: true, user: adminUser };
    } else if (password === MOCK_USERS.CLIENT.password) { // Standard password for users
      const clientUser = { ...MOCK_USERS.CLIENT.data, email };
      setUser(clientUser);
      localStorage.setItem('theRoosterUser', JSON.stringify(clientUser));
      setIsLoading(false);
      return { success: true, user: clientUser };
    } else {
      setIsLoading(false);
      return { success: false, message: 'Credenciais inválidas' };
    }
  };

  const register = async (data) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    const newUser = { id: Date.now(), ...data, role: 'client' };
    setUser(newUser);
    localStorage.setItem('theRoosterUser', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('theRoosterUser');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
