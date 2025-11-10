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
  
  // Parse YAML-like frontmatter
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value: any = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      
      // Convert numbers
      if (!isNaN(Number(value)) && value !== '') {
        value = Number(value);
      }
      
      metadata[key] = value;
    }
  });
  
  return { metadata, content: content.trim() };
}

/**
 * Parse a markdown file with multiple sections separated by ---
 * Each section can have its own frontmatter
 */
export function parseMultiSectionMarkdown(raw: string): ParsedMarkdownSection[] {
  // Split by --- that are on their own line
  const sections = raw.split(/\n---\n/).filter(s => s.trim());
  
  return sections.map(section => {
    const { metadata, content } = parseFrontmatter(section.trim());
    return {
      id: metadata.id || '',
      metadata,
      content
    };
  });
}

/**
 * Parse a single section markdown file
 */
export function parseSingleSectionMarkdown(raw: string): MarkdownContent {
  return parseFrontmatter(raw);
}
