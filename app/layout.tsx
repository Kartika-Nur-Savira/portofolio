import './globals.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

export const metadata: Metadata = {
  title: 'Kartika Nur Savira — Data Science Portfolio',
  description:
    'Portfolio of Kartika Nur Savira, a Data Science student at Universitas Negeri Surabaya exploring machine learning, data analytics, visualization, and data engineering.',
  openGraph: {
    title: 'Kartika Nur Savira — Data Science Portfolio',
    description:
      'Portfolio of Kartika Nur Savira, a Data Science student at Universitas Negeri Surabaya exploring machine learning, data analytics, visualization, and data engineering.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kartika Nur Savira — Data Science Portfolio',
    description:
      'Portfolio of Kartika Nur Savira, a Data Science student at Universitas Negeri Surabaya exploring machine learning, data analytics, visualization, and data engineering.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className={`${font.className} antialiased`}>{children}</body>
    </html>
  );
}
