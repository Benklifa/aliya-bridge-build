import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, AlertCircle, Calendar, Shield, DollarSign } from "lucide-react";

const DidYouKnowTicker = () => {
  const facts = [
    {
      icon: TrendingUp,
      text: "A 10% USD/ILS currency swing with 4% inflation can cut purchasing power by ~14% in a year.",
    },
    {
      icon: Shield,
      text: "New or returning residents may qualify for a 10-year Israeli tax exemption on foreign income and gains.",
    },
    {
      icon: Calendar,
      text: "Each 12-month delay in enrolling in Medicare Part B may add ~10% to premiums—for life.",
    },
    {
      icon: DollarSign,
      text: "U.S. and Israeli life insurance can differ a lot in cost and terms, so compare both. Insurance is offered separately through a licensed agent and pays commissions.",
    },
    {
      icon: AlertCircle,
      text: "Borrowing against investments or permanent life insurance creates debt, not income. It can provide cash without selling, but it carries interest costs and risks such as margin calls or forced sales, and taxes on gains are deferred, not avoided. Confirm Israeli tax treatment with a licensed Israeli tax adviser.",
    },
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % facts.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [facts.length]);

  const currentFact = facts[currentFactIndex];
  const IconComponent = currentFact.icon;

  return (
    <section className="bg-primary pt-6 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="cta-panel shadow-lg px-6 pt-5 pb-4 md:px-7 md:pt-6 md:pb-5">
            <div className="ticker-slide flex items-start gap-4 text-left">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-gold-500 flex-shrink-0">
                <IconComponent size={18} strokeWidth={2} />
              </span>
              <div className="flex-1">
                <div
                  className="text-gold-700 font-semibold uppercase text-xs mb-1"
                  style={{ letterSpacing: "0.12em" }}
                >
                  Did You Know
                </div>
                <p className="font-serif text-lg text-primary leading-snug">
                  {currentFact.text}
                </p>
                <Link
                  to="/framework"
                  className="inline-block mt-2 text-sm text-gold-700 hover:text-primary font-semibold transition-colors"
                  style={{ minHeight: "auto", minWidth: "auto" }}
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-5 space-x-2">
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFactIndex(index)}
                aria-label={`Show fact ${index + 1}`}
                style={{ minHeight: "auto", minWidth: "auto" }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentFactIndex ? "bg-gold-500" : "bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DidYouKnowTicker;
