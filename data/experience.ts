export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  type: 'organization' | 'work' | 'study';
  responsibilities: string[];
  events?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'himasada',
    organization: 'HIMASADA UNESA',
    role: 'Staff — Department of Religious and Spiritual Affairs',
    period: '2023 – 2024',
    type: 'organization',
    responsibilities: [
      'Supported organizational planning and execution of student activities',
      'Assisted coordination of events and programs within the department',
      'Collaborated with cross-departmental teams on community initiatives',
      'Contributed to building a positive and inclusive student community',
    ],
    events: ['SASOVI 2025', 'GSS 2025'],
  },
];

export const activities = [
  {
    id: 'satria-data',
    title: 'Satria Data',
    description: 'National data science competition and academic program',
    type: 'Competition',
    year: '[Year]',
  },
  {
    id: 'independent-study',
    title: 'Independent Study',
    description: 'Merdeka Belajar Kampus Merdeka (MBKM) independent learning program',
    type: 'Program',
    year: '[Year]',
  },
  {
    id: 'aws-cloud',
    title: 'AWS Cloud Learning',
    description: 'Cloud computing fundamentals and AWS core services',
    type: 'Learning',
    year: '[Year]',
  },
  {
    id: 'ds-projects',
    title: 'Data Science Projects',
    description: 'Machine learning, analytics, and data engineering projects',
    type: 'Projects',
    year: '2023 – Present',
  },
];
