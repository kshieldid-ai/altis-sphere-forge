import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "@/data/blog";
import Seo from "@/components/Seo";
import { breadcrumb, webPage } from "@/lib/seo-schemas";
import NotFound from "./NotFound";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const postJsonLd = [
    webPage(post.title, `/blog/${post.slug}`, post.excerpt),
    breadcrumb(post.title, `/blog/${post.slug}`),
  ];

  return (
    <div className="relative isolate pt-24">
      <PageBackground />
      <Seo
        title={`${post.title} | ALTIS SPHERE GROUP`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        jsonLd={postJsonLd}
      />
      <article className="py-24">
        <ScrollReveal>
          <div className="container max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
              <ArrowLeft size={16} /> Retour au blog
            </Link>
            <span className="section-kicker mt-8 inline-block">{post.category}</span>
            <h1 className="section-title mt-4">{post.title}</h1>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              {post.date}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-10"
          >
            <img src={post.image} alt={post.title} className="aspect-video w-full rounded-lg object-cover" />
          </motion.div>

          <div className="mt-10 space-y-6 text-base leading-8 text-foreground/90">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-foreground/[0.08] bg-foreground/[0.04] p-8">
            <h3 className="text-xl font-semibold">Vous avez un projet similaire ?</h3>
            <p className="mt-3 text-muted-foreground">
              Nos experts vous accompagnons pour sécuriser et optimiser votre infrastructure.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]">
              Nous contacter
            </Link>
          </div>
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
};

export default BlogPost;
