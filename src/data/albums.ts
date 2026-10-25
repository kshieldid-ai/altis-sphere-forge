import fibreSoudure from "@/assets/IMG-20260607-WA0035.jpg";
import fibreChantier from "@/assets/IMG-20260627-WA0116.jpg";
import moduleFibre1 from "@/assets/connectivity/module fibre optique 1.jpeg";
import moduleFibre2 from "@/assets/connectivity/module fibre 2.jpeg";
import moduleFibre3 from "@/assets/connectivity/module fibre optique 3.jpeg";
import switchCisco from "@/assets/connectivity/switch cisco.jpeg";
import equipement from "@/assets/connectivity/equipement.jpeg";
import equipement1 from "@/assets/connectivity/equipement 1.jpeg";
import cctvStockPoteau from "@/assets/stock/cameras-surveillance-poteau.jpg";
import cctvStockFacade from "@/assets/stock/cameras-surveillance-facade.jpg";
export type AlbumPhoto = {
  src: string;
  alt: string;
};

export type Album = {
  slug: string;
  title: string;
  description: string;
  photos: AlbumPhoto[];
};

/**
 * Photos déposées dans src/assets/albums/<slug>/ : ajoutées automatiquement
 * à l'album du même nom, le nom de fichier servant de légende.
 * Un préfixe numérique (« 01-… ») fixe l'ordre sans apparaître dans la légende.
 * Le préfixe « 00- » désigne la photo de couverture : elle passe avant toutes
 * les autres, y compris les photos importées ci-dessous.
 */
const folderFiles = import.meta.glob<string>("/src/assets/albums/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});

const captionFromFile = (path: string) => {
  const name = path
    .split("/")
    .pop()!
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]+/, "") // préfixe d'ordre « 01- » : sert au tri, pas à la légende
    .replace(/[-_]+/g, " ")
    .trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
};

const isCoverFile = (path: string) => /^00[-_ ]/.test(path.split("/").pop()!);

const photosFromFolder = (slug: string, cover: boolean): AlbumPhoto[] =>
  Object.entries(folderFiles)
    .filter(([path]) => path.split("/").slice(-2, -1)[0] === slug && isCoverFile(path) === cover)
    .sort(([a], [b]) => a.localeCompare(b, "fr", { numeric: true }))
    .map(([path, src]) => ({ src, alt: captionFromFile(path) }));

/** Photos d'un album : couverture « 00- » d'abord, puis les photos fixes, puis le reste du dossier. */
const albumPhotos = (slug: string, fixed: AlbumPhoto[] = []): AlbumPhoto[] => [
  ...photosFromFolder(slug, true),
  ...fixed,
  ...photosFromFolder(slug, false),
];

export const albums: Album[] = [
  {
    slug: "services-informatiques",
    title: "Services Informatiques",
    description: "Fibre optique, réseaux et équipements : nos interventions sur le terrain.",
    photos: albumPhotos("services-informatiques", [
      { src: fibreSoudure, alt: "Soudure de fibre optique sur un chantier" },
      { src: fibreChantier, alt: "Préparation d'un manchon fibre sur site" },
      { src: moduleFibre1, alt: "Module fibre optique installé en baie de brassage" },
      { src: moduleFibre2, alt: "Raccordement de module fibre optique" },
      { src: moduleFibre3, alt: "Module fibre optique et gestion des câbles" },
      { src: switchCisco, alt: "Switch Cisco cœur de réseau" },
      { src: equipement, alt: "Équipements réseau professionnels" },
      { src: equipement1, alt: "Équipements de connectivité déployés" },
    ]),
  },
  {
    slug: "cctv",
    title: "CCTV",
    description: "Vidéosurveillance : caméras, enregistreurs et supervision installés pour nos clients.",
    photos: [
      ...albumPhotos("cctv"),
      // Photos libres de droits (Unsplash), placées après nos réalisations et signalées dans la légende
      { src: cctvStockPoteau, alt: "Caméras de surveillance sur poteau (photo d'illustration)" },
      { src: cctvStockFacade, alt: "Caméras bullet installées en façade (photo d'illustration)" },    ],
  },
];

export const getAlbumBySlug = (slug: string) => albums.find((album) => album.slug === slug);
