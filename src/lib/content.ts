import {
  parseMultiSectionMarkdown,
  parseSingleSectionMarkdown,
  type MarkdownContent,
  type ParsedMarkdownSection,
} from '@/lib/markdownLoader';

export type Locale = 'fr' | 'en';

export interface ServiceItem {
  id: string;
  icon: string;
  order: number;
  clickable?: boolean;
  scrollTo?: string;
  title: string;
  description: string;
}

export interface SectorItem {
  id: string;
  icon: string;
  order: number;
  title: string;
  description: string;
}

export interface ValueItem {
  id: string;
  icon: string;
  order: number;
  title: string;
  description: string;
}

export interface EngagementItem {
  id: string;
  icon: string;
  order: number;
  features?: string[];
  title: string;
  description: string;
}

export interface BlogPostItem {
  id: string;
  icon?: string;
  order: number;
  date?: string;
  readTime?: string;
  tags?: string[];
  draft?: boolean;
  url?: string;
  title: string;
  description: string;
}

export interface BusinessCase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  order: number;
  category:
    | ('Strategy' | 'Architecture' | 'Innovation' | 'Operations')[]
    | 'Strategy'
    | 'Architecture'
    | 'Innovation'
    | 'Operations';
  published: boolean;
  url?: string | string[];
}

export interface BlogArticle {
  title: string;
  content: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  draft?: boolean;
}

type SortableItem = {
  order?: number;
};

const markdownModules = import.meta.glob('../content/**/*.md', {
  query: '?raw',
  import: 'default',
});

const blogModules = import.meta.glob('../content/blog/**/*.md', {
  query: '?raw',
  import: 'default',
});

const businessCaseModules = import.meta.glob('../content/business-cases/**/*.md', {
  query: '?raw',
  import: 'default',
});

function withTitleAndDescription<T>(raw: string): T {
  const parsed = parseSingleSectionMarkdown(raw);

  const lines = parsed.content.trim().split('\n');
  let title = '';
  let subtitle = '';
  let description = '';

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      title = line.substring(2).trim();
    } else if (line.startsWith('## ')) {
      subtitle = line.substring(3).trim();
    } else if (line && !line.startsWith('#')) {
      description = line;
      break;
    }
  }

  const metadata = parsed.metadata as Record<string, unknown>;
  const fmTitle = metadata.title;
  const fmSubtitle = metadata.subtitle;
  const fmDescription = metadata.description;

  if (!title && typeof fmTitle === 'string') title = fmTitle;
  if (!subtitle && typeof fmSubtitle === 'string') subtitle = fmSubtitle;
  if (!description && typeof fmDescription === 'string') description = fmDescription;

  return {
    ...(parsed.metadata as object),
    title,
    subtitle,
    description,
  } as T;
}

function sortByOrder<T extends SortableItem>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const orderA = a.order ?? 999;
    const orderB = b.order ?? 999;
    return orderA - orderB;
  });
}

export async function loadDynamicContent<T extends SortableItem>(
  contentType: string,
  locale: Locale,
): Promise<T[]> {
  const pattern = `../content/${contentType}/${locale}/`;

  const relevantModules = Object.entries(markdownModules).filter(([path]) => path.startsWith(pattern));

  const loadedItems = await Promise.all(
    relevantModules.map(async ([, loader]) => {
      const raw = (await loader()) as string;
      return withTitleAndDescription<T>(raw);
    }),
  );

  return sortByOrder(loadedItems);
}

export async function loadServiceContent(locale: Locale) {
  return loadDynamicContent<ServiceItem>('services', locale);
}

export async function loadSectorContent(locale: Locale) {
  return loadDynamicContent<SectorItem>('sectors', locale);
}

export async function loadValueContent(locale: Locale) {
  return loadDynamicContent<ValueItem>('values', locale);
}

export async function loadEngagementContent(locale: Locale) {
  return loadDynamicContent<EngagementItem>('engagement', locale);
}

export async function loadBlogContent(locale: Locale) {
  return loadDynamicContent<BlogPostItem>('blog', locale);
}

export async function loadHeroContent(locale: Locale): Promise<{ main: MarkdownContent; quicklinks: ParsedMarkdownSection[] }> {
  const [mainModule, quicklinksModule] = await Promise.all([
    import(`../content/hero/${locale}/main.md?raw`),
    import(`../content/hero/${locale}/quicklinks.md?raw`),
  ]);

  return {
    main: parseSingleSectionMarkdown(mainModule.default),
    quicklinks: parseMultiSectionMarkdown(quicklinksModule.default),
  };
}

export async function loadAboutContent(locale: Locale): Promise<ParsedMarkdownSection[]> {
  const module = await import(`../content/about/${locale}/main.md?raw`);
  return parseMultiSectionMarkdown(module.default);
}

export async function loadContactContent(locale: Locale): Promise<ParsedMarkdownSection[]> {
  const module = await import(`../content/contact/${locale}/main.md?raw`);
  return parseMultiSectionMarkdown(module.default);
}

export async function loadBusinessCases(
  locale: Locale,
  category?: 'Strategy' | 'Architecture' | 'Innovation' | 'Operations',
): Promise<BusinessCase[]> {
  const pattern = `../content/business-cases/${locale}/`;
  const relevantModules = Object.entries(businessCaseModules).filter(([path]) => path.startsWith(pattern));

  const loadedItems = await Promise.all(
    relevantModules.map(async ([, loader]) => {
      const raw = (await loader()) as string;
      return withTitleAndDescription<BusinessCase>(raw);
    }),
  );

  const filtered = category
    ? loadedItems.filter((item) =>
        Array.isArray(item.category) ? item.category.includes(category) : item.category === category,
      )
    : loadedItems;

  return sortByOrder(filtered);
}

export async function loadBlogArticle(locale: Locale, slug?: string): Promise<BlogArticle | null> {
  if (!slug) return null;

  const articlePath = `../content/blog/${locale}/${slug}.md`;
  const loader = blogModules[articlePath];

  if (!loader) {
    return null;
  }

  const raw = (await loader()) as string;
  const parsed = parseSingleSectionMarkdown(raw);
  const id = String((parsed.metadata as { id?: string }).id || slug);
  const lines = parsed.content.trim().split('\n');
  const titleLine = lines.find((line) => line.trim().startsWith('# '));
  const title = titleLine ? titleLine.replace(/^#\s+/, '').trim() : id;

  return {
    title,
    content: parsed.content,
    date: (parsed.metadata as { date?: string }).date,
    readTime: (parsed.metadata as { readTime?: string }).readTime,
    tags: (parsed.metadata as { tags?: string[] }).tags,
    draft: (parsed.metadata as { draft?: boolean }).draft,
  };
}
