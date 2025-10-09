import Layout from "@/components/Layout";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const FrameworkYrusha = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <Users size={32} className="text-purple-600" />
                </div>
              </div>
              <div className="mb-4">
                <span className="font-serif text-5xl font-bold text-accent mr-3">Y</span>
                <span className="text-4xl font-bold text-foreground">Y'rusha (Legacy)</span>
              </div>
              <p className="text-xl text-white">
                Cross-border estate planning with proper wills, beneficiary design, and tax-sensitive legacy strategies.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Dual-Jurisdiction Will Preparation
                </h2>
                <p className="text-white mb-4">
                  Having properly coordinated wills in both countries ensures your wishes are carried out efficiently 
                  and minimizes complications for your heirs. We coordinate with estate attorneys in both jurisdictions.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Coordinated will preparation avoiding conflicts</li>
                  <li>Asset-specific jurisdiction planning</li>
                  <li>Executor selection and coordination strategies</li>
                  <li>Regular review and update protocols</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Beneficiary Designation Optimization
                </h2>
                <p className="text-white mb-4">
                  Proper beneficiary designations can bypass probate and minimize taxes. We ensure all accounts, 
                  insurance policies, and retirement plans have appropriate and up-to-date beneficiary information.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Primary and contingent beneficiary strategies</li>
                  <li>Per stirpes vs. per capita considerations</li>
                  <li>Minor beneficiary planning and trusts</li>
                  <li>Cross-border beneficiary coordination</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Asset Titling & Ownership Strategies
                </h2>
                <p className="text-white mb-4">
                  How assets are titled affects taxation, probate, and transfer efficiency. We structure ownership 
                  to minimize complications while optimizing for tax efficiency in both countries.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Joint vs. individual ownership analysis</li>
                  <li>Transfer on death (TOD) and payable on death (POD) accounts</li>
                  <li>Trust ownership considerations</li>
                  <li>Community property vs. separate property planning</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Trust Structures for Cross-Border Estates
                </h2>
                <p className="text-white mb-4">
                  Trusts can provide significant benefits for cross-border estates, including tax optimization, 
                  asset protection, and simplified transfers. However, they require careful coordination between jurisdictions.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Revocable vs. irrevocable trust considerations</li>
                  <li>U.S. trust taxation for Israeli residents</li>
                  <li>Asset protection and creditor considerations</li>
                  <li>Charitable giving and tax benefits</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Generation-Skipping & Advanced Strategies
                </h2>
                <p className="text-white mb-4">
                  For families with significant wealth, advanced estate planning strategies can minimize transfer taxes 
                  and provide benefits for multiple generations while navigating complex cross-border regulations.
                </p>
                <ul className="list-disc list-inside text-white space-y-2">
                  <li>Generation-skipping transfer tax planning</li>
                  <li>Grantor trust strategies</li>
                  <li>Family limited partnerships and LLCs</li>
                  <li>Charitable remainder and lead trusts</li>
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Link 
                to="/framework/i"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>← Previous: Invest (& Insure)</span>
              </Link>
              
              <Link 
                to="/framework/adapt"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>Next: Adapt →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FrameworkYrusha;