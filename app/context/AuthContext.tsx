"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  gender?: string;
  city?: string;
  phone?: string;
}

export interface AuthUserImage {
  imageUrl: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  userImage: string | null;
  setUserImage: (img: string | null) => void;
  setUserProfile: (profile: Partial<User>) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const setUserProfile = (profile: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...profile };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };
  const [token, setToken] = useState<string | null>(null);
  const [userImage, setUserImageState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to load user/token/image from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    const storedImage = localStorage.getItem("userImage");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    if (storedImage) {
      setUserImageState(storedImage);
    }
    setLoading(false);
  }, []);

  const setUserImage = (img: string | null) => {
    setUserImageState(img);
    if (img) {
      localStorage.setItem("userImage", img);
    } else {
      localStorage.removeItem("userImage");
    }
  };

  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserImageState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userImage");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, userImage, setUserImage, setUserProfile, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

