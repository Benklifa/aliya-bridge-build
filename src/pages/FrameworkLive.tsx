import Layout from "@/components/Layout";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FrameworkLive = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <Heart size={32} className="text-red-600" />
                </div>
              </div>
              <div className="mb-4">
                <span className="font-serif text-5xl font-bold text-accent mr-3">L</span>
                <span className="text-4xl font-bold text-foreground">Live</span>
              </div>
              <p className="text-xl text-white">
                Plan for longevity with strategies that address rising late-life costs and healthcare needs.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Longevity & Life Expectancy Planning
                </h2>
                <p className="text-white mb-4">
                  With increasing life expectancies, retirement can last 30+ years. We plan for extended retirement periods 
                  and the financial implications of potentially living in two countries during different life stages.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Extended retirement period income planning</li>
                  <li>Healthcare cost escalation projections</li>
                  <li>Late-life housing and care considerations</li>
                  <li>Quality of life maintenance strategies</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Long-Term Care Strategies
                </h2>
                <p className="text-white mb-4">
                  Long-term care needs can arise in either country. We evaluate insurance options, alternative strategies, 
                  and family care coordination to protect your assets and ensure quality care.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Long-term care insurance evaluation and alternatives</li>
                  <li>Cross-border care coordination strategies</li>
                  <li>Family caregiver support and planning</li>
                  <li>Asset protection for care costs</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Guaranteed Income Strategies
                </h2>
                <p className="text-white mb-4">
                  Annuities and other guaranteed income vehicles can provide a reliable income floor, especially important 
                  when living on a fixed income across different currencies and economic environments.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Immediate and deferred annuity strategies</li>
                  <li>Social Security optimization across borders</li>
                  <li>Pension coordination and timing</li>
                  <li>Currency-hedged income solutions</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Healthcare System Integration
                </h2>
                <p className="text-white mb-4">
                  Understanding and coordinating between U.S. Medicare and Israeli healthcare systems ensures continuous, 
                  cost-effective healthcare coverage throughout your retirement years.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Medicare Part A, B, C, and D coordination strategies</li>
                  <li>Israeli Kupat Holim system integration</li>
                  <li>Supplemental insurance gap analysis</li>
                  <li>Prescription drug coverage optimization</li>
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Link 
                to="/framework/a"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>← Previous: Align</span>
              </Link>
              
              <Link 
                to="/framework/i"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>Next: Invest (& Insure) →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FrameworkLive;