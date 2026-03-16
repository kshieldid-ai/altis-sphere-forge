CREATE TABLE IF NOT EXISTS public.devis_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  entreprise TEXT,
  service TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  delai TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.devis_requests ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_visitor()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NULL;
$$;

CREATE OR REPLACE FUNCTION public.is_authenticated_user()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL;
$$;

DROP POLICY IF EXISTS "Anyone can insert quote requests" ON public.devis_requests;
CREATE POLICY "Anyone can insert quote requests"
ON public.devis_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can view quote requests" ON public.devis_requests;
CREATE POLICY "Authenticated users can view quote requests"
ON public.devis_requests
FOR SELECT
TO authenticated
USING (public.is_authenticated_user());

DROP POLICY IF EXISTS "Authenticated users can update quote requests" ON public.devis_requests;
CREATE POLICY "Authenticated users can update quote requests"
ON public.devis_requests
FOR UPDATE
TO authenticated
USING (public.is_authenticated_user())
WITH CHECK (public.is_authenticated_user());

DROP POLICY IF EXISTS "Authenticated users can delete quote requests" ON public.devis_requests;
CREATE POLICY "Authenticated users can delete quote requests"
ON public.devis_requests
FOR DELETE
TO authenticated
USING (public.is_authenticated_user());