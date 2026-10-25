import Seo from "@/components/Seo";
import PageHeader from "@/components/PageHeader";
import { breadcrumb, webPage } from "@/lib/seo-schemas";

const confidentialiteJsonLd = [
  webPage("Politique de confidentialité - ALTIS SPHERE GROUP", "/politique-de-confidentialite", "Politique de confidentialité et protection des données personnelles d'ALTIS SPHERE GROUP."),
  breadcrumb("Politique de confidentialité", "/politique-de-confidentialite"),
];

const PolitiqueConfidentialite = () => (
  <>
    <Seo
      title="Politique de confidentialité | ALTIS SPHERE GROUP"
      description="Politique de confidentialité d'ALTIS SPHERE GROUP : collecte, utilisation et protection de vos données personnelles."
      path="/politique-de-confidentialite"
      jsonLd={confidentialiteJsonLd}
    />
    <PageHeader
      crumb="Confidentialité"
      title="Politique de confidentialité"
      lead="La présente politique décrit comment ALTIS SPHERE GROUP collecte, utilise et protège les données personnelles que vous nous communiquez lors de votre visite sur notre site ou de l'utilisation de nos services."
    />
    <section className="py-20 lg:py-24">
      <div className="container max-w-3xl">
        <div className="divide-y">
          <div className="py-8 first:pt-0">
            <h2 className="text-lg font-bold">1. Données collectées</h2>
            <div className="mt-3 space-y-2 text-[0.9375rem] leading-7 text-foreground/85">
              <p>Nous collectons uniquement les données nécessaires au traitement de vos demandes :</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Nom de l'entreprise (si applicable)</li>
                <li>Message et détails de votre demande</li>
              </ul>
              <p>Ces données sont saisies volontairement via nos formulaires de contact et de devis.</p>
            </div>
          </div>

          <div className="py-8 first:pt-0">
            <h2 className="text-lg font-bold">2. Finalité du traitement</h2>
            <div className="mt-3 space-y-2 text-[0.9375rem] leading-7 text-foreground/85">
              <p>Vos données sont utilisées pour :</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Répondre à vos demandes de renseignements et de devis</li>
                <li>Assurer le suivi de votre relation client</li>
                <li>Vous informer de nos offres et actualités (uniquement avec votre consentement)</li>
              </ul>
            </div>
          </div>

          <div className="py-8 first:pt-0">
            <h2 className="text-lg font-bold">3. Conservation des données</h2>
            <div className="mt-3 space-y-2 text-[0.9375rem] leading-7 text-foreground/85">
              <p>
                Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis pour une
                durée maximale de 3 ans à compter du dernier contact, conformément aux obligations légales applicables.
              </p>
            </div>
          </div>

          <div className="py-8 first:pt-0">
            <h2 className="text-lg font-bold">4. Sécurité et protection</h2>
            <div className="mt-3 space-y-2 text-[0.9375rem] leading-7 text-foreground/85">
              <p>
                ALTIS SPHERE GROUP met en œuvre des mesures techniques et organisationnelles pour protéger vos données
                contre tout accès non autorisé, modification, divulgation ou destruction. Nos échanges sont sécurisés
                via le protocole HTTPS (certificat SSL).
              </p>
            </div>
          </div>

          <div className="py-8 first:pt-0">
            <h2 className="text-lg font-bold">5. Vos droits</h2>
            <div className="mt-3 space-y-2 text-[0.9375rem] leading-7 text-foreground/85">
              <p>Conformément à la législation applicable, vous disposez des droits suivants :</p>
              <ul className="list-disc space-y-1 pl-6">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit d'opposition et de limitation du traitement</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à
                <a href="mailto:support@altisphere-group.com" className="text-primary hover:underline"> support@altisphere-group.com</a>.
              </p>
            </div>
          </div>

          <div className="py-8 first:pt-0">
            <h2 className="text-lg font-bold">6. Cookies</h2>
            <div className="mt-3 space-y-2 text-[0.9375rem] leading-7 text-foreground/85">
              <p>
                Ce site utilise des cookies uniquement à des fins de fonctionnement technique et de mesure d'audience
                anonyme. Aucun cookie publicitaire tiers n'est déposé sans votre consentement. Vous pouvez désactiver
                les cookies dans les paramètres de votre navigateur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default PolitiqueConfidentialite;
