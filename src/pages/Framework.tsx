import Layout from "@/components/Layout";
import { Target, Heart, TrendingUp, Users, Shuffle, ChevronDown } from "lucide-react";
import { useState } from "react";

const Framework = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const frameworkSections = [
    {
      letter: "A",
      title: "Align",
      icon: Target,
      color: "text-blue-600",
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
      icon: Heart,
      color: "text-red-600",
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
      title: "Invest (& Insure)",
      icon: TrendingUp,
      color: "text-green-600", 
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
      icon: Users,
      color: "text-purple-600",
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
      icon: Shuffle,
      color: "text-orange-600",
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

          {/* Framework Sections */}
          <div className="max-w-6xl mx-auto space-y-12 mb-16">
            {frameworkSections.map((section, index) => {
              const IconComponent = section.icon;
              return (
                <div key={index} className="bg-white rounded-lg card-shadow p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                    <div className="flex items-center space-x-4 mb-6 lg:mb-0 lg:flex-col lg:space-x-0 lg:space-y-4 lg:text-center">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent size={32} className={section.color} />
                      </div>
                      <div>
                        <span className="font-serif text-4xl font-bold text-accent">
                          {section.letter}
                        </span>
                        <h3 className="text-2xl font-bold text-primary ml-2 lg:ml-0">
                          {section.title}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        {section.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {section.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                            <span className="text-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-12">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg card-shadow">
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
                      <p className="text-muted-foreground leading-relaxed">
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