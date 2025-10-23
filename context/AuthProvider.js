import React, { createContext, useContext, useState } from 'react';
import { Buffer } from 'buffer'; // polyfill pour base64
import * as Martha from '../services/martha';

const AuthContext = createContext({
  user: null,
  auth: null,
  login: async () => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   // { id, username, ... }
  const [auth, setAuth] = useState(null);   // base64 string

  function encodeAuth(username, password) {
    const pair = `${username}:${password}`;
    try {
      // Buffer -> base64 works in RN with 'buffer' polyfill
      return Buffer.from(pair).toString('base64');
    } catch (e) {
      // fallback
      return global.btoa ? global.btoa(pair) : Buffer.from(pair).toString('base64');
    }
  }

  async function login(username, password) {
    const authBase64 = encodeAuth(username, password);
    // call martha login (select-user-auth)
    const u = await Martha.loginUser(authBase64, { username, password });
    setUser(u);
    setAuth(authBase64);
    return u;
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
