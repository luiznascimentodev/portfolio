"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { slugify, readingTime } from "@/lib/utils"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { JSONContent } from "novel"

interface PostData {
  title: string
  content: JSONContent
  excerpt?: string
  coverImage?: string | null
  tags?: string[]
  publish?: boolean
}

// ── Criar post ─────────────────────────────────────────────────────────────

export async function createPost(data: PostData) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")

  const { title, content, excerpt, coverImage, tags, publish } = data

  if (!title?.trim()) throw new Error("Título é obrigatório")

  const contentStr = JSON.stringify(content)
  let slug = slugify(title)

  // Garante slug único
  const existing = await db.post.findUnique({ where: { slug } })
  if (existing) slug = `${slug}-${Date.now()}`

  const post = await db.post.create({
    data: {
      title: title.trim(),
      slug,
      content: contentStr,
      excerpt: excerpt?.trim() || null,
      coverImage: coverImage || null,
      tags: tags ?? [],
      readingTime: readingTime(contentStr),
      published: publish ?? false,
      publishedAt: publish ? new Date() : null,
    },
  })

  revalidatePath("/admin/posts")
  revalidatePath("/admin/dashboard")
  revalidatePath("/blog")

  redirect(`/admin/posts/${post.id}`)
}

// ── Atualizar post ─────────────────────────────────────────────────────────

export async function updatePost(id: string, data: PostData & { publish?: boolean }) {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")

  const { title, content, excerpt, coverImage, tags, publish } = data

  const existing = await db.post.findUnique({ where: { id } })
  if (!existing) throw new Error("Post não encontrado")

  const contentStr = JSON.stringify(content)

  const willPublish = publish === true
  const willUnpublish = publish === false

  await db.post.update({
    where: { id },
    data: {
      title: title.trim(),
      content: contentStr,
      excerpt: excerpt?.trim() || null,
      coverImage: coverImage || null,
      tags: tags ?? [],
      readingTime: readingTime(contentStr),
      ...(willPublish && {
        published: true,
        publishedAt: existing.publishedAt ?? new Date(),
      }),
      ...(willUnpublish && {
        published: false,
      }),
    },
  })

  revalidatePath("/admin/posts")
  revalidatePath("/admin/dashboard")
  revalidatePath("/blog")
  revalidatePath(`/blog/${existing.slug}`)
}

// ── Auto-save ──────────────────────────────────────────────────────────────

export async function autoSave(id: string | null, data: PostData): Promise<string> {
  const session = await auth()
  if (!session?.user) throw new Error("Não autorizado")

  const { title, content, excerpt, coverImage, tags } = data
  const contentStr = JSON.stringify(content)

  if (id) {
    const existing = await db.post.findUnique({ where: { id } })
    if (existing) {
      await db.post.update({
        where: { id },
        data: {
          title: title?.trim() || existing.title,
          content: contentStr,
          excerpt: excerpt?.trim() || null,
          coverImage: coverImage || null,
          tags: tags ?? [],
          readingTime: readingTime(contentStr),
        },
      })
      return id
    }
  }

  // Cria rascunho novo se não existe ainda
  let slug = slugify(title || "rascunho")
  const existingSlug = await db.post.findUnique({ where: { slug } })
  if (existingSlug) slug = `${slug}-${Date.now()}`

  const post = await db.post.create({
    data: {
      title: title?.trim() || "Rascunho sem título",
      slug,
      content: contentStr,
      excerpt: excerpt?.trim() || null,
      coverImage: coverImage || null,
      tags: tags ?? [],
      readingTime: readingTime(contentStr),
      published: false,
      publishedAt: null,
    },
  })

  revalidatePath("/admin/posts")
  return post.id
}
