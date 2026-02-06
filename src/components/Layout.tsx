import { Link, useLocation } from "react-router-dom";
import { Mail, MapPin, Menu, X, Phone } from "lucide-react";
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
    { name: "Aliya Project Planning", path: "/aliya-project-planning" },
    { name: "About Us", path: "/about" },
    // { name: "Services", path: "/services" }, // Temporarily hidden - uncomment to restore
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
              <div className="flex items-center space-x-2">
                <Phone size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                <span>516-639-7000</span>
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
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            <strong>Important Disclosure:</strong> Aliya Financial is currently applying for registration as an Investment Adviser with the State of New Jersey and is not yet authorized to provide investment advisory services. 
            Educational content only. Not legal, tax, or investment advice. 
            Investing involves risk, including possible loss of principal. Past performance does not guarantee future results. 
            Cross-border investing involves additional risks including currency fluctuations, political and economic instability, and differences in accounting standards and regulations. 
            International investments may not be suitable for all investors. 
            Please read our <Link to="/disclosures" className="underline hover:text-accent">full disclosures</Link> before making any investment decisions.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
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
      {/* Pre-Registration Disclaimer Banner */}
      <div className="bg-yellow-50 border-b-2 border-yellow-400 py-3 px-4">
        <div className="container mx-auto">
          <p className="text-sm text-gray-800 text-center">
            <strong>Important Notice:</strong> Aliya Financial is currently applying for registration as an Investment Adviser with the State of New Jersey. 
            Investment advisory services will only be offered after registration is approved. 
            Information on this website is for educational purposes only and does not constitute investment advice. 
            <Link to="/disclosures" className="underline hover:text-blue-800 ml-1">Learn more</Link>
          </p>
        </div>
      </div>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      {!hideBuddy && <AliyaBuddy />}
    </div>
  );
};

export default Layout;
