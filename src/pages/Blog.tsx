import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blog";
import Seo from "@/components/Seo";
import { SITE_URL, ORG_ID } from "@/lib/site";
import ScrollReveal from "@/components/ScrollReveal";

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
  <div className="relative isolate pt-24">
      <PageBackground />
    <Seo
      title="Blog IT & connectivité | ALTIS SPHERE GROUP"
      description="Actualités, conseils et tendances IT : cybersécurité, Starlink vs fibre, innovations technologiques — le blog d'ALTIS SPHERE GROUP."
      path="/blog"
      jsonLd={blogJsonLd}
    />
    <section className="py-24">
      <ScrollReveal>
        <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 max-w-3xl">
          <span className="section-kicker">Blog</span>
          <h1 className="section-title mt-4">Actualités & Conseils</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Nos analyses sur la connectivité, la cybersécurité et les infrastructures IT en République démocratique du Congo.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-lg border border-foreground/[0.08] bg-foreground/[0.04] transition-all duration-300 hover:-translate-y-1 hover:border-foreground/[0.16]"
            >
              <Link to={`/blog/${post.slug}`} className="block">
                <img src={post.image} alt={post.title} className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{post.category}</span>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em] transition-colors group-hover:text-primary">{post.title}</h2>
                </Link>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    Lire <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        </div>
      </ScrollReveal>
    </section>
  </div>
);

export default Blog;
