import base_url from "@/components/helper/baseurl";
import { NextResponse } from "next/server";

const BASE_URL = "https://www.top5shots.com";

export async function GET() {
  try {
    const [blogsRes, viralRes, categoriesRes] = await Promise.all([
      fetch(`${base_url}/getAllArticle`, { cache: "no-store" }),
      fetch(`${base_url}/getAllViralStories`, { cache: "no-store" }),
      fetch(`${base_url}/category`, { cache: "no-store" }),
    ]);

    if (!blogsRes.ok) throw new Error(`Failed to fetch blogs`);
    if (!viralRes.ok) throw new Error(`Failed to fetch viral stories`);
    if (!categoriesRes.ok) throw new Error(`Failed to fetch categories`);

    const [blogs, viralStories, categories] = await Promise.all([
      blogsRes.json(),
      viralRes.json(),
      categoriesRes.json(),
    ]);

    const companiesRes = await fetch(`${base_url}/getAllCompany`, {
      cache: "no-store",
    });
    const companies = companiesRes.ok ? await companiesRes.json() : [];

    const urls = [
      { loc: "/", priority: 1.0 },
      { loc: "/blogs", priority: 0.8 },
      { loc: "/viral-stories", priority: 0.8 },
      { loc: "/results", priority: 0.8 },
      { loc: "/matchscore", priority: 0.8 },
      { loc: "/contest", priority: 0.8 },
      { loc: "/login", priority: 0.8 },
      { loc: "/signup", priority: 0.8 },
    ];

    blogs.forEach((b) =>
      urls.push({
        loc: `/blog/${b.slug}`,
        lastmod: safeDate(b.updatedAt, b.createdAt),
        priority: 0.7,
      })
    );

    viralStories.forEach((v) =>
      urls.push({
        loc: `/viral-stories/${v.slug}`,
        lastmod: safeDate(v.updatedAt, v.createdAt),
        priority: 0.7,
      })
    );

    categories.forEach((cat) =>
      urls.push({
        loc: `/${cat.slug}`,
        lastmod: safeDate(cat.updatedAt, cat.createdAt),
        priority: 0.75,
      })
    );

    companies.forEach((company) => {
      if (company.slug) {
        urls.push({
          loc: `/company/${company.slug}`,
          lastmod: safeDate(company.updatedAt, company.createdAt),
          priority: 0.7,
        });
      }
    });

    const comparisonUrls = await Promise.all(
      categories.map(async (cat) => {
        try {
          const res = await fetch(`${base_url}/filter1/${cat.slug}`, {
            cache: "no-store",
          });
          if (!res.ok) return [];

          const items = await res.json();
          const urlsForCategory = [];

          items.forEach((item) => {
            if (Array.isArray(item.compBlogs)) {
              item.compBlogs.forEach((compBlog) => {
                if (compBlog?.subcategories?.slug && compBlog?.slug) {
                  urlsForCategory.push({
                    loc: `/${compBlog.subcategories.slug}/${compBlog.slug}`,
                    lastmod: safeDate(compBlog.updatedAt, compBlog.createdAt),
                    priority: 0.7,
                  });
                }
              });

              // Add category-level URL (only once per category)
              const firstCompBlog = item.compBlogs[0];
              if (firstCompBlog?.subcategories?.slug) {
                urlsForCategory.push({
                  loc: `/${firstCompBlog.subcategories.slug}`,
                  lastmod: safeDate(
                    firstCompBlog.updatedAt,
                    firstCompBlog.createdAt
                  ),
                  priority: 0.7,
                });
              }
            }
          });

          return urlsForCategory;
        } catch {
          return [];
        }
      })
    );

    urls.push(...comparisonUrls.flat());

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${BASE_URL}${u.loc}</loc>
  ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
  <changefreq>weekly</changefreq>
  <priority>${u.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return NextResponse.json("Sitemap generation error", { status: 500 });
  }
}

function safeDate(updatedAt, createdAt) {
  try {
    if (updatedAt) return new Date(updatedAt).toISOString();
    if (createdAt) return new Date(createdAt).toISOString();
  } catch {
    return "";
  }
}
