import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthorized: boolean;
  authorize: () => void;
  checkPassword: (password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Configure these values
const AUTH_KEY = "hareesh2025"; // URL param: ?auth=hareesh2025
const PASSWORD = "2025"; // Password for modal

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check URL params first
    const params = new URLSearchParams(window.location.search);
    const authParam = params.get("auth");
    
    if (authParam === AUTH_KEY) {
      setIsAuthorized(true);
      sessionStorage.setItem("portfolio_auth", "true");
      // Clean URL without reload
      window.history.replaceState({}, "", window.location.pathname + window.location.hash);
      return;
    }

    // Check session storage
    const sessionAuth = sessionStorage.getItem("portfolio_auth");
    if (sessionAuth === "true") {
      setIsAuthorized(true);
    }
  }, []);

  const authorize = () => {
    setIsAuthorized(true);
    sessionStorage.setItem("portfolio_auth", "true");
  };

  const checkPassword = (password: string): boolean => {
    if (password === PASSWORD) {
      authorize();
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, authorize, checkPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
