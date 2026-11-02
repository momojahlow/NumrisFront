import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Headphones, Menu, X } from "lucide-react";

type NumerisBrandProps = { footer?: boolean };

export function NumerisBrand({ footer = false }: NumerisBrandProps) {
  return (
    <a
      className={`numeris-brand${footer ? " numeris-brand-footer" : ""}`}
      href="/"
      aria-label="Smart Print — espace documentaire Numeris, accueil"
    >
      <img
        className="numeris-mark"
        src="/numeris-logo.png"
        alt=""
        aria-hidden="true"
        decoding="async"
      />
      <span className="numeris-brand-copy">
        <span className="numeris-brand-company">Smart Print</span>
        <span className="numeris-brand-product">ESPACE DOCUMENTAIRE</span>
      </span>
    </a>
  );
}

export default function NumerisHeader({
  isHome = false,
  isLogin = false,
  quoteHref: quoteHrefOverride,
}: {
  isHome?: boolean;
  isLogin?: boolean;
  quoteHref?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);
  const quoteHref =
    quoteHrefOverride ?? (isHome ? "/devis#quote-form" : "#quote-form");
  const loginHref = isLogin ? "#login-panel" : "/connexion";

  useEffect(() => {
    const updateScrolledState = () => {
      const next = window.scrollY > 16;
      setScrolled(current => (current === next ? current : next));
    };
    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {!isLogin && (
        <div className="numeris-utility">
          <div className="numeris-utility-inner">
            <span className="utility-help">
              <Headphones size={15} />
              <span className="utility-label">
                Un conseil ? Nos équipes sont là pour vous.
              </span>
            </span>
            <a className="utility-contact" href={quoteHref}>
              Parlons de votre projet <ArrowRight size={15} />
            </a>
          </div>
        </div>
      )}
      <header className={`numeris-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="numeris-header-inner">
          <NumerisBrand />
          {!isLogin && (
            <>
              <button
                className="numeris-menu-toggle"
                type="button"
                aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={menuOpen}
                aria-controls="primary-navigation"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
              <nav
                className={`numeris-nav${menuOpen ? " is-open" : ""}`}
                id="primary-navigation"
                aria-label="Navigation principale"
              >
                <a href={sectionHref("plateforme")} onClick={closeMenu}>
                  La plateforme
                </a>
                <a href={sectionHref("technologie")} onClick={closeMenu}>
                  Technologie
                </a>
                <a href={sectionHref("usages")} onClick={closeMenu}>
                  Cas d’usage
                </a>
                <a href={sectionHref("questions")} onClick={closeMenu}>
                  FAQ
                </a>
                <a href={sectionHref("contact")} onClick={closeMenu}>
                  Contact
                </a>
                <a className="nav-cta" href={loginHref} onClick={closeMenu}>
                  Se connecter <ArrowUpRight size={16} />
                </a>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
}
