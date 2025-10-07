import Layout from "@/components/Layout";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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
    },
    {
      question: "How do I handle U.S. tax obligations while living in Israel?",
      answer: "U.S. citizens must file annual tax returns regardless of residency. However, the Foreign Earned Income Exclusion, Foreign Tax Credit, and tax treaties can significantly reduce or eliminate double taxation. We coordinate with tax professionals to optimize your cross-border tax strategy."
    },
    {
      question: "What investment considerations are unique to cross-border planning?",
      answer: "Cross-border investing involves navigating different regulatory environments, tax treaties, and reporting requirements. We focus on tax-efficient vehicles, consider the timing of the 10-year Israeli exemption period, and structure portfolios to minimize complications while maximizing growth potential."
    },
    {
      question: "How should I plan for healthcare costs in both countries?",
      answer: "Healthcare planning involves understanding both systems - Israeli Kupat Holim and U.S. Medicare/private insurance. We help budget for supplemental coverage, coordinate benefits timing, and plan for long-term care needs that may span both countries."
    }
  ];

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="font-serif text-5xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-white leading-relaxed">
                Common questions about cross-border financial planning and Aliyah preparation
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card rounded-lg card-shadow">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-card-foreground pr-4">
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

export default FAQ;