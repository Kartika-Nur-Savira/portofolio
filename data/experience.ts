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
      'Processed and structured semiannual population data (2020–2025) for 3 kelurahan in Kota Pekalongan producing 9 thematic tables per area (sex, household, density, growth, age, marital status, blood type, education, religion).',
      'Calculated demographic indicators in Excel using formulas and pivot tables, including sex ratio, average household size, population density, and population growth.',
      'Built around 200 charts, dashboards, and publication infographics to support the preparation of Kota Pekalongan’s statistical report.'
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
      'Selected as one of 2,000 scholarship recipients nationwide for Asah 2026, a certified independent study program (Studi Independen Bersertifikat) organized by Dicoding in collaboration with GoTo. Currently completing the Data Science Specialist track, covering data analysis, SQL, Python, statistics for data science, and machine learning, with hands-on projects and mentorship from industry experts.',
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

