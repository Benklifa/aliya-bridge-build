import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/lib/routeMeta";

const setMeta = (selector: string, content: string) => {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.content = content;
};

/** Keeps the tab title and description in step with client-side navigation. */
const RouteMeta = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getRouteMeta(pathname);
    document.title = meta.title;
    setMeta('meta[name="description"]', meta.description);
    setMeta('meta[property="og:title"]', meta.ogTitle ?? meta.title);
    setMeta('meta[name="twitter:title"]', meta.ogTitle ?? meta.title);
    setMeta('meta[property="og:description"]', meta.description);
    setMeta('meta[name="twitter:description"]', meta.description);
  }, [pathname]);
  return null;
};

export default RouteMeta;
