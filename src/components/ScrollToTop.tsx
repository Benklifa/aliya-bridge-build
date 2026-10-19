import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToId } from "@/lib/scrollToAnchor";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL has an anchor (e.g. /privacy#website or /borrow-against-portfolio#risks),
    // scroll to it (below the sticky header) instead of the top.
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      if (scrollToId(id, "instant" as ScrollBehavior)) {
        // Re-apply after the browser's own initial fragment jump on page load.
        const t = window.setTimeout(() => scrollToId(id, "instant" as ScrollBehavior), 100);
        return () => window.clearTimeout(t);
      }
    }
    // Scroll to top immediately when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname, hash]);

  return null;
}
