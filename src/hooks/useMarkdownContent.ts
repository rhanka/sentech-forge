import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { parseMultiSectionMarkdown, parseSingleSectionMarkdown, ParsedMarkdownSection, MarkdownContent } from '@/lib/markdownLoader';

export function useHeroContent() {
  const { i18n } = useTranslation();
  const [main, setMain] = useState<MarkdownContent | null>(null);
  const [quicklinks, setQuicklinks] = useState<ParsedMarkdownSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const locale = i18n.language as 'fr' | 'en';
        
        const [mainModule, quicklinksModule] = await Promise.all([
          import(`../content/hero/${locale}/main.md?raw`),
          import(`../content/hero/${locale}/quicklinks.md?raw`)
        ]);

        setMain(parseSingleSectionMarkdown(mainModule.default));
        setQuicklinks(parseMultiSectionMarkdown(quicklinksModule.default));
      } catch (error) {
        console.error('Error loading hero content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { main, quicklinks, loading };
}

export function useAboutContent() {
  const { i18n } = useTranslation();
  const [sections, setSections] = useState<ParsedMarkdownSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const locale = i18n.language as 'fr' | 'en';
        const module = await import(`../content/about/${locale}/main.md?raw`);
        setSections(parseMultiSectionMarkdown(module.default));
      } catch (error) {
        console.error('Error loading about content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { sections, loading };
}

export function useContactContent() {
  const { i18n } = useTranslation();
  const [sections, setSections] = useState<ParsedMarkdownSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const locale = i18n.language as 'fr' | 'en';
        const module = await import(`../content/contact/${locale}/main.md?raw`);
        setSections(parseMultiSectionMarkdown(module.default));
      } catch (error) {
        console.error('Error loading contact content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { sections, loading };
}

// Generic hook to load all markdown files from a content folder
export function useDynamicContent<T>(contentType: string) {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const locale = i18n.language as 'fr' | 'en';
      
      try {
        // Import all markdown files for the given content type and locale
        const modules = import.meta.glob('../content/**/*.md', { query: '?raw', import: 'default' });
        const pattern = `../content/${contentType}/${locale}/`;
        
        const relevantModules = Object.entries(modules)
          .filter(([path]) => path.startsWith(pattern));
        
        const loadedItems = await Promise.all(
          relevantModules.map(async ([, loader]) => {
            const raw = await loader() as string;
            const parsed = parseSingleSectionMarkdown(raw);
            
            // Extract title and description from content
            const lines = parsed.content.trim().split('\n');
            let title = '';
            let subtitle = '';
            let description = '';
            
            for (let i = 0; i < lines.length; i++) {
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
            
            return {
              ...parsed.metadata,
              title,
              subtitle,
              description,
            } as T;
          })
        );
        
        // Sort by order if available
        const sorted = loadedItems.sort((a: any, b: any) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          return orderA - orderB;
        });
        
        setItems(sorted);
      } catch (error) {
        console.error(`Error loading ${contentType} content:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language, contentType]);

  return { items, loading };
}
