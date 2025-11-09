import matter from 'gray-matter';

export interface BaseMetadata {
  id: string;
  icon: string;
  order: number;
  published?: boolean;
}

export interface ServiceMetadata extends BaseMetadata {
  clickable?: boolean;
  scrollTo?: string;
}

export interface EngagementMetadata extends BaseMetadata {
  features: string[];
}

export interface BaseContent {
  metadata: BaseMetadata;
  title: string;
  description: string;
}

export interface StrategyContent extends BaseContent {
  metadata: BaseMetadata;
  subtitle: string;
}

export interface ServiceContent extends BaseContent {
  metadata: ServiceMetadata;
}

export interface EngagementContent extends BaseContent {
  metadata: EngagementMetadata;
}

const contentFiles = {
  strategies: {
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
  },
  services: {
    fr: {
      strategy: () => import('@/content/services/fr/strategy.md?raw'),
      governance: () => import('@/content/services/fr/governance.md?raw'),
      development: () => import('@/content/services/fr/development.md?raw'),
      optimization: () => import('@/content/services/fr/optimization.md?raw'),
    },
    en: {
      strategy: () => import('@/content/services/en/strategy.md?raw'),
      governance: () => import('@/content/services/en/governance.md?raw'),
      development: () => import('@/content/services/en/development.md?raw'),
      optimization: () => import('@/content/services/en/optimization.md?raw'),
    },
  },
  sectors: {
    fr: {
      manufacturing: () => import('@/content/sectors/fr/manufacturing.md?raw'),
      public: () => import('@/content/sectors/fr/public.md?raw'),
      finance: () => import('@/content/sectors/fr/finance.md?raw'),
      startups: () => import('@/content/sectors/fr/startups.md?raw'),
    },
    en: {
      manufacturing: () => import('@/content/sectors/en/manufacturing.md?raw'),
      public: () => import('@/content/sectors/en/public.md?raw'),
      finance: () => import('@/content/sectors/en/finance.md?raw'),
      startups: () => import('@/content/sectors/en/startups.md?raw'),
    },
  },
  values: {
    fr: {
      fullstack: () => import('@/content/values/fr/fullstack.md?raw'),
      innovation: () => import('@/content/values/fr/innovation.md?raw'),
      openness: () => import('@/content/values/fr/openness.md?raw'),
      roi: () => import('@/content/values/fr/roi.md?raw'),
      flexibility: () => import('@/content/values/fr/flexibility.md?raw'),
      pragmatic: () => import('@/content/values/fr/pragmatic.md?raw'),
    },
    en: {
      fullstack: () => import('@/content/values/en/fullstack.md?raw'),
      innovation: () => import('@/content/values/en/innovation.md?raw'),
      openness: () => import('@/content/values/en/openness.md?raw'),
      roi: () => import('@/content/values/en/roi.md?raw'),
      flexibility: () => import('@/content/values/en/flexibility.md?raw'),
      pragmatic: () => import('@/content/values/en/pragmatic.md?raw'),
    },
  },
  engagement: {
    fr: {
      fulltime: () => import('@/content/engagement/fr/fulltime.md?raw'),
      parttime: () => import('@/content/engagement/fr/parttime.md?raw'),
      fixed: () => import('@/content/engagement/fr/fixed.md?raw'),
    },
    en: {
      fulltime: () => import('@/content/engagement/en/fulltime.md?raw'),
      parttime: () => import('@/content/engagement/en/parttime.md?raw'),
      fixed: () => import('@/content/engagement/en/fixed.md?raw'),
    },
  },
};

function parseStrategyContent(content: string): { title: string; subtitle: string; description: string } {
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

function parseSimpleContent(content: string): { title: string; description: string } {
  const lines = content.split('\n').filter(line => line.trim());
  
  let title = '';
  let description = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('# ')) {
      title = line.replace('# ', '').trim();
    } else if (!line.startsWith('#') && line.trim() && !description) {
      description = line.trim();
    }
  }
  
  return { title, description };
}

async function loadContent<T extends BaseMetadata>(
  type: keyof typeof contentFiles,
  id: string,
  locale: 'fr' | 'en'
): Promise<any> {
  const files = contentFiles[type][locale] as Record<string, () => Promise<{ default: string }>>;
  const loader = files[id];
  
  if (!loader) {
    throw new Error(`${type} ${id} not found for locale ${locale}`);
  }
  
  const module = await loader();
  const rawContent = module.default;
  const { data, content } = matter(rawContent);
  
  return { data, content };
}

export async function loadStrategy(id: string, locale: 'fr' | 'en'): Promise<StrategyContent> {
  const { data, content } = await loadContent('strategies', id, locale);
  const { title, subtitle, description } = parseStrategyContent(content);
  
  return {
    metadata: { ...data, published: data.published !== false } as BaseMetadata,
    title,
    subtitle,
    description,
  };
}

export async function loadAllStrategies(locale: 'fr' | 'en'): Promise<StrategyContent[]> {
  const ids = Object.keys(contentFiles.strategies[locale]);
  const strategies = await Promise.all(
    ids.map(id => loadStrategy(id, locale))
  );
  
  return strategies
    .filter(s => s.metadata.published !== false)
    .sort((a, b) => a.metadata.order - b.metadata.order);
}

export async function loadService(id: string, locale: 'fr' | 'en'): Promise<ServiceContent> {
  const { data, content } = await loadContent('services', id, locale);
  const { title, description } = parseSimpleContent(content);
  
  return {
    metadata: data as ServiceMetadata,
    title,
    description,
  };
}

export async function loadAllServices(locale: 'fr' | 'en'): Promise<ServiceContent[]> {
  const ids = Object.keys(contentFiles.services[locale]);
  const services = await Promise.all(
    ids.map(id => loadService(id, locale))
  );
  
  return services.sort((a, b) => a.metadata.order - b.metadata.order);
}

export async function loadSector(id: string, locale: 'fr' | 'en'): Promise<BaseContent> {
  const { data, content } = await loadContent('sectors', id, locale);
  const { title, description } = parseSimpleContent(content);
  
  return {
    metadata: data as BaseMetadata,
    title,
    description,
  };
}

export async function loadAllSectors(locale: 'fr' | 'en'): Promise<BaseContent[]> {
  const ids = Object.keys(contentFiles.sectors[locale]);
  const sectors = await Promise.all(
    ids.map(id => loadSector(id, locale))
  );
  
  return sectors.sort((a, b) => a.metadata.order - b.metadata.order);
}

export async function loadValue(id: string, locale: 'fr' | 'en'): Promise<BaseContent> {
  const { data, content } = await loadContent('values', id, locale);
  const { title, description } = parseSimpleContent(content);
  
  return {
    metadata: data as BaseMetadata,
    title,
    description,
  };
}

export async function loadAllValues(locale: 'fr' | 'en'): Promise<BaseContent[]> {
  const ids = Object.keys(contentFiles.values[locale]);
  const values = await Promise.all(
    ids.map(id => loadValue(id, locale))
  );
  
  return values.sort((a, b) => a.metadata.order - b.metadata.order);
}

export async function loadEngagement(id: string, locale: 'fr' | 'en'): Promise<EngagementContent> {
  const { data, content } = await loadContent('engagement', id, locale);
  const { title, description } = parseSimpleContent(content);
  
  return {
    metadata: data as EngagementMetadata,
    title,
    description,
  };
}

export async function loadAllEngagements(locale: 'fr' | 'en'): Promise<EngagementContent[]> {
  const ids = Object.keys(contentFiles.engagement[locale]);
  const engagements = await Promise.all(
    ids.map(id => loadEngagement(id, locale))
  );
  
  return engagements.sort((a, b) => a.metadata.order - b.metadata.order);
}
