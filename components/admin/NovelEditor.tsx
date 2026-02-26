"use client";

import { useState, useEffect } from "react";
import {
  EditorRoot,
  EditorContent,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorCommandList,
  EditorBubble,
  EditorBubbleItem,
  JSONContent,
  // extensões necessárias para o TipTap funcionar
  StarterKit,
  TiptapUnderline,
  Command,
  renderItems,
  createSuggestionItems,
  handleCommandNavigation,
  Placeholder,
} from "novel";
import type { Editor } from "@tiptap/core";
import { Bold, Italic, Underline, Strikethrough, Code } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Slash commands ─────────────────────────────────────────────────────────

const slashCommands = createSuggestionItems([
  {
    title: "Texto",
    description: "Parágrafo normal",
    icon: "¶",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: "Título 1",
    description: "Seção principal",
    icon: "H1",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
  },
  {
    title: "Título 2",
    description: "Subseção",
    icon: "H2",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    title: "Título 3",
    description: "Sub-subseção",
    icon: "H3",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    title: "Lista",
    description: "Lista com marcadores",
    icon: "•",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Lista numerada",
    description: "Lista ordenada",
    icon: "1.",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Citação",
    description: "Bloco de citação",
    icon: "❝",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Código",
    description: "Bloco de código",
    icon: "</>",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Separador",
    description: "Linha horizontal",
    icon: "—",
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
]);

// ── Extensões do TipTap ────────────────────────────────────────────────────
// StarterKit fornece o nó 'doc' (e paragraph, text, heading, etc.)
// que o TipTap exige obrigatoriamente para montar o schema.

const extensions = [
  StarterKit,
  TiptapUnderline,
  Placeholder.configure({
    placeholder: "Escreva algo ou use / para comandos…",
  }),
  Command.configure({
    suggestion: {
      items: ({ query }: { query: string }) =>
        slashCommands.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()),
        ),
      render: renderItems,
    },
  }),
];

// ── Bubble Menu items ──────────────────────────────────────────────────────

interface BubbleItem {
  name: string;
  icon: React.ReactNode;
  command: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
}

const bubbleItems: BubbleItem[] = [
  {
    name: "bold",
    icon: <Bold className="h-4 w-4" />,
    command: (e) => e.chain().focus().toggleBold().run(),
    isActive: (e) => e.isActive("bold"),
  },
  {
    name: "italic",
    icon: <Italic className="h-4 w-4" />,
    command: (e) => e.chain().focus().toggleItalic().run(),
    isActive: (e) => e.isActive("italic"),
  },
  {
    name: "underline",
    icon: <Underline className="h-4 w-4" />,
    command: (e) => e.chain().focus().toggleUnderline().run(),
    isActive: (e) => e.isActive("underline"),
  },
  {
    name: "strike",
    icon: <Strikethrough className="h-4 w-4" />,
    command: (e) => e.chain().focus().toggleStrike().run(),
    isActive: (e) => e.isActive("strike"),
  },
  {
    name: "code",
    icon: <Code className="h-4 w-4" />,
    command: (e) => e.chain().focus().toggleCode().run(),
    isActive: (e) => e.isActive("code"),
  },
];

// ── Props ──────────────────────────────────────────────────────────────────

interface NovelEditorProps {
  initialContent?: JSONContent;
  onChange?: (content: JSONContent) => void;
  className?: string;
}

// ── Componente ─────────────────────────────────────────────────────────────

export function NovelEditor({
  initialContent,
  onChange,
  className,
}: NovelEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "novel-editor min-h-[400px] w-full rounded-xl border border-gray-700 bg-gray-900",
          className,
        )}
      />
    );
  }

  return (
    <EditorRoot>
      <EditorContent
        immediatelyRender={false}
        initialContent={initialContent}
        extensions={extensions}
        className={cn(
          "novel-editor min-h-[400px] w-full rounded-xl border border-gray-700 bg-gray-900 px-6 py-5 text-gray-100",
          "focus-within:border-gray-600",
          // Prose styles inline (sem @tailwindcss/typography no editor)
          "[&_.ProseMirror]:outline-none",
          "[&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:text-white [&_.ProseMirror_h1]:mt-6 [&_.ProseMirror_h1]:mb-2",
          "[&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-semibold [&_.ProseMirror_h2]:text-white [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:mb-2",
          "[&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold [&_.ProseMirror_h3]:text-gray-200 [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-1",
          "[&_.ProseMirror_p]:leading-7 [&_.ProseMirror_p]:my-2",
          "[&_.ProseMirror_ul]:my-3 [&_.ProseMirror_ul]:ml-5 [&_.ProseMirror_ul]:list-disc",
          "[&_.ProseMirror_ol]:my-3 [&_.ProseMirror_ol]:ml-5 [&_.ProseMirror_ol]:list-decimal",
          "[&_.ProseMirror_li]:my-1",
          "[&_.ProseMirror_blockquote]:border-l-4 [&_.ProseMirror_blockquote]:border-primary [&_.ProseMirror_blockquote]:pl-4 [&_.ProseMirror_blockquote]:my-4 [&_.ProseMirror_blockquote]:text-gray-400 [&_.ProseMirror_blockquote]:italic",
          "[&_.ProseMirror_pre]:bg-gray-800 [&_.ProseMirror_pre]:rounded-lg [&_.ProseMirror_pre]:p-4 [&_.ProseMirror_pre]:my-4 [&_.ProseMirror_pre]:overflow-x-auto",
          "[&_.ProseMirror_code]:bg-gray-800 [&_.ProseMirror_code]:rounded [&_.ProseMirror_code]:px-1.5 [&_.ProseMirror_code]:py-0.5 [&_.ProseMirror_code]:text-sm [&_.ProseMirror_code]:text-primary",
          "[&_.ProseMirror_hr]:border-gray-700 [&_.ProseMirror_hr]:my-6",
          "[&_.ProseMirror_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_.is-editor-empty:first-child::before]:text-gray-600 [&_.ProseMirror_.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_.is-editor-empty:first-child::before]:absolute",
          className,
        )}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          attributes: {
            class: "outline-none",
          },
        }}
        onUpdate={({ editor }) => {
          onChange?.(editor.getJSON());
        }}
      >
        {/* ── Slash commands (/comando) ── */}
        <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-xl border border-gray-700 bg-surface-dark px-1 py-2 shadow-xl shadow-black/40">
          <EditorCommandEmpty className="px-3 py-2 text-sm text-gray-500">
            Nenhum resultado para este comando.
          </EditorCommandEmpty>
          <EditorCommandList>
            {slashCommands.map((item) => (
              <EditorCommandItem
                key={item.title}
                value={item.title}
                onCommand={item.command ?? ((_args) => {})}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 aria-selected:bg-gray-800"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-700 bg-gray-800 text-xs font-mono text-gray-400">
                  {item.icon}
                </span>
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        {/* ── Bubble menu (seleção de texto) ── */}
        <EditorBubble
          tippyOptions={{ duration: 100 }}
          className="flex overflow-hidden rounded-lg border border-gray-700 bg-surface-dark shadow-xl shadow-black/40"
        >
          {bubbleItems.map((item) => (
            <EditorBubbleItem
              key={item.name}
              onSelect={(editor) => item.command(editor)}
              className={cn(
                "flex h-8 w-8 cursor-pointer items-center justify-center transition-colors hover:bg-gray-700",
                "[&[data-active]]:bg-primary/20 [&[data-active]]:text-primary",
              )}
            >
              {item.icon}
            </EditorBubbleItem>
          ))}
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  );
}
