-- Vague secu : fermer les ecritures anonymes sur la progression, les dailies et les runs.
-- La cle anon peut encore LIRE (classements, sync feats). Les ecritures passent
-- par les Edge Functions (service_role) : approve-run et player-write.
-- Nettoie aussi les 3 lignes canary laissees par l'audit du 29 sept 2026.

BEGIN;

-- ── player_feats ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public insert" ON public.player_feats;
DROP POLICY IF EXISTS "public write" ON public.player_feats;
-- Garde la lecture publique si elle existe deja.
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='player_feats' AND policyname='public read'
  ) THEN
    CREATE POLICY "public read" ON public.player_feats FOR SELECT TO public USING (true);
  END IF;
END $$;

-- ── player_titles ────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public write" ON public.player_titles;
DROP POLICY IF EXISTS "public insert" ON public.player_titles;
DROP POLICY IF EXISTS "public update" ON public.player_titles;
DROP POLICY IF EXISTS "public delete" ON public.player_titles;
DROP POLICY IF EXISTS "Enable all access for all users" ON public.player_titles;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='player_titles' AND policyname='public read'
  ) THEN
    CREATE POLICY "public read" ON public.player_titles FOR SELECT TO public USING (true);
  END IF;
END $$;

-- ── daily_plays ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public insert" ON public.daily_plays;
DROP POLICY IF EXISTS "public write" ON public.daily_plays;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='daily_plays' AND policyname='public read'
  ) THEN
    CREATE POLICY "public read" ON public.daily_plays FOR SELECT TO public USING (true);
  END IF;
END $$;

-- ── corsair_runs ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "public insert" ON public.corsair_runs;
DROP POLICY IF EXISTS "update unless finished" ON public.corsair_runs;
DROP POLICY IF EXISTS "public update" ON public.corsair_runs;
DROP POLICY IF EXISTS "public write" ON public.corsair_runs;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='corsair_runs' AND policyname='public read'
  ) THEN
    CREATE POLICY "public read" ON public.corsair_runs FOR SELECT TO public USING (true);
  END IF;
END $$;

-- Le seed_token ne doit plus fuiter dans un SELECT * anonyme.
DO $$ BEGIN
  REVOKE SELECT (seed_token) ON public.corsair_runs FROM anon, authenticated;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'revoke seed_token skipped: %', SQLERRM;
END $$;

-- ── Canaries d'audit ─────────────────────────────────────────────────
DELETE FROM public.player_feats
  WHERE wallet_address = '0xauditcanary0000000000000000000000000000000000000000000000'
    AND feat_id = 'audit_canary';

DELETE FROM public.daily_plays
  WHERE wallet_address = '0xauditcanary0000000000000000000000000000000000000000000000'
    AND daily_key = 'audit-canary';

DELETE FROM public.corsair_runs
  WHERE run_id = '11111111-1111-1111-1111-111111111111';

COMMIT;
