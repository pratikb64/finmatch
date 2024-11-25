import { useAuth } from "@/providers/Authentication";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoading, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate("/login");
    }
  }, [isLoading, session]);

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">Loading...</div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
};
