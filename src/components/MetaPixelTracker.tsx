import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/metaPixel";
import { getLifeEvent } from "@/data/lifeEvents";

const CONTACT_LINK = /^(tel:|mailto:|https?:\/\/(wa\.me|api\.whatsapp\.com|(www\.)?whatsapp\.com)\b)/i;

const contactMethod = (href: string) => {
  if (/^tel:/i.test(href)) return "phone";
  if (/^mailto:/i.test(href)) return "email";
  return "whatsapp";
};

/**
 * Site-wide Meta Pixel behaviour:
 * - PageView on client-side route changes (initial PageView fires from the base code in index.html)
 * - ViewContent on life-event / service pages
 * - Contact on tel:/mailto:/WhatsApp link clicks (delegated listener)
 * - Schedule on Calendly booking confirmation (postMessage), if a Calendly embed is ever added
 */
const MetaPixelTracker = () => {
  const { pathname } = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false; // base code already fired PageView for initial load
    } else {
      trackEvent("PageView");
    }

    const m = pathname.match(/^\/life-events\/([^/]+)\/?$/);
    if (m) {
      const ev = getLifeEvent(m[1]);
      if (ev) trackEvent("ViewContent", { content_name: ev.pageTitle, content_category: "Life Event" });
    } else if (/^\/borrow-against-portfolio\/?$/.test(pathname)) {
      trackEvent("ViewContent", { content_name: "Portfolio Lending", content_category: "Landing Page" });
    } else if (/^\/aliya-plan\/?$/.test(pathname)) {
      trackEvent("ViewContent", { content_name: "Aliya Plan", content_category: "Landing Page" });
    } else if (/^\/services\/?$/.test(pathname)) {
      trackEvent("ViewContent", { content_name: "Services", content_category: "Service" });
    }
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (CONTACT_LINK.test(href)) trackEvent("Contact", { contact_method: contactMethod(href) });
    };
    const onMessage = (e: MessageEvent) => {
      let host = "";
      try { host = new URL(e.origin).hostname; } catch { return; }
      if (!/(^|\.)calendly\.com$/i.test(host)) return;
      if (e.data?.event === "calendly.event_scheduled") trackEvent("Schedule");
    };
    document.addEventListener("click", onClick, true);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return null;
};

export default MetaPixelTracker;
