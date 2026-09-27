export interface SkillItem {
  name: string;
  category: string;
  iconUrl: string;
}

export const skillGroups = [
  {
    category: 'Database & Data Tools',
    skills: [
      { name: 'pgAdmin', category: 'Database', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'DBeaver', category: 'Database', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/DBeaver_logo.svg' },
      { name: 'JupyterLab', category: 'Data Science', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg' },
      { name: 'VS Code', category: 'Tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'GitHub', category: 'Tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Airflow', category: 'Data Engineering', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/AirflowLogo.png' },
      { name: 'Google Sheets', category: 'Tools', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg' },
      { name: 'MS Word', category: 'Tools', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg' },
      { name: 'Google Docs', category: 'Tools', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg' },
      { name: 'MS Office', category: 'Tools', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg' },
      { name: 'Google Drive', category: 'Tools', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg' },
      { name: 'MS Fabric', category: 'Data Engineering', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    ],
  },
  {
    category: 'Languages & Machine Learning',
    skills: [
      { name: 'Python', category: 'Programming', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'R', category: 'Programming', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
      { name: 'SQL', category: 'Programming', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg' },
      { name: 'PostgreSQL', category: 'Database', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Pandas', category: 'Data Science', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
      { name: 'NumPy', category: 'Data Science', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
      { name: 'Scikit-learn', category: 'Machine Learning', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
      { name: 'TensorFlow', category: 'Machine Learning', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', category: 'Machine Learning', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'Tableau', category: 'Visualization', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png' },
      { name: 'Power BI', category: 'Visualization', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg' },
      { name: 'Google Colab', category: 'Data Science', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Colaboratory_SVG_Logo.svg' },
      { name: 'RStudio', category: 'Tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rstudio/rstudio-original.svg' },
      { name: 'AWS', category: 'Cloud', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Git', category: 'Tools', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    ],
  },
];
