export interface Achievement {
  id: string;
  title: string;
  event: string;
  organizer: string;
  year: string;
  award: string;
  description: string;
  tags: string[];
  images?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  credentialId?: string;
}

export const achievements: Achievement[] = [
  {
    id: 'data-craft-league',
    title: '1st Place – Data Craft League',
    event: 'MATRIX SAINTAVERS 2026',
    organizer: 'HMPS Sains Data, UIN K.H. Abdurrahman Wahid ',
    year: '2026',
    award: 'Juara 1 🏆',
    description:
      'Analyzed data to derive insights and forecasting results, presenting findings through a data-driven infographic.',
    tags: ['Forecasting', 'Infographic Design', 'Data Insights'],
    images: ['/images/satu.png', '/images/dua.png'],
  },
  {
    id: 'business-elevation',
    title: '1st Place – Educational Innovation Infographic, DIMAS-TI AMLI ',
    event: 'Educational Innovation Infographic',
    organizer: 'Asosiasi MIPA LPTK Indonesiar',
    year: '2026',
    award: '1st Place 🎖️',
    description:
      'Turned environmental data analysis into SIMORA, an Edutech concept integrating AI and Digital Twin for interactive learning..',
    tags: ['Karhutla Dataset Analysis', 'Creative Infographics', 'Business Analytics'],
    images: [
      '/images/simora.png',
      '/images/latar.png',
      '/images/sim.png',
      '/images/dimas.png',
    ],
  },
];


export const coursework = [
  'Statistics & Probability',
  'Machine Learning',
  'Database Systems',
  'Data Visualization',
  'Computer Vision',
  'Time Series Analysis',
  'Data Mining',
  'Cloud Computing',
  'Data Engineering',
  'Programming for Data Science',
];
