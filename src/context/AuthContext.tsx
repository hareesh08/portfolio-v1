import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface AuthContextType {
  isAuthorized: boolean;
  authorize: () => void;
  checkPassword: (password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = import.meta.env.VITE_AUTH_KEY || "hareesh2025";
const PASSWORD = import.meta.env.VITE_AUTH_PASSWORD || "2025";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authParam = params.get("auth");

    if (authParam === AUTH_KEY) {
      setIsAuthorized(true);
      sessionStorage.setItem("portfolio_auth", "true");
      const cleanUrl = window.location.origin + window.location.pathname + window.location.hash;
      window.history.replaceState({}, "", cleanUrl);
    } else {
      const sessionAuth = sessionStorage.getItem("portfolio_auth");
      if (sessionAuth === "true") {
        setIsAuthorized(true);
      }
    }
    setIsLoaded(true);
  }, []);

  const authorize = useCallback(() => {
    setIsAuthorized(true);
    sessionStorage.setItem("portfolio_auth", "true");
  }, []);

  const checkPassword = useCallback((password: string): boolean => {
    if (password === PASSWORD) {
      authorize();
      return true;
    }
    return false;
  }, [authorize]);

  if (!isLoaded) {
    return null;
  }

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
