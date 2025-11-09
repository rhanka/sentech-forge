export interface ServiceItem {
  id: string;
  icon: string;
  order: number;
  clickable?: boolean;
  scrollTo?: string;
  title: string;
  description: string;
}

export const servicesFr: ServiceItem[] = [
  {
    id: 'strategy',
    icon: 'Lightbulb',
    order: 1,
    clickable: true,
    scrollTo: 'strategy-details',
    title: 'Stratégie IT, Data & IA',
    description: 'Définition de votre stratégie digitale, évaluation make or buy, support RFI/RFP, roadmap technologique et innovation',
  },
  {
    id: 'governance',
    icon: 'Network',
    order: 2,
    title: 'Gouvernance & Architecture',
    description: 'Architecture d\'entreprise, architecture solution, architecture infrastructure, gouvernance des données et frameworks de gestion',
  },
  {
    id: 'development',
    icon: 'Code',
    order: 3,
    title: 'Développements Innovants',
    description: 'Applications full-stack, IA générative, Machine Learning, IoT, prototypes et POC pour valider vos innovations',
  },
  {
    id: 'optimization',
    icon: 'Cog',
    order: 4,
    title: 'Optimisation des Opérations',
    description: 'Amélioration des processus, automatisation, gestion de crise, résolution de problèmes complexes et accompagnement au changement',
  },
];

export const servicesEn: ServiceItem[] = [
  {
    id: 'strategy',
    icon: 'Lightbulb',
    order: 1,
    clickable: true,
    scrollTo: 'strategy-details',
    title: 'IT, Data & AI Strategy',
    description: 'Digital strategy definition, make or buy assessment, RFI/RFP support, technology roadmap and innovation',
  },
  {
    id: 'governance',
    icon: 'Network',
    order: 2,
    title: 'Governance & Architecture',
    description: 'Enterprise architecture, solution architecture, infrastructure architecture, data governance and management frameworks',
  },
  {
    id: 'development',
    icon: 'Code',
    order: 3,
    title: 'Innovative Development',
    description: 'Full-stack applications, generative AI, Machine Learning, IoT, prototypes and POCs to validate your innovations',
  },
  {
    id: 'optimization',
    icon: 'Cog',
    order: 4,
    title: 'Operations Optimization',
    description: 'Process improvement, automation, crisis management, complex problem solving and change management',
  },
];
