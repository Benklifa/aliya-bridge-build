import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Framework = () => {
  const frameworkElements = [
    {
      id: "align",
      letter: "A",
      title: "Align",
      color: "bg-blue-500",
      position: "top-[15%]"
    },
    {
      id: "live",
      letter: "L", 
      title: "Live",
      color: "bg-green-500",
      position: "top-[30%]"
    },
    {
      id: "invest",
      letter: "I",
      title: "Invest",
      color: "bg-purple-500",
      position: "top-[45%]"
    },
    {
      id: "yrusha",
      letter: "Y",
      title: "Y'rusha",
      color: "bg-orange-500",
      position: "top-[60%]"
    },
    {
      id: "adapt",
      letter: "A",
      title: "Adapt", 
      color: "bg-red-500",
      position: "top-[75%]"
    }
  ];

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
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
      
      <div className="pb-16">
        <div className="container mx-auto px-4">
          {/* Framework Puzzle Image with Bubble Callouts */}
          <div className="max-w-6xl mx-auto" style={{ marginTop: '16px' }}>
            <div className="relative flex items-start justify-center">
              {/* Image on the left */}
              <div className="w-3/5 pr-8">
                <img 
                  src="/brokenpuzzlewithwords.png" 
                  alt="A.L.I.Y.A Framework - Align, Live, Invest, Y'rusha, Adapt"
                  className="w-full h-auto"
                />
              </div>

              {/* Bubble callouts on the right */}
              <div className="w-2/5 relative" style={{ minHeight: '600px' }}>
                {frameworkElements.map((element) => (
                  <Link
                    key={element.id}
                    to={`/framework/${element.id}`}
                    className={`absolute right-0 ${element.position} group`}
                  >
                    <div className={`${element.color} text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 min-w-[280px]`}>
                      <span className="font-semibold text-lg">
                        Learn more about {element.title}
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Framework;

