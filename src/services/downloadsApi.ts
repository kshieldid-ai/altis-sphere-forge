/**
 * Client HTTP du backend Django « downloads » (lecture seule).
 *
 * L'URL vient de VITE_DOWNLOADS_API_URL (.env.development en local).
 * Sans cette variable, l'API est désactivée : la page Téléchargements
 * affiche alors uniquement la liste fixe de src/data/downloads.ts.
 */
import type { DownloadItem } from "@/data/downloads";

const BASE_URL = ((import.meta.env.VITE_DOWNLOADS_API_URL as string | undefined) ?? "").replace(/\/$/, "");

/** Délai au-delà duquel on abandonne et on garde la liste fixe (ms). */
const REQUEST_TIMEOUT = 8_000;

const CATEGORIES: DownloadItem["category"][] = ["Desktop Drivers", "Android Apps", "PDFs", "Other"];

/** Format renvoyé par Django REST Framework. */
type ApiDownloadItem = {
  id: number;
  name: string;
  image: string;
  download_link: string;
  description: string;
  category: string;
  created_at: string;
};

export const isDownloadsApiEnabled = BASE_URL !== "";

/** Les liens et images doivent être en http(s) : on écarte tout le reste. */
const isHttpUrl = (value: string) => /^https?:\/\//i.test(value);

const toDownloadItem = (item: ApiDownloadItem): DownloadItem | null => {
  // DRF renvoie une URL d'image absolue ; repli si le chemin est relatif
  const image = isHttpUrl(item.image) ? item.image : new URL(item.image, BASE_URL).href;
  if (!isHttpUrl(item.download_link) || !isHttpUrl(image)) return null;

  return {
    id: `api-${item.id}`,
    name: item.name,
    imageUrl: image,
    downloadLink: item.download_link,
    description: item.description,
    category: CATEGORIES.includes(item.category as DownloadItem["category"])
      ? (item.category as DownloadItem["category"])
      : "Other",
  };
};

async function getItems(signal?: AbortSignal): Promise<DownloadItem[]> {
  if (!isDownloadsApiEnabled) return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  signal?.addEventListener("abort", () => controller.abort(), { once: true });

  try {
    const response = await fetch(`${BASE_URL}/items/`, { signal: controller.signal });
    if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
    const data = (await response.json()) as ApiDownloadItem[];
    return data.map(toDownloadItem).filter((item): item is DownloadItem => item !== null);
  } finally {
    clearTimeout(timer);
  }
}

export const downloadsApi = { getItems };
