import Layout from "@/components/Layout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Framework = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const frameworkSections = [
    {
      letter: "A",
      title: "Align",
      puzzlePiece: "/lovable-uploads/ae86307b-b07d-4f24-b1a1-d3edd4b05bbb.png",
      description: "Align your financial reality with your Aliyah vision through comprehensive budgeting and lifestyle planning.",
      details: [
        "Housing cost analysis: Rent vs. buy decisions in both markets",
        "Healthcare transition planning and insurance continuity",
        "Transportation budgeting and vehicle considerations",
        "Currency hedging strategies for major expenses",
        "Inflation protection for fixed-income planning"
      ]
    },
    {
      letter: "L", 
      title: "Live",
      puzzlePiece: "/lovable-uploads/735c892c-6aff-45ec-9d46-71fe93453bfe.png",
      description: "Plan for longevity with strategies that address rising late-life costs and healthcare needs.",
      details: [
        "Longevity planning for extended retirement periods",
        "Long-term care insurance evaluation and alternatives",
        "Annuity strategies for guaranteed income floors", 
        "Healthcare cost projections in both countries",
        "Medicare coordination with Israeli healthcare systems"
      ]
    },
    {
      letter: "I",
      title: "Invest",
      puzzlePiece: "/lovable-uploads/ba92d131-5eef-4b0b-b451-18a218ac3b44.png",
      description: "Build reliable income streams while managing the 10-year tax window and balancing growth with protection.",
      details: [
        "Tax-efficient investing during the 10-year exemption period",
        "Asset allocation for dual-currency retirement needs",
        "Life insurance strategies for cross-border estate planning",
        "Alternative investments for qualified investors",
        "Smart credit lines: HELOC and asset-based lending"
      ]
    },
    {
      letter: "Y",
      title: "Y'rusha (Legacy)",
      puzzlePiece: "/lovable-uploads/e4789ae2-00ef-4434-8448-e40b3d958c6f.png",
      description: "Cross-border estate planning with proper wills, beneficiary design, and tax-sensitive legacy strategies.",
      details: [
        "Dual-jurisdiction will preparation and coordination",
        "Beneficiary designation optimization for tax efficiency",
        "Asset titling strategies for cross-border estates",
        "Trust structures for U.S.-Israel estate planning",
        "Generation-skipping transfer tax considerations"
      ]
    },
    {
      letter: "A",
      title: "Adapt", 
      puzzlePiece: "/lovable-uploads/d9cfcc3e-4886-420b-8669-e72474f17be9.png",
      description: "Maintain liquidity and flexibility with cash reserves, currency access, and practical lending solutions.",
      details: [
        "Emergency fund allocation across USD and ILS",
        "Currency diversification strategies",
        "HELOC establishment before international move",
        "Asset-based lending for major purchases",
        "Permanent life insurance policy loans for liquidity"
      ]
    }
  ];

  const faqs = [
    {
      question: "How does currency hedging work for Aliyah planning?",
      answer: "Currency hedging involves using financial instruments to protect against adverse exchange rate movements between USD and ILS. We implement strategies like forward contracts, currency-hedged investments, and maintaining assets in both currencies to reduce exposure to volatility."
    },
    {
      question: "Should I maintain dual-country bank accounts?",
      answer: "Yes, maintaining accounts in both countries is typically beneficial for currency flexibility, easier bill payment, and avoiding international transfer fees. We help structure this to comply with reporting requirements in both jurisdictions."
    },
    {
      question: "When should I apply for Medicare and how does it work with Israeli healthcare?",
      answer: "You should apply for Medicare Part A when eligible (usually at 65) even if living in Israel, as there's no penalty. Part B has enrollment deadlines that can result in lifetime penalties, so timing is crucial based on your specific situation and health insurance coverage."
    },
    {
      question: "What is the 10-year Israeli tax exemption and how do I optimize it?",
      answer: "New and returning residents may qualify for a 10-year exemption on foreign income and capital gains. This creates significant tax planning opportunities for investment timing, Roth conversions, and asset reallocation that we help coordinate with your overall financial plan."
    },
    {
      question: "What are the best liquidity strategies for cross-border living?",
      answer: "Effective liquidity strategies include establishing a HELOC before moving (easier to qualify as a U.S. resident), asset-based lending against investment portfolios, and permanent life insurance policy loans. Each provides access to capital without triggering taxable events."
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-serif text-5xl font-bold text-primary mb-6">
              The A.L.I.Y.A. Framework Explained
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our comprehensive methodology for cross-border financial planning, 
              designed specifically to ensure your Aliyah transition supports 
              the lifestyle you want—both now and in retirement.
            </p>
          </div>

          {/* Framework Puzzle Grid */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gray-800/90 rounded-lg p-6 border border-gray-700 backdrop-blur-sm">
              <div className="flex flex-col items-center">
                {frameworkSections.map((section, index) => {
                  const marginClass = index === 0 ? "ml-[95px]" : index === 2 ? "-ml-[90px] -mt-[140px]" : index === 3 ? "-ml-[65px] -mt-[137px]" : "-mt-20";
                  return (
                    <div 
                      key={section.title}
                      className={`relative flex items-center w-full ${marginClass}`}
                    >
                      <div 
                        className="relative w-[1200px] h-96 text-center hover:scale-105 transition-all duration-300"
                        style={{
                          backgroundImage: `url(${section.puzzlePiece})`,
                          backgroundSize: 'contain',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="relative z-10 p-20 h-full flex flex-col justify-center max-w-[500px] mx-auto">
                          <div className="mb-4">
                            <span className="text-3xl font-bold text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">{section.title}</span>
                          </div>
                          <p className="text-base text-white leading-relaxed drop-shadow-[1px_1px_3px_rgba(0,0,0,0.8)] break-words">{section.description}</p>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/framework/${section.letter.toLowerCase()}`} 
                        className="text-base text-accent hover:text-accent/80 font-semibold transition-colors ml-2 drop-shadow-lg whitespace-nowrap"
                      >
                        Learn more →
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-lg card-shadow">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-primary pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown 
                      size={20} 
                      className={`text-accent transition-transform ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-card-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Framework;