import { useEffect, useState } from "react";
import { Languages } from "lucide-react";

const LANGS = [
  ["en", "English"],
  ["ne", "नेपाली"],
  ["hi", "हिन्दी"],
] as const;
type Lang = (typeof LANGS)[number][0];

function readLang(): Lang {
  const m = document.cookie.match(/googtrans=\/en\/(ne|hi)/);
  return (m?.[1] as Lang) ?? "en";
}

/** Keeps React stable when the page translator swaps text nodes. */
function patchDom() {
  const w = window as unknown as { __gtPatched?: boolean };
  if (w.__gtPatched) return;
  w.__gtPatched = true;
  const remove = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return remove.call(this, child) as T;
  };
  const insert = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insert.call(this, node, ref) as T;
  };
}

function loadTranslator() {
  if (document.getElementById("gt-script")) return;
  patchDom();
  const w = window as unknown as Record<string, unknown>;
  w["googleTranslateElementInit"] = () => {
    const g = (w["google"] as { translate: { TranslateElement: new (o: object, id: string) => void } });
    new g.translate.TranslateElement({ pageLanguage: "en", includedLanguages: "en,ne,hi", autoDisplay: false }, "gt-element");
  };
  const s = document.createElement("script");
  s.id = "gt-script";
  s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  document.body.appendChild(s);
}

export function LanguageSwitcher() {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const l = readLang();
    setLang(l);
    if (l !== "en") loadTranslator();
  }, []);
  const change = (next: Lang) => {
    const host = window.location.hostname;
    const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    for (const d of ["", `;domain=${host}`, `;domain=.${host}`]) document.cookie = `googtrans=;path=/;${expire}${d}`;
    if (next !== "en") document.cookie = `googtrans=/en/${next};path=/`;
    window.location.reload();
  };
  return (
    <label className="lang-switch notranslate" translate="no">
      <Languages aria-hidden="true" />
      <span className="sr-only">Language</span>
      <select value={lang} onChange={(e) => change(e.target.value as Lang)} aria-label="Choose language">
        {LANGS.map(([code, name]) => (
          <option key={code} value={code}>{name}</option>
        ))}
      </select>
      <div id="gt-element" hidden />
    </label>
  );
}
