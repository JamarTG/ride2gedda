import { useState, useCallback } from "react";
import type { User, LoginCredentials, SignupCredentials, AuthState } from "@/types";
import { UserRole } from "@/types";

const MOCK_USER: User = {
  id: "u1",
  email: "commuter@jutc.com",
  name: "Marcus Brown",
  role: UserRole.Citizen,
};

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem("jutc_token");
    const user = token ? JSON.parse(localStorage.getItem("jutc_user") || "null") : null;
    return { user, token, isAuthenticated: !!token };
  });

  const login = useCallback(async (_creds: LoginCredentials) => {
    
    const token = "mock_jwt_token_" + Date.now();
    localStorage.setItem("jutc_token", token);
    localStorage.setItem("jutc_user", JSON.stringify(MOCK_USER));
    setAuth({ user: MOCK_USER, token, isAuthenticated: true });
  }, []);

  const signup = useCallback(async (creds: SignupCredentials) => {
    const newUser: User = { id: "u_new", email: creds.email, name: creds.name, role: creds.role };
    const token = "mock_jwt_token_" + Date.now();
    localStorage.setItem("jutc_token", token);
    localStorage.setItem("jutc_user", JSON.stringify(newUser));
    setAuth({ user: newUser, token, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("jutc_token");
    localStorage.removeItem("jutc_user");
    setAuth({ user: null, token: null, isAuthenticated: false });
  }, []);

  return { ...auth, login, signup, logout };
}
