import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedItems, setSavedItems] = useState([]);

  // Ачааллах үед localStorage-аас датаг унших
  useEffect(() => {
    const storedUser = localStorage.getItem('app-user');
    const storedSaved = localStorage.getItem('saved-scholarships');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedSaved) setSavedItems(JSON.parse(storedSaved));
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('app-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('app-user');
  };

  const toggleSave = (scholarship) => {
    const updated = savedItems.find(s => s.id === scholarship.id)
      ? savedItems.filter(s => s.id !== scholarship.id)
      : [...savedItems, scholarship];
    
    setSavedItems(updated);
    localStorage.setItem('saved-scholarships', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, savedItems, toggleSave }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);