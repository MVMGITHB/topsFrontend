// app/contact-us/page.jsx
import ContactUs from "@/components/contactus/contactus";
import React from "react";

// Dynamic metadata function
export async function generateMetadata() {
  const baseUrl = "https://top5shots.com";

  return {
    title: "Contact Us | Top5Shots",
    description:
      "Get in touch with Top5Shots for questions, feedback, or collaboration proposals. We're here to help!",
    alternates: {
      canonical: `${baseUrl}/contact-us`,
    },
    openGraph: {
      title: "Contact Us | Top5Shots",
      description:
        "Get in touch with Top5Shots for questions, feedback, or collaboration proposals. We're here to help!",
      url: `${baseUrl}/contact-us`,
      siteName: "Top5Shots",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: "Contact Us | Top5Shots",
      description:
        "Have feedback or a collaboration idea? Contact Top5Shots today.",
    },
  };
}

const ContactPage = () => {
  return <ContactUs />;
};

export default ContactPage;
