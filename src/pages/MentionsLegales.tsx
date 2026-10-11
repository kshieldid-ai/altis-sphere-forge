import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { breadcrumb, webPage } from "@/lib/seo-schemas";

const mentionsJsonLd = [
  webPage("Mentions légales - ALTIS SPHERE GROUP", "/mentions-legales", "Mentions légales et informations légales d'ALTIS SPHERE GROUP."),
  breadcrumb("Mentions légales", "/mentions-legales"),
];

const MentionsLegales = () => (
  <div className="relative isolate pt-24">
    <PageBackground />
    <Seo
      title="Mentions légales | ALTIS SPHERE GROUP"
      description="Mentions légales d'ALTIS SPHERE GROUP : édition, hébergement, propriété intellectuelle et responsabilité."
      path="/mentions-legales"
      jsonLd={mentionsJsonLd}
    />
    <section className="py-24">
      <div className="container max-w-3xl space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-kicker">Légal</span>
          <h1 className="section-title mt-4">Mentions <span className="gradient-text">légales</span></h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            Conformément à la législation en vigueur en République Démocratique du Congo, les présentes mentions légales
            précisent les informations relatives à l'édition et à l'hébergement du site altisphere-group.com.
          </p>
        </motion.div>

        <div className="space-y-8">
          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">1. Éditeur du site</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p><strong>Raison sociale :</strong> ALTIS SPHERE GROUP</p>
              <p><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</p>
              <p><strong>Siège social :</strong> 110, Avenue Biayi, Quartier Kalubwe, Lubumbashi, Haut-Katanga, RD Congo</p>
              <p><strong>Téléphone :</strong> +243 998 914 448 / +243 993 653 332</p>
              <p><strong>Email :</strong> support@altisphere-group.com</p>
              <p><strong>Directeur de la publication :</strong> Le représentant légal d'ALTIS SPHERE GROUP</p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">2. Hébergement</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p><strong>Hébergeur :</strong> GitHub Pages</p>
              <p><strong>Éditeur de l'hébergeur :</strong> GitHub, Inc.</p>
              <p><strong>Adresse :</strong> 88 Colin P. Kelly Jr Street, San Francisco, CA 94107, États-Unis</p>
              <p><strong>Site :</strong> https://pages.github.com</p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">3. Propriété intellectuelle</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                L'ensemble des contenus présents sur le site altisphere-group.com (textes, images, logos, graphismes,
                structure) est la propriété exclusive d'ALTIS SPHERE GROUP, sauf mention contraire. Toute reproduction,
                représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">4. Responsabilité</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                ALTIS SPHERE GROUP s'efforce d'assurer l'exactitude des informations diffusées sur ce site. Toutefois,
                l'entreprise ne saurait être tenue responsable des erreurs, omissions ou indisponibilités temporaires.
                Les liens hypertextes vers des sites externes n'engagent pas la responsabilité d'ALTIS SPHERE GROUP.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">5. Contact</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                Pour toute question relative aux présentes mentions légales, contactez-nous à l'adresse
                <a href="mailto:support@altisphere-group.com" className="text-primary hover:underline"> support@altisphere-group.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default MentionsLegales;
