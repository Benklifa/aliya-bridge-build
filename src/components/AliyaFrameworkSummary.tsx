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

          {/* Puzzle-piece layout */}
          <div className="relative max-w-4xl mx-auto mb-8">
            {/* Top row - A and L */}
            <div className="flex justify-center gap-4 mb-4">
              {frameworkItems.slice(0, 2).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-lg card-shadow p-4 w-48 text-center hover:shadow-lg transition-all hover:scale-105"
                    style={{
                      transform: index === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <IconComponent size={20} className={item.color} />
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="font-serif text-xl font-bold text-accent mr-1">
                        {item.letter}
                      </span>
                      <span className="text-md font-semibold text-card-foreground">
                        {item.title}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {item.description}
                    </p>
                    
                    <Link 
                      to={`/framework/${item.letter.toLowerCase()}`}
                      className="text-xs text-accent hover:text-accent/80 font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>
                );
              })}
            </div>
            
            {/* Middle - I */}
            <div className="flex justify-center mb-4">
              {frameworkItems.slice(2, 3).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-lg card-shadow p-4 w-48 text-center hover:shadow-lg transition-all hover:scale-105"
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <IconComponent size={20} className={item.color} />
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="font-serif text-xl font-bold text-accent mr-1">
                        {item.letter}
                      </span>
                      <span className="text-md font-semibold text-card-foreground">
                        {item.title}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {item.description}
                    </p>
                    
                    <Link 
                      to={`/framework/${item.letter.toLowerCase()}`}
                      className="text-xs text-accent hover:text-accent/80 font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom row - Y and A */}
            <div className="flex justify-center gap-4">
              {frameworkItems.slice(3, 5).map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-lg card-shadow p-4 w-48 text-center hover:shadow-lg transition-all hover:scale-105"
                    style={{
                      transform: index === 0 ? 'rotate(1deg)' : 'rotate(-1deg)',
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                        <IconComponent size={20} className={item.color} />
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <span className="font-serif text-xl font-bold text-accent mr-1">
                        {item.letter}
                      </span>
                      <span className="text-md font-semibold text-card-foreground">
                        {item.title}
                      </span>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      {item.description}
                    </p>
                    
                    <Link 
                      to={`/framework/${item.letter.toLowerCase()}`}
                      className="text-xs text-accent hover:text-accent/80 font-medium"
                    >
                      Learn More →
                    </Link>
                  </div>
                );
              })}
            </div>
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