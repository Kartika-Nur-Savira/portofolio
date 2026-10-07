export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  period: string;
  type: 'work' | 'organization' | 'community';
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
      'Processed & organized survey datasets using Excel to support Kota Pekalongan\'s regional statistical report.',
      'Prepared data publications based on Sakernas labor indicators (TPAK, TKK, TPT) and organized SE2026 partner data.',
    ],
    tags: ['Excel', 'Sakernas (TPAK, TKK, TPT)', 'SE2026', 'Statistical Analysis'],
  },
  {
    id: 'hmp-sains-data',
    organization: 'HMP Sains Data UNESA',
    role: 'Department of Religious & Spiritual Affairs',
    period: '2023 – 2024',
    type: 'organization',
    typeLabel: 'Organization',
    bullets: [
      'Managed charity programs for orphaned children, donation collection, and team event execution.',
    ],
    tags: ['Charity Program', 'Event Management'],
  },
  {
    id: 'pandas-2025',
    organization: 'PANDAS 2025',
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
