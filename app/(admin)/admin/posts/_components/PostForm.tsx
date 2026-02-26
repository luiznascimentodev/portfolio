"use client";

import { useState, useCallback, useEffect, useRef, useTransition } from "react";
import type { JSONContent } from "novel";
import { NovelEditor } from "@/components/admin/NovelEditor";
import { TagInput } from "@/components/admin/TagInput";
import { CoverImageUpload } from "@/components/admin/CoverImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugify, readingTime } from "@/lib/utils";
import { Save, Send, EyeOff, Loader2, CheckCircle2, Clock } from "lucide-react";
import { createPost, updatePost, autoSave } from "../editor-actions";

// ── Tipos ──────────────────────────────────────────────────────────────────

interface PostFormProps {
  /** Quando presente, entra em modo de edição */
  initialData?: {
    id: string;
    title: string;
    content: string; // JSON string
    excerpt?: string | null;
    coverImage?: string | null;
    tags: string[];
    published: boolean;
  };
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

// ── Componente principal ───────────────────────────────────────────────────

export function PostForm({ initialData }: PostFormProps) {
  const isEdit = !!initialData;
  const savedIdRef = useRef<string | null>(initialData?.id ?? null);

  // Estado do formulário
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [content, setContent] = useState<JSONContent>(
    initialData?.content
      ? (JSON.parse(initialData.content) as JSONContent)
      : { type: "doc", content: [{ type: "paragraph" }] },
  );
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [coverImage, setCoverImage] = useState<string | null>(
    initialData?.coverImage ?? null,
  );
  const [tags, setTags] = useState<string[]>(initialData?.tags ?? []);

  // Estado de UI
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [isPendingAction, startActionTransition] = useTransition();

  // Slug preview
  const slugPreview = slugify(title);

  // ── Auto-save ──────────────────────────────────────────────────────────
  const autoSaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    autoSaveTimerRef.current = setTimeout(async () => {
      if (!title && !content) return;
      setSaveStatus("saving");
      try {
        const id = await autoSave(savedIdRef.current, {
          title,
          content,
          excerpt,
          coverImage,
          tags,
        });
        savedIdRef.current = id;
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2500);
      } catch {
        setSaveStatus("error");
      }
    }, 3000);
  }, [title, content, excerpt, coverImage, tags]);

  // Dispara auto-save ao alterar título ou conteúdo
  useEffect(() => {
    triggerAutoSave();
    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [triggerAutoSave]);

  // ── Ações de submit ────────────────────────────────────────────────────

  function handleSaveDraft() {
    startActionTransition(async () => {
      setSaveStatus("saving");
      try {
        if (isEdit) {
          await updatePost(initialData!.id, {
            title,
            content,
            excerpt,
            coverImage,
            tags,
            publish: false,
          });
        } else {
          await createPost({
            title,
            content,
            excerpt,
            coverImage,
            tags,
            publish: false,
          });
        }
        setSaveStatus("saved");
      } catch {
        setSaveStatus("error");
      }
    });
  }

  function handlePublish() {
    startActionTransition(async () => {
      if (isEdit) {
        await updatePost(initialData!.id, {
          title,
          content,
          excerpt,
          coverImage,
          tags,
          publish: true,
        });
      } else {
        await createPost({
          title,
          content,
          excerpt,
          coverImage,
          tags,
          publish: true,
        });
      }
    });
  }

  function handleUnpublish() {
    startActionTransition(async () => {
      if (isEdit) {
        await updatePost(initialData!.id, {
          title,
          content,
          excerpt,
          coverImage,
          tags,
          publish: false,
        });
      }
    });
  }

  const isPublished = initialData?.published ?? false;

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Barra superior */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-white">
            {isEdit ? "Editar Post" : "Novo Post"}
          </h1>
          {title && (
            <p className="mt-0.5 text-xs text-gray-500">/{slugPreview}</p>
          )}
        </div>

        {/* Status de auto-save + botões */}
        <div className="flex items-center gap-2">
          {/* Indicador de save status */}
          {saveStatus === "saving" && (
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Salvando...
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1.5 text-xs text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Salvo
            </span>
          )}
          {saveStatus === "idle" && savedIdRef.current && (
            <span className="flex items-center gap-1.5 text-xs text-gray-600">
              <Clock className="h-3.5 w-3.5" />
              Auto-save ativo
            </span>
          )}

          {/* Salvar rascunho */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleSaveDraft}
            disabled={isPendingAction}
            className="border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
          >
            {isPendingAction ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="mr-2 h-3.5 w-3.5" />
            )}
            Salvar rascunho
          </Button>

          {/* Publicar / Despublicar */}
          {isEdit && isPublished ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleUnpublish}
              disabled={isPendingAction}
              className="border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
            >
              <EyeOff className="mr-2 h-3.5 w-3.5" />
              Despublicar
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={handlePublish}
              disabled={isPendingAction || !title}
              className="bg-primary hover:bg-primary-dark text-white disabled:opacity-50"
            >
              <Send className="mr-2 h-3.5 w-3.5" />
              Publicar
            </Button>
          )}
        </div>
      </div>

      {/* Grid: editor (esquerda) + sidebar (direita) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
        {/* ── Coluna principal ── */}
        <div className="space-y-4">
          {/* Título */}
          <div className="space-y-1.5">
            <Label
              htmlFor="title"
              className="text-sm font-medium text-gray-300"
            >
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do post..."
              className="border-gray-700 bg-gray-900 text-white text-lg placeholder:text-gray-600 focus:border-gray-600"
            />
          </div>

          {/* Editor Novel */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-300">
              Conteúdo <span className="text-red-500">*</span>
            </Label>
            <p className="text-xs text-gray-600">
              Digite{" "}
              <kbd className="rounded bg-gray-800 px-1 py-0.5 text-gray-400">
                /
              </kbd>{" "}
              para ver os comandos disponíveis.
            </p>
            <NovelEditor
              initialContent={
                initialData?.content
                  ? (JSON.parse(initialData.content) as JSONContent)
                  : undefined
              }
              onChange={setContent}
            />
            <p className="text-right text-xs text-gray-600">
              ~{readingTime(JSON.stringify(content))} min de leitura
            </p>
          </div>
        </div>

        {/* ── Sidebar de metadados ── */}
        <div className="space-y-5">
          {/* Imagem de capa */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-300">
              Imagem de capa
            </Label>
            <CoverImageUpload value={coverImage} onChange={setCoverImage} />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <Label
              htmlFor="excerpt"
              className="text-sm font-medium text-gray-300"
            >
              Resumo (excerpt)
            </Label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              maxLength={300}
              placeholder="Um resumo curto do post (aparece nos cards do blog)..."
              className="w-full resize-none rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-600 focus:border-gray-600 focus:outline-none"
            />
            <p className="text-right text-xs text-gray-600">
              {excerpt.length}/300
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium text-gray-300">Tags</Label>
            <TagInput
              value={tags}
              onChange={setTags}
              placeholder="next.js, react, typescript..."
            />
            <p className="text-xs text-gray-600">
              Pressione{" "}
              <kbd className="rounded bg-gray-800 px-1 py-0.5 text-gray-400">
                Enter
              </kbd>{" "}
              ou{" "}
              <kbd className="rounded bg-gray-800 px-1 py-0.5 text-gray-400">
                ,
              </kbd>{" "}
              para adicionar
            </p>
          </div>

          {/* Status atual */}
          {isEdit && (
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-3">
              <p className="text-xs font-medium text-gray-400">Status atual</p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isPublished ? "bg-primary" : "bg-gray-600"
                  }`}
                />
                <span className="text-sm text-white">
                  {isPublished ? "Publicado" : "Rascunho"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
