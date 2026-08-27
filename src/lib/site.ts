/**
 * Source unique de vérité pour le domaine de production.
 * Surchargeable au build via VITE_SITE_URL (GitHub Actions -> env).
 * Toujours sans slash final.
 */
export const SITE_URL = (
  (import.meta.env.VITE_SITE_URL as string | undefined) ?? "https://altisphere-group.com"
).replace(/\/$/, "");

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
