"use server";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deletePost(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado");

  await db.post.delete({ where: { id } });
  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
}

export async function togglePublish(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado");

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) throw new Error("Post não encontrado");

  const newPublished = !existing.published;

  await db.post.update({
    where: { id },
    data: {
      published: newPublished,
      publishedAt: newPublished ? (existing.publishedAt ?? new Date()) : null,
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath("/admin/dashboard");
}
