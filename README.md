# Nexora Digital

A multi-page digital growth agency website built with React, TypeScript, TanStack Start and Tailwind CSS. No authentication, database or payment system has been added.

## Completed page structure

- `/` — homepage with original technology artwork, service overview, differentiators, sample portfolio, process, benefits, FAQs and contact CTA.
- `/about` — story, mission, vision, values and approach.
- `/services` — service directory.
- `/services/website-development`
- `/services/social-media-marketing`
- `/services/branding-design`
- `/services/seo`
- `/services/google-ads`
- `/services/ai-automation`
- `/portfolio` — category-filtered fictional sample concepts.
- `/portfolio/horizon-academy`
- `/portfolio/savor-restaurant`
- `/portfolio/elevate-living`
- `/portfolio/forma-store`
- `/portfolio/nexora-assist`
- `/pricing` — Starter, Growth and Premium starting packages, plus custom quotation CTA.
- `/blog` — featured article, search and category filters.
- `/blog/website-that-works`
- `/blog/social-media-plan`
- `/blog/local-seo-foundations`
- `/blog/automation-first-workflow`
- `/blog/growth-foundation`
- `/blog/choosing-business-tools`
- `/contact` — direct email and WhatsApp links, inquiry preparation and validation.
- Unknown URLs show a Nexora-branded 404.

## Contact details and pricing

Public configuration is in `src/lib/site-config.ts`. You can also ask Lovable to update any of these values.

- Email: `satyaku246@gmail.com`.
- WhatsApp: `918934856824` (international digits, no plus sign or spaces).
- Starting amounts: Starter 5,000; Growth 8,000; Premium 10,000.
- Currency: NPR was assumed from the Nepal-based brief, not confirmed by the owner. Confirm before publishing.
- `responseTime`: editable text; no turnaround promise is invented.
- `inquiryEndpoint`: empty until a real submission provider is configured.

Prices are starting points, not fixed final quotations or guaranteed outcomes. Advertising spend, hosting and paid subscriptions are separately scoped.

## Connect the inquiry form

The form currently validates input and explicitly states that **nothing has been sent**. Direct email opens the visitor's mail app; WhatsApp opens a conversation. Neither link sends a message automatically.

To activate online submission:

1. Choose a genuine inquiry provider (for example, a public form endpoint service) and verify the destination email with that provider.
2. Supply its HTTPS endpoint. The existing form sends JSON fields `name`, `email`, `company`, `country`, `service`, `budget`, and `description`.
3. Confirm the provider accepts these fields, JSON requests and browser cross-origin requests; adapt the payload to its documented contract if needed.
4. Add the endpoint to `siteConfig.inquiryEndpoint`, or ask Lovable to configure it.
5. Configure spam protection, allowed domains and notifications in the provider. A public form endpoint is not a private API key. Never put secret keys in this client configuration.
6. Test a genuine inquiry and confirm it arrives in the recipient inbox/provider dashboard. Test rejected and unavailable requests as well.

If a provider requires private credentials, leave the endpoint empty and request a secure server-side integration with Lovable Cloud. No such service has been activated in this initial website.

The button and unconnected notice adapt automatically when a secure endpoint exists. A successful HTTP response indicates provider acceptance, not proof of inbox delivery; verify delivery separately.

## Connect GitHub

In Lovable, open the project's GitHub connection settings, connect your GitHub account and authorize the repository connection. Lovable manages synchronization. This does not publish the website. Keep credentials and repository metadata out of any source upload.

For local work after connecting:

```sh
git clone <your-repository-url>
# Open the cloned directory, then:
bun install
bun run dev
```

Use the URL printed by your local development server. Test with `bunx vitest run`.

## Deploy and domain setup

Use **Publish** in Lovable, choose the public address, review visibility settings and publish. Open the resulting public URL and repeat the visitor checks below. Add a custom domain through Lovable's domain settings if desired.

A public address does not exist yet, so the sitemap and canonical URLs are deliberately **not generated** using the preview address. Once the production domain is selected, ask Lovable to create the domain-aware sitemap and add its address to the existing `public/robots.txt`. All existing crawler allow blocks remain intact.

Unique titles, descriptions, Open Graph text and Twitter card metadata are present on every content page. Native bundled artwork uses relative asset URLs, so no fabricated absolute social image URL is supplied. Hosting can generate a social preview. Portfolio images are clearly labeled samples. No fake testimonials, employees, awards or client results are published.

## Final testing checklist

Verified locally:

- [x] All 24 content pages load with unique page metadata.
- [x] All six service detail pages load directly (not only via homepage navigation).
- [x] All five concept project pages and six original article pages load.
- [x] Portfolio category selection, including honest empty categories.
- [x] Blog search and category filtering.
- [x] Pricing inquiry links preserve the chosen plan.
- [x] Required inquiry validation and truthful unconfigured-form outcome.
- [x] Confirmed email and WhatsApp destinations.
- [x] FAQ expansion.
- [x] Mobile menu and contact navigation.
- [x] Desktop and mobile layouts have no horizontal overflow.
- [x] No browser runtime errors in the verified visitor flow.
- [x] Supplied contact and price rules have passing automated tests.

Before launch:

- [ ] Confirm the NPR currency assumption.
- [ ] Confirm any response-time commitment.
- [ ] Connect and verify real form submission delivery, if wanted.
- [ ] Publish and select the public domain.
- [ ] Generate the sitemap and add a robots sitemap directive using that public domain.
- [ ] Review sample concepts and original articles; replace them with genuine work when available.
- [ ] Test actual email/WhatsApp apps and keyboard-only navigation on production.
- [ ] Inspect public-page social previews after publishing.

## Design and maintenance

Space Grotesk headings, Inter body text, navy/teal hero and light content use semantic design tokens. Generated assets were created with the Media CLI; concept previews are served through project asset pointers. Shared page framing is in `SiteShell`; repeatable content is centralized in `src/lib/content.ts`; loaders transfer only serializable data.
