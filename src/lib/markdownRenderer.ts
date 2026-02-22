const SPECIAL_LINE = /^(##|###)\s|^-\s|^\d+\.\s|^\||^```|^!\[/;
const INLINE_TOKEN =
  /(!\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function splitTableRow(line: string): string[] {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  return trimmed.split('|').map((cell) => cell.trim());
}

function isMarkdownSeparatorRow(line: string): boolean {
  const cells = splitTableRow(line);
  if (cells.length === 0) return false;
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function parseInline(text: string): string {
  const tokens = text.split(INLINE_TOKEN).filter(Boolean);

  return tokens
    .map((token) => {
      const imageMatch = token.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const [, alt, src] = imageMatch;
        return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt || '')}" loading="lazy" decoding="async" class="my-4 w-full rounded-lg border border-border bg-card" />`;
      }

      if (token.startsWith('http://') || token.startsWith('https://')) {
        const href = escapeAttribute(token);
        return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-accent hover:text-accent/80 underline underline-offset-2 break-all">${escapeHtml(token)}</a>`;
      }

      if (token.startsWith('`') && token.endsWith('`')) {
        return `<code class="px-1.5 py-0.5 rounded bg-secondary text-sm">${escapeHtml(token.slice(1, -1))}</code>`;
      }

      if (token.startsWith('**') && token.endsWith('**')) {
        return `<strong class="font-semibold">${escapeHtml(token.slice(2, -2))}</strong>`;
      }

      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        const external = href.startsWith('http');
        const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${escapeAttribute(href)}"${target} class="text-accent hover:text-accent/80 underline underline-offset-2">${escapeHtml(label)}</a>`;
      }

      return escapeHtml(token);
    })
    .join('');
}

export function renderMarkdown(content: string): string {
  const lines = content.split('\n');
  const blocks: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const loopStart = i;
    const rawLine = lines[i];
    const line = rawLine.trim();

    if (!line) {
      i += 1;
      continue;
    }

    if (line.startsWith('# ')) {
      i += 1;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push(`<h2 class="text-2xl sm:text-3xl font-semibold mt-10 mb-4">${escapeHtml(line.slice(3))}</h2>`);
      i += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push(`<h3 class="text-xl sm:text-2xl font-semibold mt-8 mb-3">${escapeHtml(line.slice(4))}</h3>`);
      i += 1;
      continue;
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i += 1;

      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }

      if (i < lines.length) i += 1;

      blocks.push(
        `<pre class="overflow-x-auto rounded-lg bg-secondary p-4 text-sm leading-relaxed my-4"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`,
      );
      continue;
    }

    if (line.startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i += 1;
      }

      if (tableLines.length >= 2 && isMarkdownSeparatorRow(tableLines[1])) {
        const headers = splitTableRow(tableLines[0]);
        const bodyRows = tableLines.slice(2).map((row) => splitTableRow(row));

        const thead = headers
          .map(
            (header) =>
              `<th class="text-left p-3 border-b border-border font-semibold">${parseInline(header)}</th>`,
          )
          .join('');

        const tbody = bodyRows
          .map((row) => {
            const cells = headers
              .map(
                (_, colIdx) =>
                  `<td class="p-3 align-top">${parseInline(row[colIdx] ?? '')}</td>`,
              )
              .join('');
            return `<tr class="border-b border-border last:border-b-0">${cells}</tr>`;
          })
          .join('');

        blocks.push(
          `<div class="overflow-x-auto my-6"><table class="min-w-full border border-border rounded-lg overflow-hidden text-sm"><thead class="bg-secondary"><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table></div>`,
        );
      } else {
        blocks.push(
          `<pre class="overflow-x-auto rounded-lg bg-secondary p-4 text-sm leading-relaxed my-4">${escapeHtml(tableLines.join('\n'))}</pre>`,
        );
      }

      continue;
    }

    const imageLineMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageLineMatch) {
      const [, alt, src] = imageLineMatch;
      const caption = alt
        ? `<figcaption class="mt-2 text-sm text-muted-foreground">${escapeHtml(alt)}</figcaption>`
        : '';
      blocks.push(
        `<figure class="my-6"><img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt || '')}" loading="lazy" decoding="async" class="w-full rounded-lg border border-border bg-card" />${caption}</figure>`,
      );
      i += 1;
      continue;
    }

    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i += 1;
      }

      blocks.push(
        `<ul class="list-disc pl-6 my-4 space-y-2">${items
          .map((item) => `<li>${parseInline(item)}</li>`)
          .join('')}</ul>`,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
        i += 1;
      }

      blocks.push(
        `<ol class="list-decimal pl-6 my-4 space-y-2">${items
          .map((item) => `<li>${parseInline(item)}</li>`)
          .join('')}</ol>`,
      );
      continue;
    }

    const paragraphLines: string[] = [line];
    i += 1;

    while (i < lines.length) {
      const next = lines[i].trim();
      if (!next || SPECIAL_LINE.test(next) || next.startsWith('# ')) break;
      paragraphLines.push(next);
      i += 1;
    }

    blocks.push(
      `<p class="text-base sm:text-lg leading-relaxed my-4">${parseInline(paragraphLines.join(' '))}</p>`,
    );

    if (i === loopStart) {
      i += 1;
    }
  }

  return blocks.join('');
}
