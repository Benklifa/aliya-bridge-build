import { Link, useLocation } from "react-router-dom";
import { Mail, MapPin, Menu, X, Phone } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import AliyaBuddy from "./AliyaBuddy";
import MarketTicker from "./MarketTicker";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // On desktop, the logo+title group is centered within the header's own
  // container (measured, not flex-centered — the logo graphic overflows its
  // small flex box via absolute positioning, so CSS justify-center centers
  // the wrong, smaller box and misses visually). The nav row is then
  // stretched to the title's rendered width and centered on it too, so
  // everything in the ribbon shares one true center. On mobile the group
  // stays pinned left (hamburger pinned right), untouched.
  useLayoutEffect(() => {
    const align = () => {
      const groupEl = document.querySelector<HTMLElement>(".logo-title-group");
      const titleEl = document.querySelector<HTMLElement>('header a[href="/"] .fs-logo');
      const navEl = document.querySelector<HTMLElement>(".header-nav");
      const headerContainer = document.querySelector<HTMLElement>("header .max-w-6xl");
      if (!groupEl || !titleEl || !navEl || !headerContainer) return;

      groupEl.style.transform = "none";

      if (window.innerWidth >= 768) {
        const containerRect = headerContainer.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        const titleRect = titleEl.getBoundingClientRect();
        const titleCenter = titleRect.left + titleRect.width / 2;
        const groupRect = groupEl.getBoundingClientRect();
        const desired = containerCenter - titleCenter;
        const clamped = Math.max(
          -groupRect.left,
          Math.min(window.innerWidth - groupRect.right, desired),
        );
        groupEl.style.transform = clamped ? `translateX(${clamped}px)` : "";
      }

      const titleRect = titleEl.getBoundingClientRect();
      const titleCenter = titleRect.left + titleRect.width / 2;

      navEl.style.transform = "none";
      navEl.style.width = `${titleRect.width}px`;
      const navRect = navEl.getBoundingClientRect();
      const navCenter = navRect.left + navRect.width / 2;
      const desired = titleCenter - navCenter;
      const clamped = Math.max(-navRect.left, Math.min(window.innerWidth - navRect.right, desired));
      navEl.style.transform = clamped ? `translateX(${clamped}px)` : "";
    };

    align();
    window.addEventListener("resize", align);

    // ResizeObserver catches layout changes a plain window "resize" event
    // can miss (e.g. the title reflowing once web fonts finish loading).
    const headerEl = document.querySelector("header");
    const resizeObserver = headerEl ? new ResizeObserver(align) : null;
    if (headerEl && resizeObserver) resizeObserver.observe(headerEl);

    document.fonts?.ready?.then(align);

    return () => {
      window.removeEventListener("resize", align);
      resizeObserver?.disconnect();
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    // { name: "A.L.I.Y.A Framework", path: "/framework" },
    // { name: "Readiness Score", path: "/readiness" },
    // { name: "Learning Tools", path: "/tools" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    // { name: "Events", path: "/events" },
    // { name: "In the News", path: "/news" },
    // { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <header className="w-full bg-navy-900 border-b border-navy-600">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="relative flex flex-col" style={{ paddingTop: 0, paddingBottom: "6px" }}>
            {/* Logo, Title, and Hamburger Menu */}
            <div
              className="flex items-end justify-between gap-x-3 sm:gap-x-8"
              style={{
                paddingTop: 0,
                marginBottom: 0,
              }}
            >
              <div className="logo-title-group flex items-end space-x-3 sm:space-x-4 min-w-0">
                <div
                  className="relative self-start flex-shrink-0"
                  style={{ height: "clamp(2.25rem, 1rem + 5vw, 5rem)", width: "clamp(2.25rem, 1rem + 5vw, 5rem)" }}
                >
                  <img
                    src="/israel-puzzle-logo.png"
                    alt="Aliya Financial Israel Puzzle Logo"
                    className="absolute top-0 left-0 w-auto object-contain z-20"
                    style={{ height: "clamp(10rem, 6rem + 10vw, 20rem)" }}
                  />
                </div>
                <Link to="/" className="flex flex-col items-center min-w-0">
                  <div
                    className="fs-logo font-bold text-white"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontVariant: "small-caps",
                      letterSpacing: "clamp(0em, -0.45em + 2.9vw, 0.28em)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Aliya Financial
                  </div>
                  <div
                    className="fs-eyebrow text-gold-500 font-semibold whitespace-nowrap"
                    style={{
                      fontFamily: "'Times New Roman', Times, serif",
                      fontStyle: "italic",
                      letterSpacing: "0.18em",
                    }}
                  >
                    Putting the puzzle together
                  </div>
                </Link>
              </div>

              {/* Hamburger Menu Button - Mobile Only */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobileMenuOpen && (
              <nav className="md:hidden absolute right-0 top-full z-30 w-52 bg-navy-600 border border-gold-500/20 rounded-lg mt-2 py-2 shadow-lg">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={handleNavClick}
                    className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10 ${
                      isActive(item.path)
                        ? "text-gold-500 bg-white/10"
                        : "text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            )}
          </div>
        </div>
      </header>

      {/* Scrolling market/exchange-rate tape — sits between the dark title
          banner and the nav band */}
      <MarketTicker />

      {/* Desktop Navigation — its own band under the dark banner, centered
          on the same axis as the title and page body rather than pinned
          to a row's edge inside the (now slimmer) dark header */}
      <div className="hidden md:block w-full bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-2 sm:px-4">
          <div className="flex justify-center py-1">
            <nav className="header-nav flex items-center justify-between">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{ minHeight: "auto", minWidth: "auto" }}
                  className={`text-sm lg:text-base font-medium transition-colors hover:text-gold-600 whitespace-nowrap ${
                    isActive(item.path)
                      ? "text-gold-600 border-b-2 border-gold-600"
                      : "text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-50 border-t border-border">
      <div className="container mx-auto px-4 py-5 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Contact Information */}
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="font-serif font-semibold text-base sm:text-lg text-primary">Contact</h3>
            <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
              <Link
                to="/contact"
                className="flex items-center space-x-2 hover:text-accent transition-colors"
                style={{ minHeight: "auto", minWidth: "auto" }}
              >
                <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-all">info@aliyafinancial.com</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center space-x-2 hover:text-accent transition-colors"
                style={{ minHeight: "auto", minWidth: "auto" }}
              >
                <Phone size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span>516-639-7000</span>
              </Link>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="font-serif font-semibold text-base sm:text-lg text-primary">Locations</h3>
            <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <span>Highland Park, NJ (USA)</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <span>Jerusalem, Israel</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="font-serif font-semibold text-base sm:text-lg text-primary">Legal</h3>
            <div className="space-y-0.5 text-xs sm:text-sm">
              <Link
                to="/privacy"
                className="block text-muted-foreground hover:text-accent"
                style={{ minHeight: "auto", minWidth: "auto" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/disclosures"
                className="block text-muted-foreground hover:text-accent"
                style={{ minHeight: "auto", minWidth: "auto" }}
              >
                Disclosures
              </Link>
              <a
                href="/form-crs.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent font-semibold"
                style={{ minHeight: "auto", minWidth: "auto" }}
              >
                Form CRS
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground leading-snug mb-2">
            <strong>Important Disclosure:</strong> Aliya Financial LLC is a NJ-registered investment adviser (
            <a href="https://adviserinfo.sec.gov/firm/summary/340264" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">CRD 340264</a>
            ). Registration does not imply a certain level of skill or training.
            Investing involves risk, including possible loss of principal. Past performance does not guarantee future results.
            Cross-border investing involves additional risks including currency fluctuations, political and economic instability, and differences in accounting standards and regulations.
            Please read our <Link to="/disclosures" className="underline hover:text-accent">full disclosures</Link> for more information. See also our <Link to="/privacy" className="underline hover:text-accent">Privacy Policy</Link>.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            © 2026 Aliya Financial. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  hideBuddy?: boolean;
}

const Layout = ({ children, hideNav = false, hideBuddy = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Navigation />}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {/* Temporarily hidden for regulatory approval - uncomment to restore */}
      {/* {!hideBuddy && <AliyaBuddy />} */}
    </div>
  );
};

export default Layout;
