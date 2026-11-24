import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const REVEAL = ".section-header, .service-card, .project-card, .reason, .process-step, .value-item, .faq-list details, .page-hero h1, .page-hero p, .cta-inner, .intro-inner";
const TILT = ".service-card, .project-card, .reason, .process-step, .value-item";

/** Adds scroll-in 3D reveals and pointer tilt to cards across every page. */
export function Motion3D() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 },
    );
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
    els.forEach((el, i) => {
      el.classList.add("reveal-3d");
      el.style.setProperty("--reveal-delay", `${(i % 4) * 80}ms`);
      io.observe(el);
    });
    const fine = window.matchMedia("(pointer: fine)").matches;
    const tilts = fine ? Array.from(document.querySelectorAll<HTMLElement>(TILT)) : [];
    const move = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-y * 10).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(x * 12).toFixed(2)}deg`);
    };
    const leave = (e: PointerEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
    };
    tilts.forEach((el) => {
      el.classList.add("tilt-3d");
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
    });
    return () => {
      io.disconnect();
      tilts.forEach((el) => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      });
    };
  }, [path]);
  return null;
}
