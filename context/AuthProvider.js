// context/AuthProvider.js
import React, { createContext, useState } from 'react';
import authService from '../services/authService.js';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(authService.currentUser);

  const logIn = async (credentials) => {
    const success = await authService.logIn(credentials);
    setUser(authService.currentUser);
    return success;
  };

  const signUp = async (credentials) => {
    const success = await authService.signUp(credentials);
    setUser(authService.currentUser);
    return success;
  };

  const logOut = () => {
    authService.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, signUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
