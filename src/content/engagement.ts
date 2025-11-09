export interface EngagementItem {
  id: string;
  icon: string;
  order: number;
  features: string[];
  title: string;
  description: string;
}

export const engagementFr: EngagementItem[] = [
  {
    id: 'fulltime',
    icon: 'CheckCircle2',
    order: 1,
    features: [
      'Transformation majeure',
      'Direction de programme',
      'Leadership stratégique',
    ],
    title: 'Mandat Full Time',
    description: 'Engagement complet sur votre projet, immersion totale dans vos équipes',
  },
  {
    id: 'parttime',
    icon: 'Clock',
    order: 2,
    features: [
      'Accompagnement continu',
      'Conseil stratégique récurrent',
      'Support expertise spécifique',
    ],
    title: 'Part Time',
    description: 'Intervention régulière et planifiée, présence ponctuelle selon vos besoins',
  },
  {
    id: 'fixed',
    icon: 'Package',
    order: 3,
    features: [
      'Études spécifiques',
      'POC / Prototypes',
      'Audits et diagnostics',
    ],
    title: 'Forfaits Fixes',
    description: 'Projets à périmètre défini avec budget et délais fixés à l\'avance',
  },
];

export const engagementEn: EngagementItem[] = [
  {
    id: 'fulltime',
    icon: 'CheckCircle2',
    order: 1,
    features: [
      'Major transformation',
      'Program management',
      'Strategic leadership',
    ],
    title: 'Full Time Mandate',
    description: 'Complete commitment to your project, full immersion in your teams',
  },
  {
    id: 'parttime',
    icon: 'Clock',
    order: 2,
    features: [
      'Ongoing support',
      'Recurring strategic advice',
      'Specific expertise support',
    ],
    title: 'Part Time',
    description: 'Regular and planned intervention, scheduled presence according to your needs',
  },
  {
    id: 'fixed',
    icon: 'Package',
    order: 3,
    features: [
      'Specific studies',
      'POCs / Prototypes',
      'Audits and diagnostics',
    ],
    title: 'Fixed Packages',
    description: 'Projects with defined scope, fixed budget and timeline',
  },
];
