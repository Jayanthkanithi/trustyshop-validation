import React, { createContext, useContext, useState, useCallback } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

/**
 * Demo admin authentication.
 * In production, this would use proper auth with hashed passwords,
 * JWTs, and server-side session management.
 */
const DEMO_ADMIN_EMAIL = "admin@bytebazaar.com";
const DEMO_ADMIN_PASSWORD = "admin123";

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((email: string, password: string): boolean => {
    if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setIsAuthenticated(false), []);

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
