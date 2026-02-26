import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { readingTime } from "@/lib/utils";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/posts/[id] — edita um post (requer auth)
export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const { title, content, excerpt, coverImage, tags } = body;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  const text =
    content !== undefined
      ? typeof content === "string"
        ? content
        : JSON.stringify(content)
      : undefined;

  const post = await db.post.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(text !== undefined && {
        content: text,
        readingTime: readingTime(text),
      }),
      ...(excerpt !== undefined && { excerpt }),
      ...(coverImage !== undefined && { coverImage }),
      ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : [] }),
    },
  });

  return NextResponse.json(post);
}

// DELETE /api/posts/[id] — exclui um post (requer auth)
export async function DELETE(req: NextRequest, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const existing = await db.post.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Post não encontrado" }, { status: 404 });
  }

  await db.post.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
