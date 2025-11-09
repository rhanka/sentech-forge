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
