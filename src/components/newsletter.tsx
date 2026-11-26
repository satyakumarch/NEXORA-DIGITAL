import { useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { newsletterSchema } from "@/lib/newsletter";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email, consent });
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Check your email and consent.");
      return;
    }
    setPending(true);
    setMessage("");
    try {
      const { error } = await supabase.from("newsletter_subscriptions").insert(parsed.data);
      if (error && error.code !== "23505") throw error;
      setMessage("Thank you. Your newsletter signup request has been received.");
      setEmail("");
      setConsent(false);
    } catch {
      setMessage("Your signup could not be saved. Please try again.");
    } finally {
      setPending(false);
    }
  }
  return (
    <section className="section section-soft" aria-labelledby="newsletter-title">
      <div className="container grid gap-8 md:grid-cols-2">
        <div>
          <div className="eyebrow"><Mail size={16} /> Nexora newsletter</div>
          <h2 id="newsletter-title">Good ideas, in your inbox.</h2>
          <p className="section-lede mt-4">Website, marketing and automation insights from Nexora Digital.</p>
        </div>
        <form onSubmit={submit} className="flex min-w-0 flex-col gap-4">
          <label htmlFor="newsletter-email" className="text-sm font-medium">Email address</label>
          <div className="flex flex-wrap gap-3">
            <input id="newsletter-email" type="email" autoComplete="email" required maxLength={254}
              className="min-w-0 flex-1 rounded-md border border-border bg-background px-4 py-3 text-foreground"
              placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
            <Button type="submit" disabled={pending}>{pending ? "Saving…" : "Subscribe"}<ArrowRight /></Button>
          </div>
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-1" />
            <span>I agree to receive newsletter emails from Nexora Digital. I can request removal by email at any time.</span>
          </label>
          <p role="status" className="min-h-6 text-sm">{message}</p>
        </form>
      </div>
    </section>
  );
}