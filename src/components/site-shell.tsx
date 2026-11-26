import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, Menu, X, Globe, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Motion3D } from "@/components/motion-3d";
import { siteConfig, contactChannels } from "@/lib/site-config";

const navigation = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Portfolio", "/portfolio"],
  ["Gallery", "/gallery"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["Contact", "/contact"],
] as const;
export function Brand() {
  return (
    <Link to="/" className="brand notranslate" translate="no" aria-label="Nexora Digital home">
      <svg className="brand-mark" viewBox="0 0 40 44" fill="none" aria-hidden="true">
        <path d="M3 37V7L11 3L29 29V7L37 3V37L29 41L11 15V37L3 41V37Z" fill="currentColor" />
        <path d="M11 3L29 29V41L11 15V3Z" fill="currentColor" opacity=".55" />
      </svg>
      <span>
        <span className="brand-name">
          nexora<span className="text-primary">.</span>
        </span>
        <span className="brand-small">DIGITAL</span>
      </span>
    </Link>
  );
}
export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const channels = contactChannels(siteConfig);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const check = () => setShowTop(window.scrollY > 500);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);
  const nav = navigation.map(([label, to]) => (
    <Link
      key={to}
      to={to}
      className={`nav-link ${to === "/" ? (path === "/" ? "active" : "") : path.startsWith(to) ? "active" : ""}`}
      aria-current={(to === "/" ? path === "/" : path.startsWith(to)) ? "page" : undefined}
    >
      {label}
    </Link>
  ));
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav max-[1100px]:hidden!" aria-label="Main navigation">
            {nav}
          </nav>
          <LanguageSwitcher />
          <Button asChild variant="hero" className="header-cta max-[1100px]:hidden!">
            <Link to="/contact">
              Let’s Talk <ArrowUpRight />
            </Link>
          </Button>
          <Button
            className="mobile-menu-button max-[1100px]:inline-flex!"
            variant="heroOutline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
        {open && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {nav}
            <Button asChild variant="hero">
              <Link to="/contact">
                Let’s Talk <ArrowUpRight />
              </Link>
            </Button>
          </nav>
        )}
      </header>
      <main id="main-content">{children}</main>
      <Motion3D />
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p className="footer-note">
                Your next chapter starts here.
                <br />
                Thoughtful design. Strategic marketing.
                <br />
                Intelligent automation.
              </p>
              <p className="flex items-center gap-2">
                <Globe size={13} /> Based in Nepal. Built for the world.
              </p>
            </div>
            <div>
              <h3>Explore</h3>
              <div className="footer-links">
                {navigation.slice(1).map(([label, to]) => (
                  <Link key={to} to={to}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3>Our expertise</h3>
              <div className="footer-links">
                <Link to="/services/$service" params={{ service: "website-development" }}>
                  Website Development
                </Link>
                <Link to="/services/$service" params={{ service: "social-media-marketing" }}>
                  Social Media Marketing
                </Link>
                <Link to="/services/$service" params={{ service: "branding-design" }}>
                  Graphic Design & Branding
                </Link>
                <Link to="/services/$service" params={{ service: "seo" }}>
                  Search Engine Optimization
                </Link>
                <Link to="/services/$service" params={{ service: "google-ads" }}>
                  Google Ads Management
                </Link>
                <Link to="/services/$service" params={{ service: "ai-automation" }}>
                  AI Automation
                </Link>
              </div>
            </div>
            <div>
              <h3>Let’s create something great</h3>
              <p>Have an idea? We’d love to hear it.</p>
              {channels.email ? (
                <a className="flex items-center gap-2" href={channels.email}>
                  <Mail size={13} />
                  {siteConfig.email}
                </a>
              ) : (
                <Link to="/contact" className="flex items-center gap-2">
                  Discuss your project <ArrowUpRight size={14} />
                </Link>
              )}
              <p className="mt-6">
                We Build. We Market.
                <br />
                We Automate.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Nexora Digital. All rights reserved.</span>
            <span>Made with purpose. Designed for growth.</span>
          </div>
        </div>
      </footer>
      {channels.whatsapp && (
        <Button asChild size="icon" className="fixed right-6 bottom-24 z-40 shadow-lg">
          <a href={channels.whatsapp} target="_blank" rel="noopener noreferrer"
            aria-label="Chat with Nexora on WhatsApp" title="Chat on WhatsApp">
            <MessageCircle />
          </a>
        </Button>
      )}
      {showTop && (
        <Button
          className="back-top"
          size="icon"
          aria-label="Back to top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          <ArrowUp />
        </Button>
      )}
    </>
  );
}
