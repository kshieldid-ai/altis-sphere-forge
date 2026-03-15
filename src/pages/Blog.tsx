import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import blogCyber from "@/assets/blog-cybersecurity.jpg";
import blogStarlink from "@/assets/blog-starlink-fibre.jpg";
import blogTendances from "@/assets/blog-tendances-it.jpg";

const posts = [
  { title: "Comment sécuriser votre réseau d'entreprise en 2026", category: "Cybersécurité", date: "10 mars 2026", excerpt: "Découvrez les meilleures pratiques pour protéger votre infrastructure contre les menaces actuelles.", image: blogCyber },
  { title: "Starlink vs Fibre : quelle solution choisir ?", category: "Connectivité", date: "5 mars 2026", excerpt: "Comparatif complet des solutions de connectivité pour les zones rurales et urbaines.", image: blogStarlink },
  { title: "Les tendances IT à surveiller cette année", category: "Innovation", date: "28 février 2026", excerpt: "IA, edge computing, 5G privée : les technologies qui vont transformer votre entreprise.", image: blogTendances },
];

const Blog = () => (
  <div className="pt-20">
    <section className="py-24">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">Blog</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-bold mt-3 mb-4">Actualités & Conseils</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Restez informé des dernières tendances et innovations technologiques.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/40 transition-colors cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{post.category}</span>
                <h3 className="font-heading font-semibold text-lg mt-2 mb-3">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
