import React from 'react';
import { downloads, DownloadItem } from '@/data/downloads';

const AltisDownload = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Bienvenue sur Altis Download !</h1>
      
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Drivers Desktop</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloads.filter(item => item.category === 'Desktop Drivers').map((item: DownloadItem) => (
            <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden bg-card text-card-foreground">
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
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

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Applications Android (MODs)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloads.filter(item => item.category === 'Android Apps').map((item: DownloadItem) => (
            <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden bg-card text-card-foreground">
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
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

      <section>
        <h2 className="text-3xl font-semibold mb-6">PDFs et Autres Ressources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloads.filter(item => item.category === 'PDFs' || item.category === 'Other').map((item: DownloadItem) => (
            <div key={item.id} className="border rounded-lg shadow-lg overflow-hidden bg-card text-card-foreground">
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
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
    </div>
  );
};

export default AltisDownload;
