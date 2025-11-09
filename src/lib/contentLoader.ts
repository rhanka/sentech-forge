import matter from 'gray-matter';

export interface StrategyMetadata {
  id: string;
  icon: string;
  order: number;
  published: boolean;
}

export interface StrategyContent {
  metadata: StrategyMetadata;
  title: string;
  subtitle: string;
  description: string;
}

const strategyFiles = {
  fr: {
    justice: () => import('@/content/strategies/fr/justice.md?raw'),
    airbus: () => import('@/content/strategies/fr/airbus.md?raw'),
    separation: () => import('@/content/strategies/fr/separation.md?raw'),
    interior: () => import('@/content/strategies/fr/interior.md?raw'),
    riotinto: () => import('@/content/strategies/fr/riotinto.md?raw'),
    maritime: () => import('@/content/strategies/fr/maritime.md?raw'),
    nethris: () => import('@/content/strategies/fr/nethris.md?raw'),
    curateur: () => import('@/content/strategies/fr/curateur.md?raw'),
    expri: () => import('@/content/strategies/fr/expri.md?raw'),
  },
  en: {
    justice: () => import('@/content/strategies/en/justice.md?raw'),
    airbus: () => import('@/content/strategies/en/airbus.md?raw'),
    separation: () => import('@/content/strategies/en/separation.md?raw'),
    interior: () => import('@/content/strategies/en/interior.md?raw'),
    riotinto: () => import('@/content/strategies/en/riotinto.md?raw'),
    maritime: () => import('@/content/strategies/en/maritime.md?raw'),
    nethris: () => import('@/content/strategies/en/nethris.md?raw'),
    curateur: () => import('@/content/strategies/en/curateur.md?raw'),
    expri: () => import('@/content/strategies/en/expri.md?raw'),
  },
};

function parseMarkdownContent(content: string): { title: string; subtitle: string; description: string } {
  const lines = content.split('\n').filter(line => line.trim());
  
  let title = '';
  let subtitle = '';
  let description = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
    } else if (line.startsWith('## ')) {
      subtitle = line.replace('## ', '').trim();
    } else if (!line.startsWith('#') && line.trim() && !description) {
      description = line.trim();
    }
  }
  
  return { title, subtitle, description };
}

export async function loadStrategy(id: string, locale: 'fr' | 'en'): Promise<StrategyContent> {
  const loader = strategyFiles[locale][id as keyof typeof strategyFiles.fr];
  
  if (!loader) {
    throw new Error(`Strategy ${id} not found for locale ${locale}`);
  }
  
  const module = await loader();
  const rawContent = module.default;
  const { data, content } = matter(rawContent);
  
  const { title, subtitle, description } = parseMarkdownContent(content);
  
  return {
    metadata: data as StrategyMetadata,
    title,
    subtitle,
    description,
  };
}

export async function loadAllStrategies(locale: 'fr' | 'en'): Promise<StrategyContent[]> {
  const ids = Object.keys(strategyFiles[locale]);
  const strategies = await Promise.all(
    ids.map(id => loadStrategy(id, locale))
  );
  
  return strategies
    .filter(s => s.metadata.published)
    .sort((a, b) => a.metadata.order - b.metadata.order);
}
