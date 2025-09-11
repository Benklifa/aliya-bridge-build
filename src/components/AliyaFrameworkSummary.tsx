import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AliyaFrameworkSummary = () => {
  const frameworkItems = [
    {
      letter: "A",
      title: "Align",
      description: "Budgeting, housing, healthcare, transportation, and currency/inflation realities aligned with your Aliyah vision.",
      puzzlePiece: "/lovable-uploads/ba92d131-5eef-4b0b-b451-18a218ac3b44.png"
    },
    {
      letter: "L",
      title: "Live",
      description: "Plan for longevity and rising late-life costs; integrate annuities and long-term care strategies.",
      puzzlePiece: "/lovable-uploads/735c892c-6aff-45ec-9d46-71fe93453bfe.png"
    },
    {
      letter: "I",
      title: "Invest (& Insure)",
      description: "Build reliable income, manage the 10-year tax window, balance growth with protection, and use smart credit lines.",
      puzzlePiece: "/lovable-uploads/e4789ae2-00ef-4434-8448-e40b3d958c6f.png"
    },
    {
      letter: "Y",
      title: "Y'rusha",
      description: "Cross-border wills, beneficiary design, titling, and tax-sensitive legacy planning.",
      puzzlePiece: "/lovable-uploads/ae86307b-b07d-4f24-b1a1-d3edd4b05bbb.png"
    },
    {
      letter: "A",
      title: "Adapt",
      description: "Liquidity and flexibility—cash reserves, access to USD/ILS, and practical solutions like HELOC, asset-based lending, and policy loans.",
      puzzlePiece: "/lovable-uploads/d9cfcc3e-4886-420b-8669-e72474f17be9.png"
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
                    className="relative w-48 h-60 text-center hover:scale-105 transition-all duration-300"
                    style={{
                      transform: index === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                      backgroundImage: `url(${item.puzzlePiece})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                      <div className="mb-3">
                        <span className="text-lg font-bold text-white drop-shadow-lg">
                          {item.title}
                        </span>
                      </div>
                      
                      <p className="text-xs text-white leading-relaxed mb-4 drop-shadow-md px-2">
                        {item.description}
                      </p>
                      
                      <Link 
                        to={`/framework/${item.letter.toLowerCase()}`}
                        className="text-xs text-white hover:text-accent font-medium bg-black/30 px-3 py-1 rounded backdrop-blur-sm transition-colors"
                      >
                        Learn More →
                      </Link>
                    </div>
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
                    className="relative w-48 h-60 text-center hover:scale-105 transition-all duration-300"
                    style={{
                      backgroundImage: `url(${item.puzzlePiece})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                      <div className="mb-3">
                        <span className="text-lg font-bold text-white drop-shadow-lg">
                          {item.title}
                        </span>
                      </div>
                      
                      <p className="text-xs text-white leading-relaxed mb-4 drop-shadow-md px-2">
                        {item.description}
                      </p>
                      
                      <Link 
                        to={`/framework/${item.letter.toLowerCase()}`}
                        className="text-xs text-white hover:text-accent font-medium bg-black/30 px-3 py-1 rounded backdrop-blur-sm transition-colors"
                      >
                        Learn More →
                      </Link>
                    </div>
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
                    className="relative w-48 h-60 text-center hover:scale-105 transition-all duration-300"
                    style={{
                      transform: index === 0 ? 'rotate(1deg)' : 'rotate(-1deg)',
                      backgroundImage: `url(${item.puzzlePiece})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 rounded-lg"></div>
                    <div className="relative z-10 p-4 h-full flex flex-col justify-center">
                      <div className="mb-3">
                        <span className="text-lg font-bold text-white drop-shadow-lg">
                          {item.title}
                        </span>
                      </div>
                      
                      <p className="text-xs text-white leading-relaxed mb-4 drop-shadow-md px-2">
                        {item.description}
                      </p>
                      
                      <Link 
                        to={`/framework/${item.letter.toLowerCase()}`}
                        className="text-xs text-white hover:text-accent font-medium bg-black/30 px-3 py-1 rounded backdrop-blur-sm transition-colors"
                      >
                        Learn More →
                      </Link>
                    </div>
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