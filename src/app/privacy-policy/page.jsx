// /app/privacy-policy/page.jsx

import PrivacyPolicy from '@/components/pages/privacypolicy';

export const metadata = {
  title: 'Privacy Policy | Top5Shots',
  description: 'Read the Privacy Policy of YourCompany to understand how we collect, use, and protect your personal information. Learn about your rights and data protection measures.',
  keywords: ['Privacy Policy', 'data protection', 'personal information', 'YourCompany', 'security', 'user rights'],
  openGraph: {
    title: 'Privacy Policy | YourCompany',
    description: 'YourCompany explains how we handle your data, your rights, and the measures we take to protect your information.',
    images: [
      {
        url: '/path-to-your-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Privacy Policy - YourCompany',
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
