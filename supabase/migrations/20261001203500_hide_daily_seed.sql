-- Daily = course a l'aveugle.
-- Le seed du jour ne doit pas etre lisible via la cle anon tant que le jour
-- UTC n'est pas clos. Les jours passes restent publics (partage / archive).

BEGIN;

CREATE OR REPLACE VIEW public.corsair_daily_board AS
SELECT
  id,
  wallet_address,
  username,
  score,
  date,
  CASE
    WHEN date::text < (timezone('utc', now()))::date::text THEN seed
    ELSE NULL
  END AS seed,
  submitted_at
FROM public.corsair_daily_scores;

GRANT SELECT ON public.corsair_daily_board TO anon, authenticated, service_role;

-- La table brute garde le seed pour approve-run (service_role).
-- Anon / authenticated ne le lisent plus directement.
DO $$ BEGIN
  REVOKE SELECT (seed) ON public.corsair_daily_scores FROM anon, authenticated;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'revoke daily seed skipped: %', SQLERRM;
END $$;

COMMIT;
