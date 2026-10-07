export interface Achievement {
  id: string;
  title: string;
  event: string;
  organizer: string;
  year: string;
  award: string;
  description: string;
  tags: string[];
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
  },
  {
    id: 'business-elevation',
    title: 'Finalist – Business Elevation Competition',
    event: 'Creative Infographics',
    organizer: 'HMJ Bisnis, Politeknik Negeri Jember',
    year: '2026',
    award: 'Finalist 🎖️',
    description:
      'Analyzed an AI-related dataset to identify key insights and presented findings through a creative infographic.',
    tags: ['AI Dataset Analysis', 'Creative Infographics', 'Business Analytics'],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-asah-dicoding',
    name: 'Cohort Asah 2026 — Data Scientist',
    issuer: 'Dicoding Indonesia',
    year: '2026 – 2027',
    credentialId: 'Cohort Asah',
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
