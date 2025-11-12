import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { parseSingleSectionMarkdown } from '@/lib/markdownLoader';

export interface BusinessCase {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  order: number;
  category: ('Strategy' | 'Architecture' | 'Innovation' | 'Operations')[];
  published: boolean;
  url?: string | string[];
}

export function useBusinessCases(category?: 'Strategy' | 'Architecture' | 'Innovation' | 'Operations') {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<BusinessCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      const locale = i18n.language as 'fr' | 'en';
      
      try {
        const modules = import.meta.glob('../content/business-cases/**/*.md', { query: '?raw', import: 'default' });
        const pattern = `../content/business-cases/${locale}/`;
        
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

            // Fallback to frontmatter if headings are absent
            const fmTitle = (parsed.metadata as any).title;
            const fmSubtitle = (parsed.metadata as any).subtitle;
            const fmDescription = (parsed.metadata as any).description;
            if (!title && fmTitle) title = fmTitle;
            if (!subtitle && fmSubtitle) subtitle = fmSubtitle;
            if (!description && fmDescription) description = fmDescription;
            
            return {
              ...parsed.metadata,
              title,
              subtitle,
              description,
            } as BusinessCase;
          })
        );
        
        // Filter by category if provided
        let filtered = loadedItems;
        if (category) {
          filtered = loadedItems.filter(item => 
            Array.isArray(item.category) 
              ? item.category.includes(category)
              : item.category === category
          );
        }
        
        // Sort by order
        const sorted = filtered.sort((a, b) => {
          const orderA = a.order ?? 999;
          const orderB = b.order ?? 999;
          return orderA - orderB;
        });
        
        setItems(sorted);
      } catch (error) {
        console.error('Error loading business cases:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language, category]);

  return { items, loading };
}
