import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Plus, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, projects, process, commonFaqs } from "@/lib/content";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight />
          <span>{eyebrow}</span>
        </div>
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
export function CTA({
  title = "Your next chapter starts here.",
  text = "Let’s turn your ideas into something that moves your business forward.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <Button asChild variant="hero" size="lg">
          <Link to="/contact">
            Let’s Build Something Great <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </section>
  );
}
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((s) => (
        <Link
          key={s.slug}
          to="/services/$service"
          params={{ service: s.slug }}
          className="service-card"
        >
          <div className="service-icon">
            <s.icon />
          </div>
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <span className="text-link">
            Explore service <ArrowUpRight />
          </span>
        </Link>
      ))}
    </div>
  );
}
export function ChatPreview() {
  return (
    <div className="chat-preview" role="img" aria-label="Sample AI support conversation interface">
      <div className="chat-preview-head">
        <Bot /> Nexora Assist
      </div>
      <div className="chat-bubble">Hello! What can I help you explore today?</div>
      <div className="chat-bubble reply">I’m looking for a business website.</div>
      <div className="chat-bubble">Let’s find the right next step for your project.</div>
    </div>
  );
}
export function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link className="project-card" to="/portfolio/$project" params={{ project: project.slug }}>
      <div className="project-image">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.name} — ${project.type} sample concept`}
            loading="lazy"
            width="793"
            height="496"
          />
        ) : (
          <ChatPreview />
        )}
        <span className="sample-label">SAMPLE CONCEPT</span>
      </div>
      <div className="project-info">
        <div>
          <h3>{project.name}</h3>
          <p>{project.type}</p>
        </div>
        <ArrowUpRight className="project-arrow" />
      </div>
    </Link>
  );
}
export function WorkingProcess() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="eyebrow">From idea to impact</div>
            <h2>A clear path. A shared purpose.</h2>
          </div>
          <p className="section-lede">
            Good work starts with a good process. Ours keeps things clear, collaborative and moving
            forward.
          </p>
        </div>
        <div className="process-grid">
          {process.map((p, i) => (
            <div className="process-step" key={p.name}>
              <span className="process-number">0{i + 1}</span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Faqs({ items = commonFaqs }: { items?: readonly (readonly [string, string])[] }) {
  return (
    <div className="faq-list">
      {items.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <Plus />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check />
          {item}
        </li>
      ))}
    </ul>
  );
}
export function ViewAllServices() {
  return (
    <Link className="text-link" to="/services">
      View all services <ArrowRight />
    </Link>
  );
}
