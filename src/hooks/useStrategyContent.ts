import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadAllStrategies, StrategyContent } from '@/lib/contentLoader';

export function useStrategyContent() {
  const { i18n } = useTranslation();
  const [strategies, setStrategies] = useState<StrategyContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      try {
        const locale = i18n.language as 'fr' | 'en';
        const content = await loadAllStrategies(locale);
        setStrategies(content);
      } catch (error) {
        console.error('Error loading strategy content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [i18n.language]);

  return { strategies, loading };
}
