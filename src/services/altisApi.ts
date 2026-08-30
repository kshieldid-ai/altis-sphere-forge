/**
 * Client HTTP de la sous-application Django « altis »
 * hébergée dans AFFAGRIPEL (affagripel-lualaba.com/api/altis).
 *
 * ⚠ Pas de `throw` au chargement du module : une exception ici
 *    casserait tout le bundle et provoquerait une page blanche.
 *    On applique une valeur de repli et on journalise.
 */

const FALLBACK_URL = "https://affagripel-lualaba.com/api/altis";

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) || FALLBACK_URL;

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    `[altisApi] VITE_API_URL absente — repli sur ${FALLBACK_URL}. ` +
      "Vérifier .env.development / .env.production.",
  );
}

/** Délai au-delà duquel la requête est abandonnée (ms). */
const REQUEST_TIMEOUT = 20_000;

export type DjangoFieldErrors = Record<string, string[] | string>;

export class ApiError extends Error {
  status: number;
  fields: DjangoFieldErrors;

  constructor(message: string, status: number, fields: DjangoFieldErrors = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fields = fields;
  }

  /** Premier message d'erreur exploitable, pour un toast. */
  firstMessage(): string {
    const first = Object.values(this.fields)[0];
    if (Array.isArray(first)) return first[0];
    if (typeof first === "string") return first;
    return this.message;
  }
}

type RequestOptions = {
  method?: "GET" | "POST";
  body?: unknown;
  signal?: AbortSignal;
};

async function request<T>(endpoint: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, signal } = opts;

  // Timeout local, combiné à un éventuel signal externe
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  if (signal) {
    signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
  } catch (err) {
    if (signal?.aborted) throw err; // annulation volontaire par l'appelant
    if ((err as Error).name === "AbortError") {
      throw new ApiError(
        "Le serveur met trop de temps à répondre. Réessayez dans un instant.",
        0,
      );
    }
    // Aucune réponse HTTP : backend arrêté, DNS, ou blocage CORS
    throw new ApiError(
      "Serveur injoignable. Vérifiez votre connexion et réessayez.",
      0,
    );
  } finally {
    clearTimeout(timer);
  }

  if (response.status === 204) return null as T;

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {
    // réponse non-JSON (page d'erreur HTML du serveur)
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new ApiError(
        "Trop de demandes envoyées depuis cet appareil. Réessayez dans une heure.",
        429,
      );
    }
    if (response.status >= 500) {
      throw new ApiError(
        "Erreur du serveur. Notre équipe est prévenue, réessayez plus tard.",
        response.status,
      );
    }
    throw new ApiError(
      (data as { detail?: string })?.detail ?? `Erreur HTTP ${response.status}`,
      response.status,
      data && typeof data === "object" ? (data as DjangoFieldErrors) : {},
    );
  }

  return data as T;
}

export type DevisPayload = {
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  service: string;
  description: string;
  budget: string;
  delai: string;
  /** Honeypot : doit rester vide pour un humain. */
  website: string;
};

export type ContactPayload = {
  nom: string;
  email: string;
  telephone: string;
  entreprise: string;
  sujet: string;
  message: string;
  /** Honeypot : doit rester vide pour un humain. */
  website: string;
};

export type SubmissionResponse = {
  id: number;
  created_at: string;
  /** Présent uniquement quand DEBUG=True côté Django. */
  mail_sent?: boolean;
};

/** Conservé pour compatibilité avec les imports existants. */
export type DevisResponse = SubmissionResponse;

export const altisApi = {
  /** Diagnostic de disponibilité du backend. */
  health: (signal?: AbortSignal) =>
    request<{ status: string; service: string }>("/health/", { signal }),

  /** Liste de référence des services — source de vérité côté Django. */
  services: (signal?: AbortSignal) =>
    request<{ services: string[] }>("/services/", { signal }),

  /** Soumission d'une demande de devis (service = liste fermée). */
  submitDevis: (payload: DevisPayload) =>
    request<SubmissionResponse>("/devis/", { method: "POST", body: payload }),

  /** Soumission d'un message de contact (sujet = texte libre). */
  submitContact: (payload: ContactPayload) =>
    request<SubmissionResponse>("/contact/", { method: "POST", body: payload }),
};
