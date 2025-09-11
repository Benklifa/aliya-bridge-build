import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { 
  PieChart, 
  TrendingUp, 
  Briefcase, 
  Calendar, 
  FileText, 
  ChevronDown, 
  Phone 
} from "lucide-react";
import { useState } from "react";

const Services = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      icon: PieChart,
      title: "Financial Planning",
      description: "Comprehensive cross-border financial strategies tailored for Aliyah transitions.",
      color: "text-blue-600",
      details: [
        "Complete financial health assessment across both countries",
        "Goal-based planning for lifestyle maintenance",
        "Tax-efficient transition strategies",
        "Currency hedging and inflation protection",
        "Regular plan reviews and adjustments"
      ],
      process: "We begin with a comprehensive discovery process to understand your current financial situation, Aliyah timeline, and lifestyle goals. Our planning process typically takes 4-6 weeks and includes detailed analysis, strategy development, and implementation roadmap."
    },
    {
      icon: TrendingUp,
      title: "Investment Management",
      description: "Professional portfolio management with dual-country tax optimization.",
      color: "text-green-600",
      details: [
        "Tax-optimized asset allocation",
        "Multi-currency portfolio management", 
        "ESG and socially responsible investing options",
        "Regular rebalancing and tax-loss harvesting",
        "Coordination with Israeli tax exemption periods"
      ],
      process: "Our investment approach focuses on tax efficiency during your transition period. We utilize the 10-year Israeli tax exemption window strategically while building a portfolio that serves your long-term needs in both countries."
    },
    {
      icon: Briefcase,
      title: "Alternative Investments for Qualified Investors",
      description: "Sophisticated strategies for investors seeking diversified income approaches.",
      color: "text-purple-600",
      details: [
        "Derivatives-based income strategies",
        "Private credit and lending opportunities",
        "Real estate investment trusts (REITs)",
        "Structured products for specific outcomes",
        "Due diligence and risk assessment"
      ],
      process: "Available to accredited investors only. These strategies require careful suitability analysis and ongoing monitoring. We provide comprehensive due diligence and ensure proper documentation for cross-border compliance."
    },
    {
      icon: Calendar,
      title: "Retirement Income Strategies",
      description: "Sustainable income planning for U.S.-Israel retirement scenarios.",
      color: "text-orange-600",
      details: [
        "Social Security optimization across borders",
        "Pension maximization strategies",
        "Annuity evaluation and implementation",
        "Healthcare cost planning",
        "Long-term care insurance coordination"
      ],
      process: "We analyze your retirement income needs in both countries, considering factors like healthcare costs, currency fluctuations, and lifestyle preferences. Our strategies ensure reliable income regardless of where you choose to spend your retirement years."
    },
    {
      icon: FileText,
      title: "Complete Aliyah Financial Plan",
      description: "Comprehensive budgeting and retirement plan for Aliyah or dual-country retirement.",
      color: "text-teal-600",
      details: [
        "Detailed cost-of-living analysis",
        "Timeline-based transition planning",
        "Documentation and compliance checklists",
        "Banking and account setup guidance",
        "Ongoing support throughout transition"
      ],
      process: "Our most comprehensive service includes everything from initial planning through post-Aliyah support. This 6-month process covers every aspect of your financial transition with regular check-ins and plan adjustments."
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-serif text-5xl font-bold text-primary mb-6">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive financial solutions designed specifically for 
              Americans making Aliyah or considering dual-country retirement.
            </p>
          </div>

          {/* Services List */}
          <div className="max-w-5xl mx-auto space-y-6 mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              const isExpanded = expandedService === index;
              
              return (
                <div key={index} className="bg-white rounded-lg card-shadow">
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent size={24} className={service.color} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl font-bold text-primary mb-2">
                            {service.title}
                          </h3>
                          <button
                            onClick={() => setExpandedService(isExpanded ? null : index)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors"
                          >
                            <ChevronDown 
                              size={20} 
                              className={`text-accent transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>

                        {isExpanded && (
                          <div className="space-y-6 pt-4 border-t border-border">
                            <div>
                              <h4 className="font-semibold text-primary mb-3">What's Included:</h4>
                              <ul className="space-y-2">
                                {service.details.map((detail, detailIndex) => (
                                  <li key={detailIndex} className="flex items-start space-x-2">
                                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                                    <span className="text-foreground text-sm">{detail}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-primary mb-3">Our Process:</h4>
                              <p className="text-muted-foreground text-sm leading-relaxed">
                                {service.process}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto bg-primary rounded-lg p-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Schedule a complimentary consultation to discuss which services 
              are right for your Aliyah journey.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact"
                className="btn-gold inline-flex items-center space-x-2 px-8 py-4 rounded-md font-semibold text-lg hover:scale-105 transition-transform"
              >
                <Phone size={20} />
                <span>Schedule a Free Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;