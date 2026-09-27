export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
  credentialId?: string;
}

export const certifications: Certification[] = [
  {
    id: 'cert-1',
    name: '[Certification Name]',
    issuer: '[Issuer Organization]',
    year: '[Year]',
    credentialUrl: undefined,
    credentialId: '[Credential ID]',
  },
  {
    id: 'cert-2',
    name: '[Certification Name]',
    issuer: '[Issuer Organization]',
    year: '[Year]',
    credentialUrl: undefined,
    credentialId: '[Credential ID]',
  },
  {
    id: 'cert-3',
    name: '[Certification Name]',
    issuer: '[Issuer Organization]',
    year: '[Year]',
    credentialUrl: undefined,
    credentialId: '[Credential ID]',
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
