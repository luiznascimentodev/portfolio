/**
 * Renderizador de TipTap/Novel JSON → HTML seguro (sem dependências extras).
 * Usado nas páginas públicas do blog para exibir o conteúdo dos posts.
 */

type TipTapMark = {
  type: string;
  attrs?: Record<string, unknown>;
};

type TipTapNode = {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: TipTapMark[];
  text?: string;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function renderNode(node: TipTapNode): string {
  switch (node.type) {
    case "doc":
      return (node.content ?? []).map(renderNode).join("");

    case "paragraph": {
      const inner = (node.content ?? []).map(renderNode).join("");
      return inner ? `<p>${inner}</p>` : "<p><br></p>";
    }

    case "heading": {
      const level = (node.attrs?.level as number) ?? 2;
      const inner = (node.content ?? []).map(renderNode).join("");
      return `<h${level}>${inner}</h${level}>`;
    }

    case "bulletList":
      return `<ul>${(node.content ?? []).map(renderNode).join("")}</ul>`;

    case "orderedList":
      return `<ol>${(node.content ?? []).map(renderNode).join("")}</ol>`;

    case "listItem":
      return `<li>${(node.content ?? []).map(renderNode).join("")}</li>`;

    case "blockquote":
      return `<blockquote>${(node.content ?? []).map(renderNode).join("")}</blockquote>`;

    case "codeBlock": {
      const lang = (node.attrs?.language as string) ?? "";
      const inner = (node.content ?? []).map(renderNode).join("");
      return `<pre><code${lang ? ` class="language-${lang}"` : ""}>${inner}</code></pre>`;
    }

    case "horizontalRule":
      return "<hr>";

    case "hardBreak":
      return "<br>";

    case "text": {
      let html = escapeHtml(node.text ?? "");
      for (const mark of node.marks ?? []) {
        switch (mark.type) {
          case "bold":
            html = `<strong>${html}</strong>`;
            break;
          case "italic":
            html = `<em>${html}</em>`;
            break;
          case "underline":
            html = `<u>${html}</u>`;
            break;
          case "strike":
            html = `<s>${html}</s>`;
            break;
          case "code":
            html = `<code>${html}</code>`;
            break;
          case "link": {
            const href = escapeHtml((mark.attrs?.href as string) ?? "#");
            const target = (mark.attrs?.target as string) ?? "_blank";
            html = `<a href="${href}" target="${target}" rel="noopener noreferrer">${html}</a>`;
            break;
          }
        }
      }
      return html;
    }

    default:
      return (node.content ?? []).map(renderNode).join("");
  }
}

/**
 * Converte o JSON armazenado pelo Novel/TipTap em HTML seguro.
 * Retorna string vazia se o JSON for inválido.
 */
export function tiptapToHtml(json: string | object): string {
  try {
    const doc: TipTapNode = typeof json === "string" ? JSON.parse(json) : json;
    return renderNode(doc);
  } catch {
    return "";
  }
}

/**
 * Extrai texto puro de um JSON TipTap (para excerpt / SEO).
 */
export function tiptapToText(json: string | object): string {
  try {
    const doc: TipTapNode = typeof json === "string" ? JSON.parse(json) : json;
    const extractText = (node: TipTapNode): string => {
      if (node.type === "text") return node.text ?? "";
      return (node.content ?? []).map(extractText).join(" ");
    };
    return extractText(doc).replace(/\s+/g, " ").trim();
  } catch {
    return "";
  }
}
