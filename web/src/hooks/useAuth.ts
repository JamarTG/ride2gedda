import { useState, useCallback } from "react";
import type { LoginCredentials, AuthState } from "@/types";
import { apiClient } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface AuthResponse {
  accessToken: string;
  successMessage?: string | null;
}

export function useAuth() {
  const { toast } = useToast();

  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem("jutc_token");
    const user = token ? JSON.parse(localStorage.getItem("jutc_user") || "null") : null;
    return { user, token, isAuthenticated: !!token };
  });

  const login = useCallback(
    async (creds: LoginCredentials) => {
      try {
        const response = await apiClient.post<AuthResponse>("/Auth/login", {
          email: creds.email,
          password: creds.password,
        });

        const data = response.data;
        const token = data.accessToken;

        if (!token) {
          throw new Error("No access token was returned from the server.");
        }

        localStorage.setItem("jutc_token", token);
        // We don't yet have user profile details from the API, so store null.
        localStorage.setItem("jutc_user", JSON.stringify(null));
        setAuth({ user: null, token, isAuthenticated: true });

        const message = data.successMessage || "Signed in successfully.";
        toast({
          title: "Welcome back",
          description: message,
        });
      } catch (error: any) {
        const apiMessage: string | undefined =
          error?.response?.data?.detail || error?.response?.data?.errorMessage;
        const message = apiMessage || error?.message || "Login failed. Please try again.";

        toast({
          title: "Login error",
          description: message,
        });
      }
    },
    [toast],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("jutc_token");
    localStorage.removeItem("jutc_user");
    setAuth({ user: null, token: null, isAuthenticated: false });
  }, []);

  return { ...auth, login, logout };
}
