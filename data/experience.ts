export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  location?: string;
  period: string;
  type: 'work' | 'organization' | 'community';
  typeLabel: string;
  responsibilities: string[];
  tags?: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'bps-pekalongan',
    organization: 'BPS Kota Pekalongan',
    role: 'Junior Data Analyst',
    location: 'Pekalongan, Central Java',
    period: '2024',
    type: 'work',
    typeLabel: 'Work & Professional',
    responsibilities: [
      'Processed and organized survey datasets using Microsoft Excel, producing structured data for reporting and analysis.',
      'Compiled statistical data to support the preparation of Kota Pekalongan\'s statistical report.',
      'Prepared data-based publication materials using Sakernas labor-force indicators (TPAK, TKK, and TPT).',
      'Compiled and organized SE2026 partner recruitment data to support reporting activities.',
    ],
    tags: ['Microsoft Excel', 'Statistical Analysis', 'Sakernas (TPAK, TKK, TPT)', 'Data Processing', 'SE2026'],
  },
  {
    id: 'hmp-sains-data',
    organization: 'HMP Sains Data UNESA',
    role: 'Department of Religious & Spiritual Affairs',
    location: 'Surabaya, East Java',
    period: '2023 – 2024',
    type: 'organization',
    typeLabel: 'Student Organization',
    responsibilities: [
      'Managed charity programs for orphaned children, coordinating donation collection and event execution with team members.',
      'Coordinated departmental initiatives and supported student community development within HMP Sains Data.',
    ],
    tags: ['Charity Programs', 'Event Execution', 'Team Leadership', 'Community Outreach'],
  },
  {
    id: 'pandas-2025',
    organization: 'PANDAS 2025 (Data Science Community Service Program)',
    role: 'Public Relations',
    location: 'UNESA / Community Outreach',
    period: '2025',
    type: 'community',
    typeLabel: 'Community Service',
    responsibilities: [
      'Coordinated communication and supported community service activities with internal and external parties.',
      'Facilitated stakeholder engagement and strategic information distribution to ensure impactful program execution.',
    ],
    tags: ['Public Relations', 'External Relations', 'Stakeholder Communication', 'Community Engagement'],
  },
];
