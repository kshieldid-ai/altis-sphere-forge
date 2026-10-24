import { downloads, DownloadItem } from '@/data/downloads';

const SECTIONS: { title: string; categories: DownloadItem['category'][] }[] = [
  { title: 'Drivers Desktop', categories: ['Desktop Drivers'] },
  { title: 'Applications Android', categories: ['Android Apps'] },
  { title: 'PDFs et Autres Ressources', categories: ['PDFs', 'Other'] },
];

const AltisDownload = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Bienvenue sur Altis Download !</h1>

      {SECTIONS.map(({ title, categories }) => {
        const items = downloads.filter((item) => categories.includes(item.category));
        // Une section sans contenu n'est pas affichée
        if (items.length === 0) return null;

        return (
          <section key={title} className="mb-12">
            <h2 className="text-3xl font-semibold mb-6">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden bg-card text-card-foreground">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-4">{item.description}</p>
                    <a
                      href={item.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Télécharger
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default AltisDownload;
