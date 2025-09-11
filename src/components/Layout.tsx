import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "A.L.I.Y.A Framework", path: "/framework" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Events", path: "/events" },
    { name: "In the News", path: "/news" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/9910b6d4-7800-4fca-b397-1e1d4f4302ad.png" 
              alt="Aliya Financial Puzzle Logo" 
              className="h-10 w-auto"
            />
            <div className="font-serif font-semibold text-xl text-primary">
              Aliya Financial
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  isActive(item.path) 
                    ? "text-accent border-b-2 border-accent" 
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="btn-primary ml-4"
            >
              Schedule Consultation
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActive(item.path) ? "text-accent" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary mt-4 inline-block text-center"
              >
                Schedule Consultation
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="bg-navy-50 border-t border-border mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg text-primary">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@AliyaFinancial.com</span>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg text-primary">Locations</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Highland Park, NJ (USA)</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Jerusalem, Israel</span>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="font-serif font-semibold text-lg text-primary">Legal</h3>
            <div className="space-y-2 text-sm">
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
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Educational content. Not legal, tax, or investment advice. Investing involves risk. 
            Past performance does not guarantee future results. Securities offered through 
            [FINRA Member Firm - License Pending]. Advisory services offered through 
            [Registered Investment Advisor - License Pending].
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
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;