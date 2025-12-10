import React, { createContext, useContext, useEffect, useState } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadMe = async () => {
    try {
      setLoading(true);
      const data = await api.getMe();
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) loadMe();
    else setLoading(false);
  }, []);

  const signup = async (payload) => {
    const res = await api.register(payload);
    if (res.token) localStorage.setItem("token", res.token);
    await loadMe();
    return res;
  };

  const signin = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password are required");
    const res = await api.login({ email, password });

    if (res.token) localStorage.setItem("token", res.token);
    await loadMe();
    return res;
  };

  const signout = async () => {
    await api.logout();
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);