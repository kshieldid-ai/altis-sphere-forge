// Runs before `vite dev` and `vite build` (predev/prebuild hooks).
// Writes public/sitemap.xml AND public/robots.txt from a single source of truth.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = (process.env.VITE_SITE_URL ?? "https://altisphere-group.com").replace(/\/$/, "");

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/a-propos", changefreq: "monthly", priority: "0.7" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/produits", changefreq: "monthly", priority: "0.8" },
  { path: "/solutions", changefreq: "monthly", priority: "0.8" },
  { path: "/domotique", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/contact", changefreq: "yearly", priority: "0.6" },
];

const lastmod = new Date().toISOString().slice(0, 10);

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${lastmod}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
].join("\n");

const robots = [
  "User-agent: Googlebot",
  "Allow: /",
  "",
  "User-agent: Bingbot",
  "Allow: /",
  "",
  "User-agent: Twitterbot",
  "Allow: /",
  "",
  "User-agent: facebookexternalhit",
  "Allow: /",
  "",
  "User-agent: *",
  "Allow: /",
  "",
  `Sitemap: ${BASE_URL}/sitemap.xml`,
  "",
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
writeFileSync(resolve("public/robots.txt"), robots);
console.log(`sitemap.xml (${entries.length} entries) + robots.txt written for ${BASE_URL}`);
