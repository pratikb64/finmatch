import { getUserService } from "@/services/auth.service";
import { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
  session: User | undefined;
  isLoading: boolean;
  signOut: () => Promise<void>;
  fetchSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSession = async () => {
    try {
      setIsLoading(true);

      const response = await getUserService();
      setSession(response.data);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("session");
    setSession(undefined);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const value = {
    session,
    isLoading,
    signOut,
    fetchSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
