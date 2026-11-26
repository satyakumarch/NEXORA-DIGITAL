CREATE TABLE public.newsletter_subscriptions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 email text NOT NULL UNIQUE CHECK (length(email) <= 254 AND email = lower(trim(email)) AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 consent boolean NOT NULL CHECK (consent = true),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.newsletter_subscriptions TO anon, authenticated;
GRANT ALL ON public.newsletter_subscriptions TO service_role;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may request newsletter signup with consent" ON public.newsletter_subscriptions FOR INSERT TO anon, authenticated WITH CHECK (consent = true);