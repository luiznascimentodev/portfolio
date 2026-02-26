import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/posts/[id]/publish — publica ou despublica um post (requer auth)
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  const newPublished = !existing.published;

  const post = await db.post.update({
    where: { id },
    data: {
      published: newPublished,
      publishedAt: newPublished ? (existing.publishedAt ?? new Date()) : null,
    },
    select: {
      id: true,
      published: true,
      publishedAt: true,
    },
  });

  return NextResponse.json(post);
}
