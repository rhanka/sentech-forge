export interface SectorItem {
  id: string;
  icon: string;
  order: number;
  title: string;
  description: string;
}

export const sectorsFr: SectorItem[] = [
  {
    id: 'manufacturing',
    icon: 'Factory',
    order: 1,
    title: 'Manufacturier',
    description: 'Industrie 4.0, IoT industriel, optimisation de la production, supply chain intelligente',
  },
  {
    id: 'public',
    icon: 'Landmark',
    order: 2,
    title: 'Secteur Public',
    description: 'Transformation digitale des services publics, sécurité, modernisation des SI, projets d\'envergure',
  },
  {
    id: 'finance',
    icon: 'Building2',
    order: 3,
    title: 'Services Financiers',
    description: 'Fintech, conformité réglementaire, data analytics, automatisation des processus financiers',
  },
  {
    id: 'startups',
    icon: 'Sparkles',
    order: 4,
    title: 'Startups',
    description: 'Architecture scalable, MVP, validation technique, accompagnement de la croissance rapide',
  },
];

export const sectorsEn: SectorItem[] = [
  {
    id: 'manufacturing',
    icon: 'Factory',
    order: 1,
    title: 'Manufacturing',
    description: 'Industry 4.0, industrial IoT, production optimization, intelligent supply chain',
  },
  {
    id: 'public',
    icon: 'Landmark',
    order: 2,
    title: 'Public Sector',
    description: 'Digital transformation of public services, security, IT modernization, large-scale projects',
  },
  {
    id: 'finance',
    icon: 'Building2',
    order: 3,
    title: 'Financial Services',
    description: 'Fintech, regulatory compliance, data analytics, financial process automation',
  },
  {
    id: 'startups',
    icon: 'Sparkles',
    order: 4,
    title: 'Startups',
    description: 'Scalable architecture, MVP, technical validation, rapid growth support',
  },
];
