import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { getPostBySlug } from "@/data/blog";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { breadcrumb, webPage } from "@/lib/seo-schemas";
import NotFound from "./NotFound";

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
    <>
      <Seo
        title={`${post.title} | ALTIS SPHERE GROUP`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        jsonLd={postJsonLd}
      />
      <PageHeader crumb="Blog" title={post.title} lead={post.excerpt}>
        <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/70">
          <span className="text-sky">{post.category}</span>
          <span aria-hidden="true"> · </span>
          <time>{post.date}</time>
        </p>
      </PageHeader>
      <article className="pb-24">
        <div className="container max-w-3xl">
          <img src={post.image} alt="" className="mt-14 aspect-video w-full rounded-2xl object-cover" />

          <div className="mt-10 space-y-6 text-[1.0625rem] leading-8 text-foreground/90">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <aside className="service-shell mt-14 bg-muted">
            <h2 className="text-lg font-bold">Vous avez un projet similaire ?</h2>
            <p className="mt-2 text-muted-foreground">
              Nos techniciens vous accompagnent pour sécuriser et optimiser votre infrastructure.
            </p>
            <Button variant="hero" className="mt-5" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </aside>

          <Link to="/blog" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft size={16} /> Tous les articles
          </Link>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
