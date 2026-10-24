import { ExternalLink } from 'lucide-react';
import { downloads, DownloadItem } from '@/data/downloads';
import Seo from '@/components/Seo';
import PageHeader from '@/components/PageHeader';

const SECTIONS: { title: string; categories: DownloadItem['category'][] }[] = [
  { title: 'Pilotes', categories: ['Desktop Drivers'] },
  { title: 'Applications Android', categories: ['Android Apps'] },
  { title: 'Documents et ressources', categories: ['PDFs', 'Other'] },
];

const AltisDownload = () => {
  return (
    <>
      <Seo
        title="Téléchargements | ALTIS SPHERE GROUP"
        description="Liens officiels vers les pilotes NVIDIA, AMD et Intel, sélectionnés par ALTIS SPHERE GROUP."
        path="/altis-download"
      />
      <PageHeader
        crumb="Téléchargements"
        title="Téléchargements"
        lead="Liens officiels des éditeurs vers les pilotes et utilitaires que nous recommandons."
      />

      <div className="container py-16 lg:py-20">
        {SECTIONS.map(({ title, categories }) => {
          const items = downloads.filter((item) => categories.includes(item.category));
          // Une section sans contenu n'est pas affichée
          if (items.length === 0) return null;

          return (
            <section key={title} className="mb-14 last:mb-0">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <article key={item.id} className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
                    <img
                      src={item.imageUrl}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/9] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                      <a
                        href={item.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      >
                        Site officiel <ExternalLink size={14} />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
};

export default AltisDownload;
