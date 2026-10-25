import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { getAlbumBySlug } from "@/data/albums";
import { breadcrumb, webPage } from "@/lib/seo-schemas";
import NotFound from "./NotFound";

const AlbumPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const album = slug ? getAlbumBySlug(slug) : undefined;
  /** Index de la photo ouverte en grand, null si la visionneuse est fermée. */
  const [current, setCurrent] = useState<number | null>(null);

  if (!album) {
    return <NotFound />;
  }

  const { photos } = album;
  const path = `/blog/albums/${album.slug}`;
  const step = (delta: number) =>
    setCurrent((index) => (index === null ? null : (index + delta + photos.length) % photos.length));

  return (
    <>
      <Seo
        title={`Album ${album.title} | ALTIS SPHERE GROUP`}
        description={album.description}
        path={path}
        jsonLd={[webPage(`Album ${album.title}`, path, album.description), breadcrumb(album.title, path)]}
      />
      <PageHeader crumb="Albums" title={album.title} lead={album.description} />

      <section className="py-20 lg:py-24">
        <div className="container">
          {photos.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed bg-muted/40 px-6 py-16 text-center">
              <Camera size={32} className="text-primary" aria-hidden="true" />
              <p className="mt-4 text-lg font-bold">Photos à venir</p>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Nous préparons les images de nos réalisations. Revenez bientôt.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, index) => (
                <li key={photo.src}>
                  <button
                    type="button"
                    onClick={() => setCurrent(index)}
                    className="group block aspect-square w-full overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`Agrandir : ${photo.alt}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Button variant="outline" className="mt-12" asChild>
            <Link to="/blog">
              <ArrowLeft size={16} /> Retour au blog
            </Link>
          </Button>
        </div>
      </section>

      <Dialog open={current !== null} onOpenChange={(open) => !open && setCurrent(null)}>
        {current !== null ? (
          <DialogContent
            className="max-w-5xl gap-3 border-none bg-navy p-3 text-white sm:p-4 [&>button]:text-white"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") step(1);
              if (e.key === "ArrowLeft") step(-1);
            }}
          >
            <DialogTitle className="sr-only">{album.title}</DialogTitle>
            <img
              src={photos[current].src}
              alt={photos[current].alt}
              className="max-h-[75vh] w-full rounded-lg object-contain"
            />
            <div className="flex items-center justify-between gap-3">
              <DialogDescription className="text-sm text-white/80">
                {photos[current].alt}
                <span className="ml-2 text-white/50">
                  {current + 1} / {photos.length}
                </span>
              </DialogDescription>
              {photos.length > 1 ? (
                <div className="flex shrink-0 gap-2">
                  <Button size="icon" variant="secondary" onClick={() => step(-1)} aria-label="Photo précédente">
                    <ChevronLeft size={18} />
                  </Button>
                  <Button size="icon" variant="secondary" onClick={() => step(1)} aria-label="Photo suivante">
                    <ChevronRight size={18} />
                  </Button>
                </div>
              ) : null}
            </div>
          </DialogContent>
        ) : null}
      </Dialog>
    </>
  );
};

export default AlbumPage;
