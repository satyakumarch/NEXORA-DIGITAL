import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Globe,
  GraduationCap,
  UtensilsCrossed,
  Building2,
  BriefcaseBusiness,
  Target,
  Sparkles,
  Handshake,
  Layers,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/nexora-technology.webp";
import {
  CTA,
  ServiceGrid,
  ProjectCard,
  WorkingProcess,
  Faqs,
  ViewAllServices,
} from "@/components/page-parts";
import { projects } from "@/lib/content";

export function HomePage() {
  return (
    <>
      <section className="hero">
        <img
          src={heroImage}
          className="hero-art"
          alt="A sculptural geometric N with illuminated teal technology connections"
          fetchPriority="high"
          width="1672"
          height="941"
        />
        <div className="container hero-content">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Your partner in digital growth
          </div>
          <h1>
            Transform Your
            <br />
            Business Into a<br />
            <em>Digital Success Story.</em>
          </h1>
          <p className="hero-description">
            We build powerful websites, create meaningful marketing strategies and automate business
            workflows to help your business grow.
          </p>
          <div className="hero-actions">
            <Button variant="hero" asChild>
              <Link to="/contact">
                Start a Project <ArrowUpRight />
              </Link>
            </Button>
            <Button variant="heroOutline" asChild>
              <Link to="/services">
                Explore Our Services <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="hero-points">
            <span>
              <Check /> Strategy-led approach
            </span>
            <span>
              <Check /> Built around your business
            </span>
            <span>
              <Check /> Global outlook
            </span>
          </div>
        </div>
        <div className="container hero-bottom">
          <div className="tagline">We Build. We Market. We Automate.</div>
          <div className="hero-location">
            <Globe /> Based in Nepal. Built for the world. <ArrowUpRight />
          </div>
        </div>
      </section>
      <section className="intro-band">
        <div className="container intro-inner">
          <div className="intro-title">
            Digital solutions for ambitious
            <br />
            <strong className="text-foreground font-medium">businesses across industries.</strong>
          </div>
          <div className="industry-list">
            <span>
              <GraduationCap /> Education
            </span>
            <span>
              <UtensilsCrossed /> Hospitality
            </span>
            <span>
              <Building2 /> Real Estate
            </span>
            <span>
              <BriefcaseBusiness /> Businesses & Startups
            </span>
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">What we do</div>
              <h2>
                Everything you need.
                <br />
                One digital partner.
              </h2>
            </div>
            <div>
              <p className="section-lede mb-4">
                From your first website to your next growth chapter, we bring strategy, creativity
                and technology together.
              </p>
              <ViewAllServices />
            </div>
          </div>
          <ServiceGrid />
        </div>
      </section>
      <section className="section dark-band">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">The Nexora difference</div>
              <h2>
                More than a service.
                <br />A partner in your progress.
              </h2>
            </div>
            <p className="section-lede">
              We see the bigger picture, care about the details and build with your next step in
              mind.
            </p>
          </div>
          <div className="reason-grid">
            {[
              {
                icon: Target,
                title: "Strategy before execution",
                text: "We understand your goals before recommending solutions. Every decision has a reason.",
              },
              {
                icon: Sparkles,
                title: "Creativity with purpose",
                text: "Distinctive design and thoughtful content, grounded in what your audience actually needs.",
              },
              {
                icon: Layers,
                title: "Connected expertise",
                text: "Websites, marketing and automation work together — not in separate silos.",
              },
              {
                icon: Handshake,
                title: "Clear, honest collaboration",
                text: "Defined deliverables, open communication and no promises we can’t stand behind.",
              },
            ].map((r) => (
              <div className="reason" key={r.title}>
                <r.icon />
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">Ideas brought to life</div>
              <h2>A glimpse of what’s possible.</h2>
            </div>
            <Link to="/portfolio" className="text-link">
              Explore our portfolio <ArrowUpRight />
            </Link>
          </div>
          <p className="section-lede mb-7">
            A selection of original sample concepts. These are demonstrations of our approach, not
            real client projects.
          </p>
          <div className="project-grid">
            {projects.slice(0, 4).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>
      <div className="section-soft">
        <WorkingProcess />
      </div>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="eyebrow">Designed for your next step</div>
              <h2>A stronger foundation for growth.</h2>
            </div>
            <TrendingUp size={36} className="text-primary" />
          </div>
          <div className="value-grid">
            {[
              [
                "Show up with confidence",
                "Give your business a consistent, professional presence that reflects the quality of your work.",
              ],
              [
                "Connect with the right people",
                "Make your services easier to discover and give interested customers a clearer path to contact you.",
              ],
              [
                "Make room for what matters",
                "Reduce repetitive tasks and connect your digital tools so you can focus on your business.",
              ],
            ].map(([title, text]) => (
              <div className="value-item" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-soft">
        <div className="container faq-layout">
          <div>
            <div className="eyebrow">A little clarity</div>
            <h2>
              Good questions.
              <br />
              Straightforward answers.
            </h2>
            <p className="section-lede mt-5 mb-6">
              Want to know more about working together? Start here, or tell us what’s on your mind.
            </p>
            <Link to="/contact" className="text-link">
              Ask us a question <ArrowUpRight />
            </Link>
          </div>
          <Faqs />
        </div>
      </section>
      <CTA />
    </>
  );
}
