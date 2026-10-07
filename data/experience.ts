export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  type: 'work' | 'cohort' | 'organization' | 'community';
  typeLabel: string;
  bullets: string[];
  tags: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'bps-pekalongan',
    organization: 'BPS Kota Pekalongan',
    role: 'Junior Data Analyst',
    period: '2024',
    type: 'work',
    typeLabel: 'Work Experience',
    bullets: [
      'Processed & organized survey datasets in Excel for official Kota Pekalongan statistical reports.',
      'Prepared data publications from Sakernas labor indicators (TPAK, TKK, TPT) and SE2026 partner data.',
    ],
    tags: ['Excel', 'Sakernas (TPAK, TKK, TPT)', 'SE2026', 'Statistical Analysis'],
  },
  {
    id: 'cohort-asah',
    organization: 'Cohort Asah (led by Dicoding)',
    role: 'Data Scientist Cohort',
    period: 'Agu 2026 – Jan 2027',
    type: 'cohort',
    typeLabel: 'Intensive Cohort',
    bullets: [
      'Selected for intensive Data Science program, focusing on predictive modeling, machine learning workflows, and data insights.',
    ],
    tags: ['Dicoding', 'Machine Learning', 'Data Science Track'],
  },
  {
    id: 'hmp-sains-data',
    organization: 'HMP Sains Data UNESA',
    role: 'Dept. of Religious & Spiritual Affairs',
    period: '2023 – 2024',
    type: 'organization',
    typeLabel: 'Student Organization',
    bullets: [
      'Managed charity programs for orphaned children, donation collection, and team event execution.',
    ],
    tags: ['Charity Program', 'Event Management'],
  },
  {
    id: 'pandas-2025',
    organization: 'PANDAS 2025 (Pengabdian Masyarakat Data Science)',
    role: 'Public Relations (Community Service)',
    period: '2025',
    type: 'community',
    typeLabel: 'Community Service',
    bullets: [
      'Coordinated internal and external communications for the Data Science Community Service Program.',
    ],
    tags: ['Public Relations', 'Community Outreach'],
  },
];

