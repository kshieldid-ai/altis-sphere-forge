import PageBackground from "@/components/PageBackground";
import { motion } from "framer-motion";
import Seo from "@/components/Seo";
import { breadcrumb, webPage } from "@/lib/seo-schemas";

const cgvJsonLd = [
  webPage("Conditions Générales de Vente - ALTIS SPHERE GROUP", "/cgv", "Conditions générales de vente des services ALTIS SPHERE GROUP."),
  breadcrumb("Conditions générales de vente", "/cgv"),
];

const CGV = () => (
  <div className="relative isolate pt-24">
    <PageBackground />
    <Seo
      title="Conditions générales de vente | ALTIS SPHERE GROUP"
      description="Conditions générales de vente des services informatiques et de connectivité d'ALTIS SPHERE GROUP."
      path="/cgv"
      jsonLd={cgvJsonLd}
    />
    <section className="py-24">
      <div className="container max-w-3xl space-y-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="section-kicker">CGV</span>
          <h1 className="section-title mt-4">Conditions Générales de <span className="gradient-text">Vente</span></h1>
          <p className="mt-6 text-base leading-8 text-muted-foreground">
            Les présentes conditions générales de vente (CGV) régissent les prestations de services proposées par
            ALTIS SPHERE GROUP. Toute commande implique l'acceptation sans réserve des présentes conditions.
          </p>
        </motion.div>

        <div className="space-y-8">
          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">1. Objet</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                ALTIS SPHERE GROUP propose des services informatiques, de connectivité internet, de cybersécurité,
                de développement web et de domotique. Les présentes CGV s'appliquent à toute souscription de services
                par un client particulier ou professionnel.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">2. Devis et commande</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                Toute prestation fait l'objet d'un devis préalable détaillé. La commande est ferme et définitive
                dès signature du devis et versement de l'acompte, le cas échéant. Les délais indiqués sont donnés
                à titre indicatif et ne sauraient engager la responsabilité d'ALTIS SPHERE GROUP en cas de force majeure.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">3. Prix et modalités de paiement</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                Les prix sont exprimés en francs congolais (CDF) ou en dollars américains (USD), hors taxes, sauf
                mention contraire sur le devis. Les modalités de paiement (acompte, échéancier, paiement à la livraison)
                sont définies dans le devis. Tout retard de paiement peut entraîner la suspension de la prestation.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">4. Réalisation des prestations</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                ALTIS SPHERE GROUP s'engage à mettre en œuvre tous les moyens nécessaires pour exécuter les prestations
                dans les règles de l'art. Le client s'engage à fournir les informations et accès nécessaires au bon
                déroulement de la mission.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">5. Garantie et responsabilité</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                ALTIS SPHERE GROUP garantit la conformité des prestations aux spécifications définies. La responsabilité
                de l'entreprise est limitée au montant de la prestation et ne saurait couvrir les dommages indirects
                (perte de données, perte d'exploitation, etc.) résultant de l'utilisation des services.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">6. Résiliation</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                En cas de manquement grave de l'une des parties à ses obligations, l'autre partie pourra résilier
                les prestations par lettre recommandée avec accusé de réception, après mise en demeure restée sans
                effet pendant 15 jours.
              </p>
            </div>
          </div>

          <div className="editorial-panel">
            <h2 className="text-lg font-semibold text-foreground">7. Droit applicable et litiges</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-foreground/80">
              <p>
                Les présentes CGV sont soumises au droit congolais. Tout litige relatif à leur interprétation ou à
                leur exécution relève de la compétence des tribunaux de Lubumbashi, à défaut de résolution amiable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default CGV;
