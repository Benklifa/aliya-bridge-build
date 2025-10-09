import Layout from "@/components/Layout";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const FrameworkInvest = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <TrendingUp size={32} className="text-green-600" />
                </div>
              </div>
              <div className="mb-4">
                <span className="font-serif text-5xl font-bold text-accent mr-3">I</span>
                <span className="text-4xl font-bold text-foreground">Invest (& Insure)</span>
              </div>
              <p className="text-xl text-black">
                Build reliable income streams while managing the 10-year tax window and balancing growth with protection.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  The 10-Year Tax Exemption Window
                </h2>
                <p className="text-black mb-4">
                  New and returning Israeli residents may qualify for a 10-year exemption on foreign income and capital gains. 
                  This creates unique opportunities for tax-efficient investing, Roth conversions, and strategic asset allocation.
                </p>
                <ul className="list-disc list-inside text-black space-y-2">
                  <li>Qualification requirements and timing strategies</li>
                  <li>Roth IRA conversion opportunities during exemption period</li>
                  <li>Capital gains realization timing</li>
                  <li>Asset location optimization between jurisdictions</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Dual-Currency Portfolio Management
                </h2>
                <p className="text-black mb-4">
                  Building a portfolio that generates income in both USD and ILS while managing currency risk and 
                  maximizing tax efficiency across both countries' regulatory frameworks.
                </p>
                <ul className="list-disc list-inside text-black space-y-2">
                  <li>Multi-currency asset allocation strategies</li>
                  <li>Currency-hedged vs. unhedged investment decisions</li>
                  <li>Tax-efficient fund selection across jurisdictions</li>
                  <li>Rebalancing strategies considering tax implications</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Life Insurance & Protection Strategies
                </h2>
                <p className="text-black mb-4">
                  Life insurance serves multiple purposes in cross-border planning: protection, tax-advantaged growth, 
                  and liquidity access. U.S. policies are often significantly less expensive than Israeli alternatives.
                </p>
                <ul className="list-disc list-inside text-black space-y-2">
                  <li>Term vs. permanent life insurance analysis</li>
                  <li>Cross-border estate planning integration</li>
                  <li>Policy loan strategies for liquidity</li>
                  <li>Tax treatment differences between countries</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Alternative Investments for Qualified Investors
                </h2>
                <p className="text-black mb-4">
                  For qualified investors, alternative investments can provide diversification, inflation protection, 
                  and unique opportunities not available through traditional asset classes.
                </p>
                <ul className="list-disc list-inside text-black space-y-2">
                  <li>Private equity and hedge fund opportunities</li>
                  <li>Real estate investment strategies</li>
                  <li>Commodity and inflation-protected alternatives</li>
                  <li>Cross-border regulatory compliance for alternatives</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Smart Credit & Lending Strategies
                </h2>
                <p className="text-black mb-4">
                  Establishing credit lines before international moves and using asset-based lending can provide 
                  flexible access to capital without triggering taxable events.
                </p>
                <ul className="list-disc list-inside text-black space-y-2">
                  <li>HELOC establishment timing and strategies</li>
                  <li>Asset-based lending against investment portfolios</li>
                  <li>Securities-based lines of credit</li>
                  <li>Cross-border lending qualification considerations</li>
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Link 
                to="/framework/l"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>← Previous: Live</span>
              </Link>
              
              <Link 
                to="/framework/y"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>Next: Y'rusha (Legacy) →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FrameworkInvest;