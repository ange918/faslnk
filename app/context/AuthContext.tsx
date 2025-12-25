"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  hasSeenSplash: boolean;
  setHasSeenSplash: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenSplash, setHasSeenSplashState] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("fashlink_user");
    const seenSplash = localStorage.getItem("fashlink_seen_splash");
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (seenSplash) setHasSeenSplashState(true);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("fashlink_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fashlink_user");
    localStorage.removeItem("fashlink_seen_splash");
  };

  const setHasSeenSplash = (val: boolean) => {
    setHasSeenSplashState(val);
    if (val) localStorage.setItem("fashlink_seen_splash", "true");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasSeenSplash, setHasSeenSplash }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
