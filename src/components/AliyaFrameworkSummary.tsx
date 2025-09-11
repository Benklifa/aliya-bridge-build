import { Link } from "react-router-dom";
import { Target, Heart, TrendingUp, Users, Shuffle, ArrowRight } from "lucide-react";

const AliyaFrameworkSummary = () => {
  const frameworkItems = [
    {
      letter: "A",
      title: "Align",
      description: "Budgeting, housing, healthcare, transportation, and currency/inflation realities aligned with your Aliyah vision.",
      icon: Target,
      color: "text-blue-600"
    },
    {
      letter: "L",
      title: "Live",
      description: "Plan for longevity and rising late-life costs; integrate annuities and long-term care strategies.",
      icon: Heart,
      color: "text-red-600"
    },
    {
      letter: "I",
      title: "Invest (& Insure)",
      description: "Build reliable income, manage the 10-year tax window, balance growth with protection, and use smart credit lines.",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      letter: "Y",
      title: "Y'rusha",
      description: "Cross-border wills, beneficiary design, titling, and tax-sensitive legacy planning.",
      icon: Users,
      color: "text-purple-600"
    },
    {
      letter: "A",
      title: "Adapt",
      description: "Liquidity and flexibility—cash reserves, access to USD/ILS, and practical solutions like HELOC, asset-based lending, and policy loans.",
      icon: Shuffle,
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold text-primary mb-4">
              The A.L.I.Y.A. Framework
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive approach to cross-border financial planning, 
              designed specifically for successful Aliyah transitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {frameworkItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg card-shadow p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                      <IconComponent size={24} className={item.color} />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="font-serif text-2xl font-bold text-accent mr-2">
                      {item.letter}
                    </span>
                    <span className="text-lg font-semibold text-primary">
                      {item.title}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              to="/framework"
              className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-4"
            >
              <span>Learn More About Our Framework</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AliyaFrameworkSummary;