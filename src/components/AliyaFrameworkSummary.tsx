import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const AliyaFrameworkSummary = () => {
  const frameworkItems = [
    {
      letter: "A",
      title: "Align",
      description: "Budgeting, housing, healthcare, transportation, and currency/inflation realities aligned with your Aliyah vision.",
      puzzlePiece: "/lovable-uploads/ae86307b-b07d-4f24-b1a1-d3edd4b05bbb.png"
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
      puzzlePiece: "/lovable-uploads/ba92d131-5eef-4b0b-b451-18a218ac3b44.png"
    },
    {
      letter: "Y",
      title: "Y'rusha",
      description: "Cross-border wills, beneficiary design, titling, and tax-sensitive legacy planning.",
      puzzlePiece: "/lovable-uploads/e4789ae2-00ef-4434-8448-e40b3d958c6f.png"
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

          {/* Vertical puzzle-piece layout */}
          <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              {frameworkItems.map((item, index) => {
                const marginClass = index === 0 ? "ml-12" : index === 3 ? "-mt-12" : "-mt-20";
                return (
                  <div 
                    key={index}
                    className={`relative flex items-center w-full ${marginClass}`}
                  >
                    <div 
                      className="relative w-[1200px] h-96 text-center hover:scale-105 transition-all duration-300"
                      style={{
                        backgroundImage: `url(${item.puzzlePiece})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="relative z-10 p-20 h-full flex flex-col justify-center max-w-[500px] mx-auto">
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
                            {item.title}
                          </span>
                        </div>
                        
                        <p className="text-base text-white leading-relaxed drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] break-words">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/framework/${item.letter.toLowerCase()}`}
                      className="text-base text-accent hover:text-accent/80 font-semibold transition-colors ml-2 drop-shadow-lg whitespace-nowrap"
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