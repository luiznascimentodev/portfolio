# Copilot Instructions — Portfolio + Blog

## Stack

Next.js 15 (App Router) · TypeScript · PostgreSQL (Neon.tech) · Prisma ORM v7 · NextAuth v5 · Novel.js editor · Uploadthing · Tailwind CSS + Shadcn/ui · Docker · Vercel

## Architecture

Dois route groups no App Router:

- `app/(public)/` — portfólio single-page + blog público (sem auth)
- `app/(admin)/admin/` — CMS protegido; URLs em `/admin/*`

O portfólio é uma SPA com seções (`about`, `projects`, `contact`, `skills`) gerenciadas por estado local em [`components/portfolio/PortfolioApp.tsx`](../components/portfolio/PortfolioApp.tsx). Cada seção fica em `components/portfolio/sections/`.

A seção **Projects** busca repos "starred" do GitHub via API pública e extrai metadados de comentários HTML no README (`<!-- PROJECT_TITLE_START -->`, `<!-- PROJECT_TECH_START -->`, etc.).

## Auth — padrão crítico

A autenticação usa **split config** obrigatório:

- [`lib/auth.config.ts`](../lib/auth.config.ts) — edge-compatible, **sem** `db` ou `bcryptjs`; usado pelo `middleware.ts`
- [`lib/auth.ts`](../lib/auth.ts) — config completa com Credentials provider (db + bcrypt); usado nas server actions e páginas server-side

**Nunca** importar `lib/auth.ts` no middleware. Violar isso quebra o bundle do Edge Runtime.

## Banco de dados

Prisma 7 com PostgreSQL. Schema em [`prisma/schema.prisma`](../prisma/schema.prisma) — modelos `User` e `Post`.

`prisma.config.ts` separa a config do CLI (com `DIRECT_URL`) do runtime. O singleton do client está em [`lib/db/index.ts`](../lib/db/index.ts).

## i18n

Português e inglês via `LanguageContext`. Sempre usar o hook `useLanguage()` e adicionar novas strings em [`constants/translations.ts`](../constants/translations.ts) — **nunca hardcodear texto** nos componentes públicos.

## Componentes

- **UI primitivos** (`components/ui/`): gerados via Shadcn/ui — não editar manualmente
- **Admin** (`components/admin/`): `"use client"` onde necessário (ex.: `SidebarNav`, `LogoutButton`)
- **Portfolio** (`components/portfolio/`): seções são client components com `useLanguage()`

## Convenções

- Server Actions em `actions.ts` co-localizadas na pasta da feature (ex.: `app/(admin)/admin/posts/actions.ts`); sempre chamar `revalidatePath` após mutações
- Formulários admin usam `useActionState` para feedback de loading/erro
- Estilos: `cn()` de `lib/utils.ts` para classes condicionais Tailwind
- Cor primária: `#10b981` (definida em `tailwind.config.cjs` como `primary`)

## Build e Scripts

```bash
npm run dev               # servidor de desenvolvimento
npm run build             # prisma generate + next build
npm run db:migrate        # nova migration (dev)
npm run db:migrate:prod   # deploy de migrations (produção)
npm run db:seed           # cria usuário admin (lê .env.local)
npm run db:studio         # Prisma Studio visual
```

## Variáveis de ambiente

Requeridas em `.env.local`: `DATABASE_URL`, `DIRECT_URL` (Neon.tech), `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `UPLOADTHING_TOKEN`.

## SEO — JSON-LD e Metadata

### Componentes JSON-LD (`components/seo/`)

| Componente | Schema.org type | Onde usar |
|---|---|---|
| [`PersonJsonLd`](../components/seo/PersonJsonLd.tsx) | `Person` | `app/(public)/page.tsx` (homepage) |
| [`BlogPostingJsonLd`](../components/seo/BlogPostingJsonLd.tsx) | `BlogPosting` | `app/(public)/blog/[slug]/page.tsx` |
| [`BreadcrumbJsonLd`](../components/seo/BreadcrumbJsonLd.tsx) | `BreadcrumbList` | Páginas internas (blog listing + post) |

Todos os componentes são **server components** que injetam `<script type="application/ld+json">` via `dangerouslySetInnerHTML`. A constante `BASE_URL` é lida de `process.env.NEXT_PUBLIC_SITE_URL` com fallback `"https://luifelippe.dev"`.

### Padrão de uso — post do blog

```tsx
// app/(public)/blog/[slug]/page.tsx
<BlogPostingJsonLd
  title={post.title}
  slug={post.slug}
  description={post.excerpt}
  coverImage={post.coverImage}
  publishedAt={post.publishedAt}
  updatedAt={post.updatedAt}
  tags={post.tags}
  readingTime={post.readingTime}  // serializado como ISO 8601: PT{n}M
/>
<BreadcrumbJsonLd
  items={[
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]}
/>
```

### Open Graph Image dinâmica (`/api/og`)

Rota edge (`app/api/og/route.tsx`) gera imagens OG via `ImageResponse` (next/og). Parâmetros via query string:

- `title` — título da página
- `description` — subtítulo/descrição
- `type` — `"website"` (default) ou `"post"`

Uso: `/api/og?type=post&title=...&description=...`

Posts com `coverImage` definida usam a imagem diretamente; sem ela, delegam ao `/api/og`.

### Metadata estático vs dinâmico

- **Páginas estáticas** (`/`, `/blog`): `export const metadata: Metadata = { ... }` no topo do arquivo
- **Páginas dinâmicas** (`/blog/[slug]`): `export async function generateMetadata({ params })` que consulta o banco
- ISR habilitado nos posts: `export const revalidate = 60` (revalida a cada 60 s)

### Outros arquivos SEO

- [`app/sitemap.ts`](../app/sitemap.ts) — sitemap dinâmico; prioridades: homepage `1.0` → `/blog` `0.9` → posts `0.8` (changeFrequency `weekly`)
- [`app/robots.ts`](../app/robots.ts) — bloqueia `/admin/` e `/api/`; expõe `sitemap.xml`

## Deploy

Docker multi-stage em [`Dockerfile`](../Dockerfile) + [`docker-compose.yml`](../docker-compose.yml) (Next.js + PostgreSQL local). Produção via Vercel com PostgreSQL no Neon.tech.
