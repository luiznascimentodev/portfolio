"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Loader2 } from "lucide-react";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="admin@exemplo.com"
          disabled={pending}
          className="bg-surface-dark border-gray-700 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-gray-300">
          Senha
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
          disabled={pending}
          className="bg-surface-dark border-gray-700 text-white placeholder:text-gray-500 focus:border-primary focus:ring-primary"
        />
      </div>

      {state?.error && (
        <div className="flex items-center gap-2 rounded-md border border-red-800 bg-red-950/50 px-3 py-2 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={pending}
        className="w-full bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Entrando...
          </>
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
}
