"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { togglePublish, deletePost } from "../actions";

interface PostActionsProps {
  id: string;
  title: string;
  published: boolean;
}

export function PostActions({ id, title, published }: PostActionsProps) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleTogglePublish() {
    startTransition(async () => {
      await togglePublish(id);
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deletePost(id);
      setDeleteOpen(false);
    });
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white data-[state=open]:bg-gray-800"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Ações</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-44 border-gray-700 bg-surface-dark text-gray-200"
        >
          <DropdownMenuItem
            onClick={() => router.push(`/admin/posts/${id}`)}
            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            <Pencil className="mr-2 h-3.5 w-3.5" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleTogglePublish}
            disabled={isPending}
            className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
          >
            {published ? (
              <>
                <EyeOff className="mr-2 h-3.5 w-3.5" />
                Despublicar
              </>
            ) : (
              <>
                <Eye className="mr-2 h-3.5 w-3.5" />
                Publicar
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-gray-700" />

          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className="cursor-pointer text-red-400 hover:bg-red-950/50 hover:text-red-300 focus:bg-red-950/50 focus:text-red-300"
          >
            <Trash2 className="mr-2 h-3.5 w-3.5" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="border-gray-800 bg-surface-dark text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir post</DialogTitle>
            <DialogDescription className="text-gray-400">
              Tem certeza que deseja excluir o post{" "}
              <span className="font-medium text-white">"{title}"</span>? Essa
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="ghost"
              onClick={() => setDeleteOpen(false)}
              disabled={isPending}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
