import { useState, type FormEvent } from "react";
import { Mail, MessageCircle, Globe, ArrowUpRight, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-parts";
import { siteConfig, contactChannels } from "@/lib/site-config";
import { services } from "@/lib/content";
import { inquirySchema, canSubmitInquiry } from "@/lib/inquiry";

export function ContactPage({
  selectedService = "",
  selectedPlan = "",
}: {
  selectedService?: string;
  selectedPlan?: string;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const channels = contactChannels(siteConfig);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setFailed(false);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        const key = i.path[0];
        if (typeof key === "string") next[key] = i.message;
      });
      setErrors(next);
      setFailed(true);
      setStatus("Please review the highlighted fields. Nothing has been sent.");
      return;
    }
    setErrors({});
    if (!canSubmitInquiry(siteConfig.inquiryEndpoint)) {
      setStatus(
        "Your details are valid, but online submission is not connected yet. Nothing has been sent. Please contact us using email or WhatsApp.",
      );
      setFailed(true);
      return;
    }
    setBusy(true);
    try {
      const response = await fetch(siteConfig.inquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error("Submission failed");
      setStatus(
        "Your inquiry was accepted by our submission service. Thank you for sharing your project.",
      );
    } catch {
      setFailed(true);
      setStatus(
        "We could not confirm your inquiry was received. Please try email or WhatsApp instead.",
      );
    } finally {
      setBusy(false);
    }
  }
  const field = (name: string, label: string, type = "text", placeholder = "") => (
    <div className="field">
      <label htmlFor={name}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "company"
                ? "organization"
                : name === "country"
                  ? "country-name"
                  : "off"
        }
        aria-required="true"
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span id={`${name}-error`} className="field-error">
          {errors[name]}
        </span>
      )}
    </div>
  );
  return (
    <>
      <PageHero
        eyebrow="Let’s talk"
        title="Big ideas start with a conversation."
        description="Tell us about your business, your ambitions and what you have in mind. Let’s explore the right next step together."
      />
      <section className="section">
        <div className="container form-layout">
          <aside className="contact-info">
            <div className="eyebrow">A new beginning</div>
            <h2>
              What are you
              <br />
              working toward?
            </h2>
            <p>
              Whether you’re starting from scratch or improving what’s already there, we’d love to
              hear your idea.
            </p>
            <div className="contact-channel">
              <h3>
                <Mail /> Email us
              </h3>
              {channels.email && (
                <a className="text-link break-all" href={channels.email}>
                  {siteConfig.email}
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
            <div className="contact-channel">
              <h3>
                <MessageCircle /> Chat on WhatsApp
              </h3>
              {channels.whatsapp && (
                <a
                  className="text-link"
                  href={channels.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +{siteConfig.whatsapp.slice(0, 2)} {siteConfig.whatsapp.slice(2)}{" "}
                  <ArrowUpRight size={13} />
                </a>
              )}
            </div>
            <div className="contact-channel">
              <h3>
                <Globe /> Nepal & beyond
              </h3>
              <p>Remote collaboration for businesses in Nepal and around the world.</p>
              <p>{siteConfig.responseTime}</p>
            </div>
          </aside>
          <div>
            {selectedPlan && (
              <p className="form-notice mb-6">
                You’re interested in the {selectedPlan} package. Tell us a little about your
                project.
              </p>
            )}
            <form className="inquiry-form" noValidate onSubmit={submit}>
              {field("name", "Full name", "text", "Your name")}
              {field("email", "Business email", "email", "you@company.com")}
              {field("company", "Company name", "text", "Your business")}
              {field("country", "Country", "text", "Country where your business operates")}
              <div className="field">
                <label htmlFor="service">Required service *</label>
                <select
                  id="service"
                  name="service"
                  defaultValue={selectedService}
                  aria-invalid={Boolean(errors["service"])}
                  aria-describedby={errors["service"] ? "service-error" : undefined}
                >
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option>Multiple services / Custom project</option>
                </select>
                {errors["service"] && (
                  <span id="service-error" className="field-error">
                    {errors["service"]}
                  </span>
                )}
              </div>
              <div className="field">
                <label htmlFor="budget">Project budget *</label>
                <select
                  id="budget"
                  name="budget"
                  defaultValue={selectedPlan}
                  aria-invalid={Boolean(errors["budget"])}
                  aria-describedby={errors["budget"] ? "budget-error" : undefined}
                >
                  <option value="">Select a starting point</option>
                  {(["Starter", "Growth", "Premium"] as const).map((plan) => (
                    <option key={plan} value={plan}>
                      {plan} — {siteConfig.currency}{" "}
                      {siteConfig.prices[plan].toLocaleString("en-US")}+
                    </option>
                  ))}
                  <option>Custom budget</option>
                  <option>Let’s discuss</option>
                </select>
                {errors["budget"] && (
                  <span id="budget-error" className="field-error">
                    {errors["budget"]}
                  </span>
                )}
              </div>
              <div className="field field-wide">
                <label htmlFor="description">Project description *</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Tell us about your goals, what you need and any timing considerations…"
                  aria-invalid={Boolean(errors["description"])}
                  aria-describedby={errors["description"] ? "description-error" : undefined}
                />
                {errors["description"] && (
                  <span id="description-error" className="field-error">
                    {errors["description"]}
                  </span>
                )}
              </div>
              {!canSubmitInquiry(siteConfig.inquiryEndpoint) && (
                <p className="form-notice field-wide">
                  Online submission is not connected yet. You can complete and check your inquiry
                  here, or contact us directly by email or WhatsApp.
                </p>
              )}
              {status && (
                <div className={`form-notice field-wide ${failed ? "error" : ""}`} role="status">
                  {status}
                </div>
              )}
              <div className="field-wide">
                <Button type="submit" size="lg" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send />
                      {canSubmitInquiry(siteConfig.inquiryEndpoint)
                        ? "Send project inquiry"
                        : "Check project inquiry"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
