import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { albums, type AlbumPhoto } from "@/data/albums";
import ScrollReveal from "@/components/ScrollReveal";
import { cn } from "@/lib/utils";

const SLIDE_DURATION = 4_000;

/**
 * Diaporama de la carte d'album : les photos défilent en fondu enchaîné.
 * Seules la photo affichée et la précédente sont montées, pour ne pas
 * charger tout l'album d'un coup. Pause au survol ; immobile si le
 * visiteur a demandé à réduire les animations.
 */
const AlbumSlideshow = ({ photos, startDelay }: { photos: AlbumPhoto[]; startDelay: number }) => {
  const [{ current, previous }, setSlide] = useState<{ current: number; previous: number | null }>({
    current: 0,
    previous: null,
  });
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const animated = photos.length > 1 && !reduceMotion;

  useEffect(() => {
    if (!animated || paused) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const next = () =>
      setSlide((slide) => ({ current: (slide.current + 1) % photos.length, previous: slide.current }));
    // Départ décalé d'un album à l'autre, pour que les cartes ne changent pas en même temps
    const start = setTimeout(() => {
      next();
      interval = setInterval(next, SLIDE_DURATION);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [animated, paused, photos.length, startDelay]);

  return (
    <div
      className="relative h-full w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {previous !== null && previous !== current ? (
        <img src={photos[previous].src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : null}
      <img
        key={current}
        src={photos[current].src}
        alt=""
        loading={current === 0 ? "lazy" : "eager"}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105",
          previous !== null && "animate-in fade-in duration-1000",
        )}
      />
      {animated ? (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {photos.map((photo, index) => (
            <span
              key={photo.src}
              className={cn(
                "h-1.5 rounded-full bg-white/60 shadow-sm transition-all duration-300",
                index === current ? "w-5 bg-white" : "w-1.5",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

/** Albums photos de nos réalisations, affichés sur la page Blog. */
const PhotoAlbums = () => (
  <section aria-labelledby="albums-photos" className="border-t py-20 lg:py-24">
    <div className="container">
      <div className="max-w-2xl">
        <h2 id="albums-photos" className="text-3xl font-bold tracking-[-0.02em]">Albums photos</h2>
        <p className="mt-3 leading-7 text-muted-foreground">Nos réalisations en images, sur le terrain.</p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {albums.map((album, i) => {
          const path = `/blog/albums/${album.slug}`;
          return (
            <ScrollReveal key={album.slug} delay={i * 0.05}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_hsl(var(--navy)/0.25)]">
                <Link to={path} tabIndex={-1} aria-hidden="true" className="block aspect-[16/9] overflow-hidden bg-muted">
                  {album.photos.length > 0 ? (
                    <AlbumSlideshow photos={album.photos} startDelay={SLIDE_DURATION / 2 + i * 1_500} />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-primary">
                      <Camera size={40} />
                    </span>
                  )}
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm font-bold text-primary">
                    {album.photos.length > 0
                      ? `${album.photos.length} photo${album.photos.length > 1 ? "s" : ""}`
                      : "Photos à venir"}
                  </p>
                  <h3 className="mt-2 text-xl font-bold leading-snug">
                    <Link to={path} className="hover:text-primary">{album.title}</Link>
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{album.description}</p>
                  <Link
                    to={path}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline"
                    aria-label={`Voir l'album : ${album.title}`}
                  >
                    Voir l'album <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default PhotoAlbums;
