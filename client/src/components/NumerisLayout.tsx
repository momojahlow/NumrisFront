import { useEffect, useState, type ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import NumerisFooter from "@/components/NumerisFooter";
import NumerisHeader from "@/components/NumerisHeader";

type NumerisLayoutProps = {
  children: ReactNode;
  isHome?: boolean;
  className?: string;
};

export default function NumerisLayout({
  children,
  isHome = false,
  className = "",
}: NumerisLayoutProps) {
  const classes = ["numeris-site", className].filter(Boolean).join(" ");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      const shouldShow = window.scrollY > 420;
      setShowScrollTop(current =>
        current === shouldShow ? current : shouldShow
      );
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <div className={classes} id="accueil">
      <NumerisHeader isHome={isHome} />
      {children}
      <NumerisFooter isHome={isHome} />
      {showScrollTop && (
        <button
          className="scroll-top-button"
          type="button"
          aria-label="Retour en haut de la page"
          title="Retour en haut"
          onClick={scrollToTop}
        >
          <ArrowUp size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
