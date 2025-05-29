
import { useState, useEffect, createContext, useContext } from "react";

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const adminStatus = localStorage.getItem('mac-admin-logged-in');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (username: string, password: string) => {
    // Simple authentication - in production this would be more secure
    if (username === 'admin' && password === 'mac2024') {
      setIsAdmin(true);
      localStorage.setItem('mac-admin-logged-in', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('mac-admin-logged-in');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
