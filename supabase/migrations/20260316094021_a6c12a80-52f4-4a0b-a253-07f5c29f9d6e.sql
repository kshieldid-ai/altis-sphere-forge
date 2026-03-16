DROP POLICY IF EXISTS "Anyone can insert quote requests" ON public.devis_requests;

CREATE POLICY "Anyone can insert quote requests"
ON public.devis_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(nom)) > 0
  AND length(trim(email)) > 0
  AND length(trim(telephone)) > 0
  AND length(trim(service)) > 0
  AND length(trim(description)) > 0
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);