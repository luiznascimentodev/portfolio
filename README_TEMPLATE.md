# README Template — Portfolio Projects

> Copie este template para o README.md de qualquer repositório que você queira exibir
> na seção **Projects** do portfólio. Preencha cada bloco entre as tags HTML e remova
> as instruções em itálico antes de publicar.

---

<!-- PROJECT_TITLE_START -->

Nome do Projeto

<!-- PROJECT_TITLE_END -->

<!-- PROJECT_TAG_START -->

Descrição curta e objetiva do projeto. Máximo recomendado: 2–3 frases. Este texto
aparece no card da grade e no topo do modal. Evite marcadores, imagens ou links aqui —
apenas texto simples para melhor exibição.

<!-- PROJECT_TAG_END -->

---

## Preview

> Coloque a imagem de capa em um dos caminhos abaixo (o portfólio busca nesta ordem):
> `main.png` · `screenshots/main.png` · `screenshots/preview.png` · `preview.png`
> `screenshot.png` · `docs/preview.png` · `assets/preview.png` · `.github/preview.png`
>
> A imagem abaixo também serve como fallback extraído do README:

![Preview do projeto](screenshots/preview.png)

---

## Tecnologias

<!-- PROJECT_TECH_START -->

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

<!-- PROJECT_TECH_END -->

> **Dica:** Use badges do shields.io sempre que possível — o portfólio extrai o nome
> automaticamente do texto alternativo `![NomeDaTec](url)`. Até 3 aparecem no card;
> o restante fica visível apenas no modal.
>
> Se preferir texto simples, separe por vírgula:
> `TypeScript, Next.js, React, PostgreSQL, Tailwind CSS`

---

## Destaques

<!-- PROJECT_HIGHLIGHTS_START -->

✅ Funcionalidade principal que diferencia o projeto
✅ Performance ou métrica relevante (ex.: 100% no Lighthouse)
✅ Outro diferencial técnico ou de produto
✅ Padrão de arquitetura ou boa prática adotada
✅ Integração ou API externa utilizada

<!-- PROJECT_HIGHLIGHTS_END -->

> Cada linha vira um item de destaque no modal. Use emojis para melhor legibilidade.
> Mantenha entre 3 e 6 itens para não sobrecarregar visualmente.

---

## Demo

<!-- PROJECT_DEMO_START -->

https://seu-projeto.vercel.app

<!-- PROJECT_DEMO_END -->

> Cole apenas a URL, sem markdown. Aparece no botão "Ver Demo" dentro do modal.
> Deixe em branco (remova o conteúdo entre as tags) se não houver deploy público.

---

## Sobre o Projeto

Seção livre — escreva uma descrição mais detalhada, contexto, motivação e decisões
técnicas. Este conteúdo **não** é consumido pelo portfólio, mas é importante para
visitantes do GitHub e para o SEO do repositório.

---

## Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## Variáveis de Ambiente

| Variável          | Descrição                     | Obrigatória |
| ----------------- | ----------------------------- | ----------- |
| `DATABASE_URL`    | String de conexão com o banco | ✅          |
| `NEXT_PUBLIC_URL` | URL pública da aplicação      | ✅          |
| `API_KEY`         | Chave de API externa          | ⚠️ opcional |

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
