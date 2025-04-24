const metadata = {
  title: 'Terms of Service',
  description:
    'Read the terms and conditions for using Top5Shots, including platform use, content ownership, account responsibilities, and more.',
  keywords: ['Terms of Service', 'Top5Shots', 'conditions', 'platform use', 'content ownership'],
  openGraph: {
    title: 'Terms of Service - Top5Shots',
    description: 'Read the terms and conditions for using Top5Shots...',
    images: [
      {
        url: '/path-to-your-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Terms of Service Image',
      },
    ],
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-black">Terms of Service</h1>

      <div className="space-y-8 text-gray-700 text-base leading-relaxed">
        <p>Welcome to Top5Shots! By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.</p>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">1. Use of the Platform</h2>
          <p>You agree to use Top5Shots only for lawful purposes and in a manner that does not violate the rights of others.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">2. Content Ownership</h2>
          <p>All content you post remains yours, but by submitting it to Top5Shots, you grant us a non-exclusive license to use it in connection with the platform.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">3. Account Responsibilities</h2>
          <p>You are responsible for maintaining the confidentiality of your login information and all activities under your account.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">4. Termination</h2>
          <p>We reserve the right to terminate or suspend your access to Top5Shots at any time for violation of these Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-black mb-2">5. Modifications</h2>
          <p>We may update these terms from time to time. Continued use of the platform after updates means you accept the new terms.</p>
        </section>

        <p className="text-gray-600">
          If you have questions about these Terms, contact us at{" "}
          <a href="mailto:support@top5shots.com" className="text-blue-600 underline hover:text-blue-800">
            support@top5shots.com
          </a>.
        </p>
      </div>
    </div>
  );
}
