export interface MarkdownContent {
  metadata: Record<string, any>;
  content: string;
}

export interface ParsedMarkdownSection extends MarkdownContent {
  id: string;
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(text: string): { metadata: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = text.match(frontmatterRegex);
  
  if (!match) {
    return { metadata: {}, content: text };
  }
  
  const [, frontmatter, content] = match;
  const metadata: Record<string, any> = {};
  let currentArrayKey = '';
  
  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const listItem = line.match(/^\s*-\s+(.+)$/);
    if (listItem && currentArrayKey) {
      metadata[currentArrayKey].push(parseFrontmatterValue(listItem[1].trim()));
      return;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const rawValue = line.substring(colonIndex + 1).trim();
      const value = rawValue === '' ? [] : parseFrontmatterValue(rawValue);
      
      metadata[key] = value;
      currentArrayKey = rawValue === '' ? key : '';
    }
  });
  
  return { metadata, content: content.trim() };
}

function parseFrontmatterValue(value: string): any {
  if (value.startsWith('[') && value.endsWith(']')) {
    const arrayContent = value.slice(1, -1);
    return arrayContent.split(',').map((item: string) => item.trim());
  }

  if ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  if (value === 'true') {
    return true;
  }

  if (value === 'false') {
    return false;
  }

  if (!isNaN(Number(value)) && value !== '') {
    return Number(value);
  }

  return value;
}

/**
 * Parse a markdown file with multiple sections separated by frontmatter blocks
 * Each section is: ---\nfrontmatter\n---\ncontent
 */
export function parseMultiSectionMarkdown(raw: string): ParsedMarkdownSection[] {
  const sections: ParsedMarkdownSection[] = [];

  // Find all frontmatter blocks and compute content ranges manually for robustness
  const fmRegex = /---\s*\n([\s\S]*?)\n---\s*/g;
  const blocks: { front: string; contentStart: number; blockStart: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = fmRegex.exec(raw)) !== null) {
    blocks.push({
      front: match[1] || '',
      contentStart: fmRegex.lastIndex,
      blockStart: match.index,
    });
  }

  for (let i = 0; i < blocks.length; i++) {
    const current = blocks[i];
    const next = blocks[i + 1];
    const body = raw.slice(current.contentStart, next ? next.blockStart : raw.length);

    const { metadata, content } = parseFrontmatter(`---\n${current.front}\n---\n${body}`);

    sections.push({
      id: (metadata.id as string) || '',
      metadata,
      content,
    });
  }

  return sections;
}

/**
 * Parse a single section markdown file
 */
export function parseSingleSectionMarkdown(raw: string): MarkdownContent {
  return parseFrontmatter(raw);
}
