import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, AlertCircle, Calendar, Shield, DollarSign } from "lucide-react";

const DidYouKnowTicker = () => {
  const facts = [
    {
      icon: TrendingUp,
      text: "A 10% USD/ILS currency swing with 4% inflation can cut purchasing power by ~14% in a year.",
      color: "text-red-500"
    },
    {
      icon: Shield,
      text: "New or returning residents may qualify for a 10-year Israeli tax exemption on foreign income and gains.",
      color: "text-teal-500"
    },
    {
      icon: Calendar,
      text: "Each 12-month delay in enrolling in Medicare Part B may add ~10% to premiums—for life.",
      color: "text-orange-500"
    },
    {
      icon: DollarSign,
      text: "U.S. life insurance is often 30–50% less expensive than comparable coverage in Israel.",
      color: "text-green-500"
    },
    {
      icon: AlertCircle,
      text: "Borrowing against investments or permanent life insurance is debt, not income—useful for liquidity without triggering Israeli income tax.",
      color: "text-blue-500"
    }
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
    <section className="bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="font-serif text-2xl font-semibold text-primary mb-2">
              Did You Know...
            </h2>
          </div>
          
          <div className="bg-white rounded-lg card-shadow p-6 min-h-[120px] flex items-center justify-center">
            <div className="ticker-slide flex items-start space-x-4 text-center">
              <IconComponent size={24} className={`${currentFact.color} flex-shrink-0 mt-1`} />
              <div className="flex-1">
                <p className="text-lg text-foreground leading-relaxed">
                  {currentFact.text}
                </p>
                <Link 
                  to="/framework" 
                  className="inline-block mt-3 text-sm text-accent hover:text-accent/80 font-medium"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          </div>
          
          {/* Progress indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentFactIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentFactIndex 
                    ? "bg-accent" 
                    : "bg-muted-foreground/30"
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