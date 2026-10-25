import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import ScrollReveal from "@/components/ScrollReveal";
import { SITE_URL, ORG_ID } from "@/lib/site";

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog ALTIS SPHERE GROUP",
  url: `${SITE_URL}/blog`,
  inLanguage: "fr",
  publisher: { "@id": ORG_ID },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    articleSection: post.category,
  })),
};

const Blog = () => (
  <>
    <Seo
      title="Blog IT & connectivité | ALTIS SPHERE GROUP"
      description="Actualités, conseils et tendances IT : cybersécurité, Starlink vs fibre, innovations technologiques — le blog d'ALTIS SPHERE GROUP."
      path="/blog"
      jsonLd={blogJsonLd}
    />
    <PageHeader
      crumb="Blog"
      title="Actualités et conseils"
      lead="Nos analyses sur la connectivité, la cybersécurité et les infrastructures IT en République démocratique du Congo."
    />

    <section className="py-20 lg:py-24">
      <div className="container grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 0.05}>
            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_hsl(var(--navy)/0.25)]">
              <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="block aspect-[16/10] overflow-hidden">
                <img src={post.image} alt="" className="h-full w-full object-cover" loading="lazy" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-primary">{post.category}</span>
                  <span aria-hidden="true"> · </span>
                  <time>{post.date}</time>
                </p>
                <h2 className="mt-2 text-xl font-bold leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                  aria-label={`Lire l'article : ${post.title}`}
                >
                  Lire l'article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  </>
);

export default Blog;
