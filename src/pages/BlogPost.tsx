import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
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
      <article className="pb-20 pt-16 lg:pt-[4.5rem]">
        <header className="border-b bg-muted">
          <div className="container max-w-3xl py-12 lg:py-14">
            <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Accueil</Link>
              <ChevronRight size={14} aria-hidden="true" />
              <Link to="/blog" className="hover:text-primary">Blog</Link>
            </nav>
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="font-semibold text-primary">{post.category}</span>
              <span aria-hidden="true"> · </span>
              <time>{post.date}</time>
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
          </div>
        </header>

        <div className="container max-w-3xl">
          <img src={post.image} alt="" className="mt-10 aspect-video w-full rounded-lg object-cover" />

          <div className="mt-10 space-y-6 text-[1.0625rem] leading-8 text-foreground/90">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <aside className="mt-14 rounded-lg border bg-muted p-7">
            <h2 className="text-lg font-semibold">Vous avez un projet similaire ?</h2>
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
