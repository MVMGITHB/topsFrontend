import Script from 'next/script';

export default function AnalyticsScript() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-B6KBQKWQMS"
        strategy="afterInteractive"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B6KBQKWQMS');
          `,
        }}
      />
    </>
  );
}
