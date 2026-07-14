import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import blogCyber from "@/assets/blog-cybersecurity.jpg";
import blogStarlink from "@/assets/blog-starlink-fibre.jpg";
import blogTendances from "@/assets/blog-tendances-it.jpg";
import Seo from "@/components/Seo";

const posts = [
  { title: "Comment sécuriser votre réseau d'entreprise en 2026", category: "Cybersécurité", date: "10 mars 2026", excerpt: "Découvrez les meilleures pratiques pour protéger votre infrastructure contre les menaces actuelles.", image: blogCyber },
  { title: "Starlink vs Fibre : quelle solution choisir ?", category: "Connectivité", date: "5 mars 2026", excerpt: "Comparatif complet des solutions de connectivité pour les zones rurales et urbaines.", image: blogStarlink },
  { title: "Les tendances IT à surveiller cette année", category: "Innovation", date: "28 février 2026", excerpt: "IA, edge computing, 5G privée : les technologies qui vont transformer votre entreprise.", image: blogTendances },
];

const Blog = () => (
  <div className="pt-24">
    <Seo
      title="Blog IT & Connectivité | ALTIS SPHERE"
      description="Actualités, conseils et tendances IT : cybersécurité, Starlink vs fibre, innovations technologiques — le blog ALTIS SPHERE."
      path="/blog"
    />
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 max-w-3xl">
          <span className="section-kicker">Blog</span>
          <h1 className="section-title mt-4">Actualités & Conseils</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Même contenu, mais avec une lecture plus éditoriale et un rythme visuel plus marqué.
          </p>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/75 transition-transform duration-300 hover:-translate-y-1"
            >
              <img src={post.image} alt={post.title} className="h-56 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{post.category}</span>
                <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.03em]">{post.title}</h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  <Calendar size={14} />
                  {post.date}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
