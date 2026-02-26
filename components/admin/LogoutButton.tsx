"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutButton({ iconOnly = false }: { iconOnly?: boolean }) {
  return (
    <Button
      variant="ghost"
      size={iconOnly ? "icon" : "sm"}
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-gray-400 hover:text-white hover:bg-gray-800"
      aria-label="Sair"
    >
      <LogOut className="h-4 w-4" />
      {!iconOnly && <span className="ml-2">Sair</span>}
    </Button>
  );
}
