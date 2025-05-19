// app/author/[slug]/page.jsx

import AuthorPage from "@/components/authorSection/authorprofile";

export default function Page({ params }) {
  return <AuthorPage slug={params.slug} />;
}
