-- Anti-spam sur les demandes de devis publiques.
-- Limite : 3 insertions / heure / adresse email, + bornes de longueur.
-- Limite connue : contournable en variant l'email. Pour une protection reelle,
-- ajouter une Edge Function + Turnstile/hCaptcha en amont.

CREATE OR REPLACE FUNCTION public.devis_rate_ok(_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT count(*) < 3
  FROM public.devis_requests
  WHERE lower(email) = lower(_email)
    AND created_at > now() - interval '1 hour';
$$;

-- Fonction utilisee uniquement dans une policy RLS : pas d'exposition via l'API
REVOKE ALL ON FUNCTION public.devis_rate_ok(text) FROM PUBLIC, anon, authenticated;

-- Index de support pour la fonction ci-dessus
CREATE INDEX IF NOT EXISTS devis_requests_email_created_idx
  ON public.devis_requests (lower(email), created_at DESC);

DROP POLICY IF EXISTS "Anyone can insert quote requests" ON public.devis_requests;

CREATE POLICY "Anyone can insert quote requests"
ON public.devis_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(nom))         BETWEEN 1  AND 120
  AND length(trim(telephone)) BETWEEN 6  AND 30
  AND length(trim(description)) BETWEEN 10 AND 4000
  AND length(trim(service))  > 0
  AND length(trim(email))    <= 254
  AND (entreprise IS NULL OR length(entreprise) <= 200)
  AND (budget      IS NULL OR length(budget)      <= 100)
  AND (delai       IS NULL OR length(delai)       <= 100)
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND public.devis_rate_ok(email)
);
