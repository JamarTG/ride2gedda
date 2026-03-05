import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type { SignupCredentials } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  errorMessage?: string | null;
  successMessage?: string | null;
}

export function useSignup() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (creds: SignupCredentials) => {
      const payload = {
        firstName: creds.firstName,
        lastName: creds.lastName,
        email: creds.email,
        password: creds.password,
      };

      const response = await apiClient.post<RegisterResponse>("/Auth/register", payload);
      return response.data;
    },
    onSuccess: (data) => {
      const message = data.successMessage || "You can now sign in with your new account.";

      toast({
        title: "Account created",
        description: message,
      });
    },
    onError: (error: any) => {
    alert(JSON.stringify(error));
      const apiMessage: string | undefined = error?.response?.data?.detail || error?.response?.data?.errorMessage;
      const message = apiMessage || error?.message || "Registration failed. Please try again.";

      toast({
        title: "Registration error",
        description: message,
      });
    },
  });
}
