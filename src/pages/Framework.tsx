import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Framework = () => {
  const frameworkElements = [
    {
      id: "a",
      letter: "A",
      title: "Align",
      tagline: "Align your financial reality with your Aliyah vision through comprehensive budgeting and lifestyle planning.",
      color: "border-blue-500"
    },
    {
      id: "l",
      letter: "L", 
      title: "Live",
      tagline: "Plan for longevity and rising late-life costs; integrate annuities and long-term care strategies.",
      color: "border-green-500"
    },
    {
      id: "i",
      letter: "I",
      title: "Invest",
      tagline: "Build reliable income streams while managing the 10-year tax window and balancing growth with protection.",
      color: "border-purple-500"
    },
    {
      id: "y",
      letter: "Y",
      title: "Y'rusha (Legacy)",
      tagline: "Cross-border estate planning with proper wills, beneficiary design, and tax-sensitive legacy strategies.",
      color: "border-orange-500"
    },
    {
      id: "adapt",
      letter: "A",
      title: "Adapt", 
      tagline: "Maintain liquidity and flexibility with cash reserves, currency access, and practical lending solutions.",
      color: "border-red-500"
    }
  ];

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-4">
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              The A.L.I.Y.A. Framework Explained
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Our comprehensive methodology for cross-border financial planning, 
              designed specifically to ensure your Aliyah transition supports 
              the lifestyle you want—both now and in retirement.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-4 pb-12">
        <div className="container mx-auto px-4">
          {/* Framework Puzzle Image - Centered and Responsive */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="flex justify-center">
              <img 
                src="/brokenpuzzlewithwords.png" 
                alt="A.L.I.Y.A Framework - Align, Live, Invest, Y'rusha, Adapt"
                className="w-full h-auto max-w-4xl"
              />
            </div>
          </div>

          {/* Framework Cards - Responsive Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {frameworkElements.map((element) => (
                <Link
                  key={element.id}
                  to={`/framework/${element.id}`}
                  className="group"
                >
                  <div className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 md:p-8 border-l-4 ${element.color} h-full flex flex-col justify-between`}>
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 flex items-center">
                      <span className="text-accent mr-2">{element.letter}.</span>
                      {element.title}
                    </h3>
                    
                    {/* CTA Link */}
                    <div className="flex items-center text-accent font-semibold group-hover:text-accent/80 transition-colors">
                      <span>Learn more about {element.title}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Framework;

