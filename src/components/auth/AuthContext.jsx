import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || {});
  console.log(token, userData);

  const login = (newToken, newUserData) => {
    setToken(newToken);
    setUserData(newUserData)
    localStorage.setItem('token', newToken);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider value={{ token, userData, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

