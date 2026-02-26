# Portfolio + Blog — Roadmap Completo

## Stack

- **Framework:** Next.js 15 (App Router)
- **Banco de dados:** PostgreSQL (Neon.tech)
- **ORM:** Prisma ORM v7
- **Auth:** NextAuth v5 (Auth.js)
- **Editor:** Novel.js (estilo Notion)
- **Upload:** Uploadthing
- **UI:** Tailwind CSS + Shadcn/ui
- **Deploy:** Vercel

---

## Milestone 1 — Setup do Projeto ✅

- [x] Criar novo projeto Next.js 15 com TypeScript
- [x] Instalar e configurar Shadcn/ui (button, input, label, card, badge, separator)
- [x] Definir paleta de cores e tema (dark/light) no `tailwind.config.cjs` — cores originais preservadas (`#10b981`, `#0a0a0a`, `#171717`, etc.)
- [x] Criar estrutura base de pastas (`app/`, `components/`, `lib/`, `drizzle/`, `hooks/`)
- [x] Configurar fonte Inter via `next/font/google` em `app/layout.tsx`
- [x] Criar `Dockerfile` multi-stage (deps → builder → runner)
- [x] Criar `docker-compose.yml` com Next.js + PostgreSQL local
- [x] Criar `.env.local.example` com todas as variáveis necessárias
- [x] Criar `lib/utils.ts` com `cn()`, `slugify()`, `readingTime()` e `formatDate()`
- [x] Pasta `src/` (componentes Vite) preservada como referência para o Milestone 6
- [x] Commit inicial na branch `develop`

---

## Milestone 2 — Banco de Dados e ORM ✅

> ⚠️ Ó **Prisma** é o ORM mais utilizado no mercado, não o Drizzle. Milestone implementado com Prisma 7.

- [x] Instalar Prisma ORM v7 (`@prisma/client`, `prisma`)
- [x] Criar schema em `prisma/schema.prisma` com models `Post` e `User`
- [x] Configurar `prisma.config.ts` com `DIRECT_URL` para migrations no Neon.tech
- [x] Criar `lib/db/index.ts` — singleton do Prisma Client
- [x] Criar `prisma/seed.ts` — cria usuário admin com senha hasheada (bcrypt)
- [x] Adicionar scripts no `package.json`: `db:generate`, `db:migrate`, `db:migrate:prod`, `db:studio`, `db:seed`, `db:reset`
- [x] Atualizar `.env.local` e `.env.local.example` com `DATABASE_URL`, `DIRECT_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- [x] ⏳ ~~Rodar migration (requer Docker Desktop ativo)~~ → **Concluído**
  - Migration `20260226010023` gerada e aplicada
  - Seed executado com sucesso — usuário admin criado
  - Nota técnica: Prisma 7 exige `@prisma/adapter-pg` no construtor (`prisma.config.ts` separa config CLI do runtime)

---

## Milestone 3 — Autenticação ✅

- [x] Instalar NextAuth v5
  ```bash
  npm install next-auth@beta
  # bcryptjs e @types/bcryptjs já estavam instalados
  ```
- [x] Criar `lib/auth.config.ts` — config edge-compatible (sem db) usada pelo middleware
- [x] Criar `lib/auth.ts` com provider Credentials (email + senha + bcrypt + db)
- [x] Criar rota `app/api/auth/[...nextauth]/route.ts`
- [x] Criar página de login `app/(admin)/login/page.tsx`
  - [x] Formulário com email e senha (`LoginForm.tsx` — client component)
  - [x] Validação client-side (campos obrigatórios)
  - [x] Feedback de erro de autenticação (via `useActionState` + server action)
- [x] Configurar `middleware.ts` para proteger todas as rotas `/admin/*`
  - [x] Split config: middleware usa `auth.config.ts` (Edge-compatible, sem Node.js APIs)
  - [x] Middleware: 207 kB → 86.6 kB após remover `pg` e `bcryptjs` do bundle
- [x] Criar `app/(admin)/layout.tsx` com header, email do usuário e botão de logout
- [x] Criar `app/(admin)/dashboard/page.tsx` com cards de estatísticas (total/publicados/rascunhos)
- [x] Criar `components/admin/LogoutButton.tsx` (client component com `signOut`)
- [x] Testar fluxo completo de login e logout — build ✅ limpo

---

## Milestone 4 — Painel Administrativo (Admin) ✅

> ⚠️ Reestruturação de routing: páginas admin movidas para `app/(admin)/admin/` para que as URLs fiquem em `/admin/*` (compatível com o middleware).

- [x] Criar `app/(admin)/admin/layout.tsx` — layout completo da área admin
  - [x] Sidebar fixa no desktop (largura 224px, logo, navegação, rodapé com email)
  - [x] Header mobile com email do usuário e botão de logout
  - [x] Layout adaptado para mobile (menu hamburguer via `Sheet` do Shadcn)
  - [x] Auth check server-side (redundância ao middleware)
- [x] Criar `components/admin/SidebarNav.tsx` — navegação com active state por rota
- [x] Criar `components/admin/MobileSidebarToggle.tsx` — Sheet mobile com `usePathname`
- [x] Criar `app/(admin)/admin/dashboard/page.tsx`
  - [x] Cards com total de posts, posts publicados e rascunhos
  - [x] Lista de 5 posts recentes com status
  - [x] Botão "Novo Post" e link "Ver todos"
- [x] Criar `app/(admin)/admin/posts/page.tsx` — lista de posts
  - [x] Tabela com título, slug, status (badge), tags, data de criação, data de publicação
  - [x] Ordenação por título, criado em, publicado em (via query params)
  - [x] Estado vazio com link para criar primeiro post
- [x] Criar `app/(admin)/admin/posts/_components/PostActions.tsx`
  - [x] Dropdown com Editar, Publicar/Despublicar e Excluir
  - [x] Dialog de confirmação para exclusão
  - [x] `useTransition` para feedback de loading
- [x] Criar `app/(admin)/admin/posts/actions.ts` — server actions (`deletePost`, `togglePublish`) com `revalidatePath`
- [x] Criar placeholders para Milestone 5: `posts/new/page.tsx` e `posts/[id]/page.tsx`
- [x] Criar APIs REST de CRUD de posts
  - [x] `GET /api/posts` — listar posts (com ordenação via query params)
  - [x] `POST /api/posts` — criar post (gera slug único, calcula readingTime)
  - [x] `PATCH /api/posts/[id]` — editar post
  - [x] `DELETE /api/posts/[id]` — excluir post
  - [x] `PATCH /api/posts/[id]/publish` — publicar/despublicar (toggle)
- [x] Instalar Shadcn components: `table`, `dropdown-menu`, `dialog`, `sheet`
- [x] Build ✅ limpo — rotas em `/admin/dashboard`, `/admin/posts`, `/api/posts`

---

## Milestone 5 — Editor de Posts

- [ ] Instalar Novel.js
  ```bash
  npm install novel
  ```
- [ ] Instalar Uploadthing para upload de imagens
  ```bash
  npm install uploadthing @uploadthing/react
  ```
- [ ] Criar componente `components/admin/Editor.tsx` com Novel
- [ ] Configurar rota de upload `app/api/uploadthing/route.ts`
- [ ] Criar página de novo post `app/(admin)/posts/new/page.tsx`
  - [ ] Campo de título
  - [ ] Upload de imagem de capa
  - [ ] Editor Novel (corpo do post)
  - [ ] Campo de tags (input com chips)
  - [ ] Campo de excerpt (resumo)
  - [ ] Geração automática de slug a partir do título
  - [ ] Botão salvar rascunho
  - [ ] Botão publicar
  - [ ] Auto-save a cada 3 segundos
- [ ] Criar página de editar post `app/(admin)/posts/[id]/page.tsx`
  - [ ] Carregar dados existentes no editor
  - [ ] Mesmos recursos da criação
- [ ] Testar fluxo completo no mobile (criar e editar post pelo celular)

---

## Milestone 6 — Portfolio (Área Pública)

> ✅ Os componentes já estão desenvolvidos no projeto Vite atual. Esta milestone cobre apenas a adaptação para Next.js — sem reescrita.

**Adaptações necessárias em todos os componentes:**

- Adicionar diretiva `"use client"` nos componentes que usam hooks (`useState`, `useContext`, etc.)
- Substituir `<img>` por `next/image` onde aplicável
- Ajustar imports de assets (`avatar.webp` via `public/` ou `next/image`)

**Contextos:**

- [ ] Migrar `ThemeContext.tsx` → ajustar `localStorage` com verificação de `typeof window` (SSR safe)
- [ ] Migrar `LanguageContext.tsx` → idem
- [ ] Migrar `translations.ts` e `types/index.ts` sem alterações

**Componentes (copiar e adaptar):**

- [ ] `Sidebar.tsx` → adicionar `"use client"`, trocar `<img>` por `next/image`
- [ ] `Card.tsx` → verificar necessidade de `"use client"`
- [ ] `About.tsx` → copiar sem alterações (usa apenas contexto)
- [ ] `Contact.tsx` → copiar sem alterações
- [ ] `Projects.tsx` → copiar sem alterações
- [ ] `Skills.tsx` → copiar sem alterações

**Página e layout:**

- [ ] Criar `app/(public)/page.tsx` replicando a lógica do `App.tsx` atual
- [ ] Criar `app/(public)/layout.tsx` com os providers (`ThemeProvider`, `LanguageProvider`)
- [ ] Mover `avatar.webp` para a pasta `public/` do Next.js
- [ ] Validar responsividade em mobile, tablet e desktop
- [ ] Conferir dark/light mode funcionando corretamente com Next.js

---

## Milestone 7 — Blog Público

- [ ] Criar lista de posts `app/(public)/blog/page.tsx`
  - [ ] Grid de cards com capa, título, excerpt, data e tags
  - [ ] Paginação
  - [ ] Filtro por tag
- [ ] Criar página de post individual `app/(public)/blog/[slug]/page.tsx`
  - [ ] Renderizar conteúdo JSON do Novel como HTML
  - [ ] Imagem de capa
  - [ ] Data de publicação formatada
  - [ ] Tags clicáveis
  - [ ] Tempo estimado de leitura
  - [ ] Botões de compartilhamento (Twitter/X, LinkedIn, copiar link)
  - [ ] Navegação para post anterior e próximo
- [ ] Estilizar conteúdo do post com `@tailwindcss/typography`
  ```bash
  npm install @tailwindcss/typography
  ```

---

## Milestone 8 — SEO

- [ ] Configurar `Metadata` do Next.js em todas as páginas
  - [ ] `title`, `description`, `keywords` na home
  - [ ] `title` e `description` dinâmicos por post (`generateMetadata`)
- [ ] Configurar Open Graph e Twitter Cards
  - [ ] Imagem OG da home (estática)
  - [ ] Imagem OG dinâmica por post com `next/og` (`app/api/og/route.tsx`)
- [ ] Criar `sitemap.xml` dinâmico (`app/sitemap.ts`)
  - [ ] Incluir home, /blog e todos os posts publicados
- [ ] Criar `robots.txt` (`app/robots.ts`)
  - [ ] Bloquear rotas `/admin/*`
- [ ] Configurar URL canônica em todas as páginas
- [ ] Instalar e configurar dados estruturados (JSON-LD)
  - [ ] `Person` schema na home
  - [ ] `BlogPosting` schema em cada post
  - [ ] `BreadcrumbList` schema no blog
- [ ] Garantir que posts tenham slug amigável (sem acentos, sem espaços)
- [ ] Adicionar alt text em todas as imagens
- [ ] Validar com Google Rich Results Test

---

## Milestone 9 — Performance e Acessibilidade

- [ ] Todas as páginas públicas com SSG ou ISR (sem client-side fetch)
- [ ] Configurar ISR nos posts (`revalidate: 60`)
- [ ] Otimizar Web Vitals (LCP, CLS, FID)
  - [ ] Imagens com `next/image` e `priority` no LCP
  - [ ] Evitar layout shift em fontes com `next/font`
  - [ ] Lazy load em componentes pesados
- [ ] Testar score no Lighthouse (meta: 90+ em todas as categorias)
- [ ] Garantir contraste de cores adequado (WCAG AA)
- [ ] Navegar todo o site pelo teclado (foco visível)
- [ ] Adicionar `aria-label` em botões e links sem texto

---

## Milestone 10 — Deploy e CI/CD

- [ ] Criar conta na Vercel e conectar ao repositório GitHub
- [ ] Configurar variáveis de ambiente na Vercel
  ```
  DATABASE_URL=
  NEXTAUTH_SECRET=
  NEXTAUTH_URL=
  UPLOADTHING_SECRET=
  UPLOADTHING_APP_ID=
  ```
- [ ] Configurar domínio customizado (ex: seudominio.com.br)
  - [ ] Configurar DNS
  - [ ] HTTPS automático pela Vercel
- [ ] Configurar deploy automático no push para `main`
- [ ] Criar branch `develop` para desenvolvimento
- [ ] Verificar se as migrations rodam corretamente no ambiente de produção
- [ ] Testar o fluxo completo em produção (criar post → visualizar no blog)

---

## Milestone 11 — Indexação e Descoberta

- [ ] Cadastrar o site no [Google Search Console](https://search.google.com/search-console)
- [ ] Submeter o `sitemap.xml` ao Google Search Console
- [ ] Cadastrar o site no [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Verificar se o Google está indexando as páginas
- [ ] Configurar Google Analytics 4 ou Plausible Analytics (privacy-friendly)
- [ ] Compartilhar o blog nas redes sociais para gerar primeiros backlinks
- [ ] Adicionar link do blog no perfil do LinkedIn e GitHub

---

## Milestone 12 — Polimento Final

- [ ] Revisar todos os textos e conteúdos do portfólio
- [ ] Criar ao menos 2 posts iniciais no blog (conteúdo real)
- [ ] Testar em dispositivos reais (iPhone, Android, tablet)
- [ ] Testar em Chrome, Firefox e Safari
- [ ] Verificar todos os links (nenhum quebrado)
- [ ] Revisar mensagens de erro e estados vazios (lista de posts vazia, etc.)
- [ ] Adicionar favicon e ícones PWA (`app/icon.tsx` ou arquivos estáticos)
- [ ] Fazer leitura final do README e atualizar se necessário

---

## Progresso Geral

| Milestone                        | Status                                     |
| -------------------------------- | ------------------------------------------ |
| 1 — Setup do Projeto             | ✅ Concluído                               |
| 2 — Banco de Dados e ORM         | ✅ Concluído                               |
| 3 — Autenticação                 | ✅ Concluído                               |
| 4 — Painel Administrativo        | ✅ Concluído                               |
| 5 — Editor de Posts              | ⬜ Não iniciado                            |
| 6 — Portfolio (Área Pública)     | 🟡 Componentes prontos (migração pendente) |
| 7 — Blog Público                 | ⬜ Não iniciado                            |
| 8 — SEO                          | ⬜ Não iniciado                            |
| 9 — Performance e Acessibilidade | ⬜ Não iniciado                            |
| 10 — Deploy e CI/CD              | ⬜ Não iniciado                            |
| 11 — Indexação e Descoberta      | ⬜ Não iniciado                            |
| 12 — Polimento Final             | ⬜ Não iniciado                            |
