import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { PostForm } from "../_components/PostForm"

export const metadata = {
  title: "Editar Post — Admin",
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const post = await db.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      excerpt: true,
      coverImage: true,
      tags: true,
      published: true,
    },
  })

  if (!post) notFound()

  return (
    <PostForm
      initialData={{
        id: post.id,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        coverImage: post.coverImage,
        tags: post.tags,
        published: post.published,
      }}
    />
  )
}
