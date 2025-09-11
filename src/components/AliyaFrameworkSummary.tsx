import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AliyaFrameworkSummary = () => {
  const frameworkItems = [
    {
      letter: "A",
      title: "Align",
      description: "Budgeting, housing, healthcare, transportation, and currency/inflation realities aligned with your Aliyah vision.",
      puzzlePiece: "/lovable-uploads/9910b6d4-7800-4fca-b397-1e1d4f4302ad.png"
    },
    {
      letter: "L",
      title: "Live",
      description: "Plan for longevity and rising late-life costs; integrate annuities and long-term care strategies.",
      puzzlePiece: "/public/lovable-uploads/puzzle-piece-l.png"
    },
    {
      letter: "I",
      title: "Invest (& Insure)",
      description: "Build reliable income, manage the 10-year tax window, balance growth with protection, and use smart credit lines.",
      puzzlePiece: "/public/lovable-uploads/puzzle-piece-i.png"
    },
    {
      letter: "Y",
      title: "Y'rusha",
      description: "Cross-border wills, beneficiary design, titling, and tax-sensitive legacy planning.",
      puzzlePiece: "/public/lovable-uploads/puzzle-piece-y.png"
    },
    {
      letter: "A",
      title: "Adapt",
      description: "Liquidity and flexibility—cash reserves, access to USD/ILS, and practical solutions like HELOC, asset-based lending, and policy loans.",
      puzzlePiece: "/public/lovable-uploads/puzzle-piece-adapt.png"
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
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-lg card-shadow p-4 w-48 text-center hover:shadow-lg transition-all hover:scale-105"
                    style={{
                      transform: index === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <img 
                        src={item.puzzlePiece} 
                        alt={`${item.title} puzzle piece`}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    
                    <div className="mb-2">
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
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-lg card-shadow p-4 w-48 text-center hover:shadow-lg transition-all hover:scale-105"
                  >
                    <div className="flex justify-center mb-3">
                      <img 
                        src={item.puzzlePiece} 
                        alt={`${item.title} puzzle piece`}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    
                    <div className="mb-2">
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
                return (
                  <div 
                    key={index}
                    className="bg-card rounded-lg card-shadow p-4 w-48 text-center hover:shadow-lg transition-all hover:scale-105"
                    style={{
                      transform: index === 0 ? 'rotate(1deg)' : 'rotate(-1deg)',
                    }}
                  >
                    <div className="flex justify-center mb-3">
                      <img 
                        src={item.puzzlePiece} 
                        alt={`${item.title} puzzle piece`}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    
                    <div className="mb-2">
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