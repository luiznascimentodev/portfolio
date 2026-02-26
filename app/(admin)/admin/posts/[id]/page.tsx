import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

export const metadata = {
  title: "Editar Post — Admin",
};

export default function EditPostPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <Construction className="mb-4 h-10 w-10 text-primary" />
      <h1 className="text-xl font-bold text-white">Editor em construção</h1>
      <p className="mt-2 max-w-xs text-sm text-gray-400">
        O editor de posts com Novel.js será implementado no{" "}
        <span className="text-primary">Milestone 5</span>.
      </p>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="mt-6 border-gray-700 text-gray-300 hover:border-primary hover:text-primary"
      >
        <Link href="/admin/posts">
          <ArrowLeft className="mr-2 h-3.5 w-3.5" />
          Voltar para posts
        </Link>
      </Button>
    </div>
  );
}
