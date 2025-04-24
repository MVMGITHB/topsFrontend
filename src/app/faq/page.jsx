// /app/faq/page.jsx

import FaqContent from '@/components/pages/faq';

export const metadata = {
  title: 'FAQs - Top5Shots',
  description: 'Find answers to frequently asked questions about Top5Shots. Learn how to join contests, track your submissions, and more.',
  keywords: ['FAQs', 'Top5Shots help', 'how to use Top5Shots', 'contest questions'],
  openGraph: {
    title: 'FAQs - Top5Shots',
    description: 'Find answers to frequently asked questions about Top5Shots.',
    images: [
      {
        url: '/path-to-your-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Top5Shots FAQs',
      },
    ],
  },
};

export default function FAQPage() {
  return <FaqContent />;
}
