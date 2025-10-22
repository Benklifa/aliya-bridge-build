import Layout from "../components/Layout";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const RealEstateReadinessParent = () => {
  const navigate = useNavigate();

  return (
    <Layout hideBuddy={true}>
      {/* Header Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-4">
              Real Estate Readiness
            </h1>
            <p className="text-xl text-white leading-relaxed mb-6">
              Navigate your housing journey in Israel with confidence and clarity.
            </p>
            <p className="text-lg text-white/90">
              Let's explore your housing path in Israel.
            </p>
          </div>
        </div>
      </div>

      {/* Two CTA Panels */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* CTA 1: Where Should I Live? */}
              <Card 
                className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-teal border-2 border-gray-200 bg-white"
                onClick={() => navigate('/where-should-i-live')}
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🏠</div>
                  <h2 className="text-2xl font-serif font-bold text-primary">
                    Where Should I Live?
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Discover which Israeli communities best match your lifestyle, budget, and priorities.
                  </p>
                  <div className="pt-4">
                    <div className="inline-flex items-center text-teal font-semibold">
                      Start Community Finder
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>

              {/* CTA 2: Am I Ready to Buy? */}
              <Card 
                className="p-8 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-teal border-2 border-gray-200 bg-white"
                onClick={() => navigate('/am-i-ready-to-buy')}
              >
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">🧮</div>
                  <h2 className="text-2xl font-serif font-bold text-primary">
                    Am I Ready to Buy a House?
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Assess your rent vs. buy readiness and long-term housing stability.
                  </p>
                  <div className="pt-4">
                    <div className="inline-flex items-center text-teal font-semibold">
                      Start Readiness Assessment
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>

            </div>

            {/* Additional Info Section */}
            <div className="mt-12 text-center">
              <Card className="p-6 bg-blue-50 border-blue-200">
                <p className="text-gray-800 leading-relaxed">
                  <strong>Not sure which path to take?</strong> Start with "Where Should I Live?" to explore communities, 
                  then move to "Am I Ready to Buy?" to assess your financial readiness for property purchase.
                </p>
              </Card>
            </div>

            {/* Why These Assessments Matter */}
            <div className="mt-12">
              <h3 className="text-2xl font-serif font-bold text-primary text-center mb-6">
                Why These Assessments Matter
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="text-lg font-bold text-primary mb-3">🎯 Data-Driven Decisions</h4>
                  <p className="text-gray-700">
                    Our assessments use live market data from trusted Israeli sources to give you accurate, 
                    current information about communities and costs.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="text-lg font-bold text-primary mb-3">📊 Personalized Insights</h4>
                  <p className="text-gray-700">
                    Get customized recommendations based on your unique situation, priorities, and budget—not 
                    generic advice.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="text-lg font-bold text-primary mb-3">🗺️ Community Matching</h4>
                  <p className="text-gray-700">
                    Find communities that align with your lifestyle, family needs, religious preferences, and 
                    financial capacity.
                  </p>
                </Card>
                <Card className="p-6">
                  <h4 className="text-lg font-bold text-primary mb-3">💡 Clear Next Steps</h4>
                  <p className="text-gray-700">
                    Receive actionable recommendations and connect with trusted professionals who specialize 
                    in helping Olim.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RealEstateReadinessParent;

