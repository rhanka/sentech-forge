import matter from 'gray-matter';

export interface MarkdownContent {
  metadata: Record<string, any>;
  content: string;
}

export interface ParsedMarkdownSection extends MarkdownContent {
  id: string;
}

/**
 * Parse a markdown file with multiple sections separated by ---
 * Each section can have its own frontmatter
 */
export function parseMultiSectionMarkdown(raw: string): ParsedMarkdownSection[] {
  // Split by --- that are on their own line
  const sections = raw.split(/\n---\n/).filter(s => s.trim());
  
  return sections.map(section => {
    const { data, content } = matter(section.trim());
    return {
      id: data.id || '',
      metadata: data,
      content: content.trim()
    };
  });
}

/**
 * Parse a single section markdown file
 */
export function parseSingleSectionMarkdown(raw: string): MarkdownContent {
  const { data, content } = matter(raw);
  return {
    metadata: data,
    content: content.trim()
  };
}
