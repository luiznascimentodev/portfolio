import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify, readingTime } from "@/lib/utils";

// GET /api/posts — lista todos os posts (requer auth)
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const orderBy = searchParams.get("orderBy") ?? "createdAt";
  const order = (searchParams.get("order") ?? "desc") as "asc" | "desc";

  const posts = await db.post.findMany({
    orderBy: { [orderBy]: order },
    select: {
      id: true,
      title: true,
      slug: true,
      published: true,
      tags: true,
      readingTime: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
      excerpt: true,
      coverImage: true,
    },
  });

  return NextResponse.json(posts);
}

// POST /api/posts — cria um novo post (requer auth)
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const body = await req.json();
  const { title, content, excerpt, coverImage, tags, published } = body;

  if (!title || !content) {
    return NextResponse.json(
      { error: "Título e conteúdo são obrigatórios" },
      { status: 400 },
    );
  }

  // Gera slug único
  let slug = slugify(title);
  const existing = await db.post.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  // Calcula reading time (content é JSON string do Novel)
  const text = typeof content === "string" ? content : JSON.stringify(content);
  const minutes = readingTime(text);

  const post = await db.post.create({
    data: {
      title,
      slug,
      content: text,
      excerpt: excerpt ?? null,
      coverImage: coverImage ?? null,
      tags: Array.isArray(tags) ? tags : [],
      readingTime: minutes,
      published: published ?? false,
      publishedAt: published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
