import { useEffect, useState } from "react";
import { scrollToId } from "@/lib/scrollToAnchor";

/**
 * Slim sticky bottom bar (mobile only) with one button that scrolls to the
 * on-page form. It appears once the hero button has scrolled out of view and
 * hides as soon as the top of the form reaches the screen, so it never covers
 * the form, the content after it, or the footer.
 */
const MobileCtaBar = ({
  targetId,
  heroCtaId,
  label = "Request a free consultation",
}: {
  targetId: string;
  heroCtaId: string;
  label?: string;
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById(heroCtaId);
      const form = document.getElementById(targetId);
      if (!form) return setShow(false);
      const heroGone = hero ? hero.getBoundingClientRect().bottom < 0 : true;
      const formBelow = form.getBoundingClientRect().top > window.innerHeight;
      setShow(heroGone && formBelow);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [heroCtaId, targetId]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (scrollToId(targetId)) {
      e.preventDefault();
      // A relative "#id" keeps the path and the query string (UTM params).
      window.history.replaceState(window.history.state, "", `#${targetId}`);
    }
  };

  return (
    <div
      data-mobile-cta-bar
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-40 bg-primary border-t border-gold-500/40 px-4 pt-2.5 shadow-[0_-4px_16px_rgba(0,0,0,0.25)] transition-transform duration-200 ${
        show ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
      style={{ paddingBottom: "calc(0.625rem + env(safe-area-inset-bottom))" }}
    >
      <a
        href={`#${targetId}`}
        onClick={onClick}
        tabIndex={show ? 0 : -1}
        className="btn-gold flex w-full items-center justify-center rounded-md px-4 py-3 font-semibold"
      >
        {label}
      </a>
    </div>
  );
};

export default MobileCtaBar;
