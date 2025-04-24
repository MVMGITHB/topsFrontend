// /app/support/page.jsx

import SupportContent from '@/components/pages/support';

export const metadata = {
  title: 'Support - Top5Shots',
  description: 'Need help? Contact our support team at Top5Shots for assistance. Browse FAQs or send us a message directly for faster help.',
  keywords: ['Support', 'Top5Shots', 'help', 'contact', 'FAQs', 'customer service'],
  openGraph: {
    title: 'Support - Top5Shots',
    description: 'Reach out to our support team or explore FAQs on Top5Shots.',
    images: [
      {
        url: '/path-to-your-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Top5Shots Support Page',
      },
    ],
  },
};

export default function SupportPage() {
  return <SupportContent />;
}
