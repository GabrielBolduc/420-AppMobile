// context/AuthProvider.js
import React, { createContext, useContext, useState } from 'react';
import { Alert } from 'react-native';
import { loginUser } from '../services/martha';

const AuthContext = createContext({
  user: null,
  auth: null,
  login: async (username, password) => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);     // { id, username }
  const [auth, setAuth] = useState(null);     // base64 string

  function encodeAuth(username, password) {
    
    const pair = `${username}:${password}`;
    // btoa not available reliably in RN; use Buffer if available, else fallback
    try {
      // Node/Expo environment provides global btoa? Safer to use Buffer
      // But in Expo RN, global btoa may not exist, so we use this:
      return global.btoa ? global.btoa(pair) : Buffer.from(pair).toString('base64');
    } catch (e) {
      // try fallback
      return Buffer.from(pair).toString('base64');
    }
  }

  async function login(username, password) {
    const authBase64 = encodeAuth(username, password);
    try {
      const u = await loginUser(authBase64, { username, password });
      setUser(u);
      setAuth(authBase64);
      return u;
    } catch (err) {
      // bubble an error with message
      throw err;
    }
  }

  function logout() {
    setUser(null);
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ user, auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
