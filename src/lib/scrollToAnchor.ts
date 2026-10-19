// Scroll to an on-page anchor, leaving room for the sticky site header
// (logo bar + market ticker), whose height varies by screen size.
export const stickyHeaderOffset = (): number => {
  const sticky = document.querySelector<HTMLElement>("div.sticky.top-0");
  return (sticky?.getBoundingClientRect().height ?? 0) + 8;
};

export const scrollToId = (id: string, behavior: ScrollBehavior = "smooth"): boolean => {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - stickyHeaderOffset();
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior });
  return true;
};
