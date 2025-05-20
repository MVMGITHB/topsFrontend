import ContactUs from "@/components/pages/contactus";

export const metadata = {
  title: "Contact Us | Top5Shots",
  description:
    "Have questions or feedback? Get in touch with Top5Shots via our contact form or email us directly at contact@top5shots.com.",
  keywords:
    "Top5Shots contact, get in touch, email, support, message, help, feedback",
  openGraph: {
    title: "Contact Us | Top5Shots",
    description:
      "Reach out to Top5Shots for support or inquiries. We're here to help.",
    url: "https://top5shots.com/contact-us",
    type: "website",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Top5Shots Contact",
      },
    ],
  },
};

export default function Page() {
  return <ContactUs />;
}
