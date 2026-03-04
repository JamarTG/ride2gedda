import { useState } from "react";
import { motion } from "framer-motion";
import {
  IconBus,
  IconMail,
  IconLock,
  IconUser,
  IconArrowRight,
} from "@tabler/icons-react";




import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserRole } from "@/types";
import type { LoginCredentials, SignupCredentials } from "@/types";

interface AuthPageProps {
  onLogin: (creds: LoginCredentials) => Promise<void>;
  onSignup: (creds: SignupCredentials) => Promise<void>;
}

export default function AuthPage({ onLogin, onSignup }: AuthPageProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("commuter@jutc.com");
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await onLogin({ email, password });
      } else {
        await onSignup({ email, password, name, role: UserRole.Citizen });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <IconBus className="h-9 w-9 text-primary-foreground" />
          </div>
          <h1 className="font-display text-5xl font-bold tracking-tight">ride2gedda.com 🇯🇲</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your intelligent companion fi navigating Jamaica's bus system
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="pb-4">
            <CardTitle className="font-display text-xl">
              {mode === "login" ? "Welcome back" : "Create account"}
            </CardTitle>
            <CardDescription>
              {mode === "login" ? "Sign in to track your commute" : "Join the smart commuter community"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div className="relative">
                  <IconUser className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              )}
              <div className="relative">
                <IconMail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <div className="relative">
                <IconLock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
              <Button type="submit" className="w-full gap-2 font-semibold" disabled={loading}>
                {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
                <IconArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              </span>{" "}
              <button
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          🇯🇲 Proudly serving Jamaica's commuters
        </p>
      </motion.div>
    </div>
  );
}
