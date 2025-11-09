import { Link, useLocation } from "react-router-dom";
import { Mail, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";
import AliyaBuddy from "./AliyaBuddy";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "A.L.I.Y.A Framework", path: "/framework" },
    { name: "Readiness Score", path: "/readiness" },
    // { name: "Real Estate Readiness", path: "/real-estate-readiness" }, // Temporarily hidden - uncomment to restore
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    // { name: "Events", path: "/events" }, // Temporarily hidden - uncomment to restore
    { name: "In the News", path: "/news" },
    // { name: "FAQ", path: "/faq" }, // Temporarily hidden - uncomment to restore
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-navy-900 border-b border-navy-600">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col py-3 sm:py-4">
          {/* Logo, Title, and Hamburger Menu */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="relative h-12 sm:h-16 md:h-20 w-12 sm:w-16 md:w-20 flex-shrink-0">
                <img 
                  src="/israel-puzzle-logo.png" 
                  alt="Aliya Financial Israel Puzzle Logo" 
                  className="absolute top-0 left-0 h-[180px] sm:h-[200px] md:h-[240px] w-auto object-contain z-20"
                />
              </div>
              <Link to="/" className="flex items-center pt-1">
                <div className="font-serif font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                  Aliya Financial
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-end space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm lg:text-base font-medium transition-colors hover:text-gold-500 whitespace-nowrap ${
                  isActive(item.path) 
                    ? "text-gold-500 border-b-2 border-gold-500" 
                    : "text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <nav className="md:hidden bg-navy-800 rounded-lg mt-2 py-2 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-navy-700 ${
                    isActive(item.path) 
                      ? "text-gold-500 bg-navy-700" 
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
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-50 border-t border-border mt-8 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif font-semibold text-base sm:text-lg text-primary">Contact</h3>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-all">info@aliyafinancial.com</span>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif font-semibold text-base sm:text-lg text-primary">Locations</h3>
            <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
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
          <div className="space-y-3 sm:space-y-4">
            <h3 className="font-serif font-semibold text-base sm:text-lg text-primary">Legal</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <Link to="/privacy" className="block text-muted-foreground hover:text-accent">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-accent">
                Terms of Service
              </Link>
              <Link to="/disclosures" className="block text-muted-foreground hover:text-accent">
                Disclosures
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Educational content. Not legal, tax, or investment advice. Investing involves risk. 
            Past performance does not guarantee future results.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © 2024 Aliya Financial. All rights reserved.
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
      {!hideBuddy && <AliyaBuddy />}
    </div>
  );
};

export default Layout;
