import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

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

    if (email === 'admin@rooster.com' && password === 'admin') {
      const adminUser = { id: 1, name: 'Admin', email, role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('theRoosterUser', JSON.stringify(adminUser));
      setIsLoading(false);
      return { success: true, user: adminUser };
    } else if (password === '123456') { // Mock simple password for users
      const clientUser = { id: 2, name: 'Cliente Teste', email, role: 'client' };
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
