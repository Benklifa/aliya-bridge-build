import Layout from "@/components/Layout";
import { Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FrameworkAlign = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <Target size={32} className="text-blue-600" />
                </div>
              </div>
              <div className="mb-4">
                <span className="font-serif text-5xl font-bold text-accent mr-3">A</span>
                <span className="text-4xl font-bold text-foreground">Align</span>
              </div>
              <p className="text-xl text-white">
                Align your financial reality with your Aliyah vision through comprehensive budgeting and lifestyle planning.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Housing & Real Estate Strategy
                </h2>
                <p className="text-white mb-4">
                  Making informed rent vs. buy decisions requires understanding both markets deeply. We analyze housing costs, 
                  property taxes, and long-term appreciation potential in both countries to help you make the right choice for 
                  your timeline and financial goals.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Comparative market analysis for U.S. and Israeli real estate</li>
                  <li>Timing strategies for property sales and purchases</li>
                  <li>Tax implications of international property ownership</li>
                  <li>Mortgage qualification considerations across borders</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Healthcare Transition Planning
                </h2>
                <p className="text-white mb-4">
                  Healthcare systems differ significantly between the U.S. and Israel. We help you understand insurance 
                  continuity, Medicare coordination, and budget for healthcare costs in both systems.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Medicare enrollment timing and coordination with Israeli healthcare</li>
                  <li>Private insurance options and supplemental coverage</li>
                  <li>Prescription medication access and cost planning</li>
                  <li>Emergency medical coverage during transitions</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Currency & Inflation Protection
                </h2>
                <p className="text-white mb-4">
                  Currency fluctuations and different inflation rates can significantly impact your purchasing power. 
                  We implement strategies to protect against adverse currency movements and maintain your lifestyle.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Multi-currency budget planning and allocation</li>
                  <li>Hedging strategies for major expenses</li>
                  <li>Inflation-protected investment strategies</li>
                  <li>Emergency currency reserves planning</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Transportation & Logistics
                </h2>
                <p className="text-white mb-4">
                  From vehicle considerations to travel budgets, we help align your transportation needs with your 
                  cross-border lifestyle and budget realities.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Vehicle purchase, shipping, or replacement analysis</li>
                  <li>Public transportation and travel budgeting</li>
                  <li>Insurance and registration considerations</li>
                  <li>Regular travel costs between countries</li>
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Link 
                to="/framework"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>← Back to Framework</span>
              </Link>
              
              <Link 
                to="/framework/l"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>Next: Live →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FrameworkAlign;