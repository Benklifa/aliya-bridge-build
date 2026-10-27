import { useEffect } from "react";

/**
 * Keeps <meta name="robots" content="noindex"> on the page during client-side
 * navigation when `active` is true (the prerendered HTML already carries it).
 */
export const useNoindex = (active: boolean) => {
  useEffect(() => {
    if (!active) return;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "robots";
      document.head.appendChild(tag);
    }
    const previous = tag.content;
    tag.content = "noindex";
    return () => {
      if (created) tag?.remove();
      else if (tag) tag.content = previous;
    };
  }, [active]);
};
