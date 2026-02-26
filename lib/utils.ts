import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Converte título em slug amigável para URL (sem acentos, sem espaços) */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Estima o tempo de leitura de um texto (palavras / 200 ppm) */
export function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

/** Formata data no padrão brasileiro */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
