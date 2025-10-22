import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface Question {
  id: number;
  category: string;
  text: string;
  value: number;
}

interface PillarScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: string;
  icon: string;
  summary: string;
  nextStep: string;
}

const AmIReadyToBuy = () => {
  const navigate = useNavigate();
  
  const [showResults, setShowResults] = useState(() => {
    const saved = localStorage.getItem('buyReadinessShowResults');
    return saved ? JSON.parse(saved) : false;
  });

  const initialQuestions: Question[] = [
    // Financial Capacity (5 questions) - Weight: 30%
    { id: 1, category: "Financial Capacity", text: "I have a clear understanding of my total budget for purchasing property in Israel.", value: 5 },
    { id: 2, category: "Financial Capacity", text: "I know the down payment requirements and have funds available or a plan to secure them.", value: 5 },
    { id: 3, category: "Financial Capacity", text: "I have accounted for additional costs like purchase tax, legal fees, and renovation expenses.", value: 5 },
    { id: 4, category: "Financial Capacity", text: "I have a strategy for converting USD to ILS for my real estate purchase.", value: 5 },
    { id: 5, category: "Financial Capacity", text: "My income is stable enough to handle unexpected housing costs and ongoing expenses.", value: 5 },
    
    // Mortgage & Documentation (4 questions) - Weight: 20%
    { id: 6, category: "Mortgage & Documentation", text: "I understand Israeli mortgage options and qualification requirements for Olim.", value: 5 },
    { id: 7, category: "Mortgage & Documentation", text: "I have gathered or know what documentation is needed for mortgage pre-approval.", value: 5 },
    { id: 8, category: "Mortgage & Documentation", text: "I understand how my U.S. credit history translates to Israeli lending requirements.", value: 5 },
    { id: 9, category: "Mortgage & Documentation", text: "I have researched mortgage rates and terms available to Olim.", value: 5 },
    
    // Market Fit & Affordability (5 questions) - Weight: 25%
    { id: 10, category: "Market Fit & Affordability", text: "I have identified specific cities or neighborhoods that match my lifestyle preferences.", value: 5 },
    { id: 11, category: "Market Fit & Affordability", text: "I know the typical price per square meter in my preferred neighborhoods.", value: 5 },
    { id: 12, category: "Market Fit & Affordability", text: "My budget aligns with property prices in my target areas.", value: 5 },
    { id: 13, category: "Market Fit & Affordability", text: "I understand current real estate market trends in my target areas.", value: 5 },
    { id: 14, category: "Market Fit & Affordability", text: "I have researched schools, synagogues, and community resources in my preferred locations.", value: 5 },
    
    // Property Readiness (3 questions) - Weight: 15%
    { id: 15, category: "Property Readiness", text: "I understand the difference between buying new construction versus existing properties.", value: 5 },
    { id: 16, category: "Property Readiness", text: "I have visited or virtually toured properties in my preferred neighborhoods.", value: 5 },
    { id: 17, category: "Property Readiness", text: "I am comfortable with either move-in-ready properties or renovation projects.", value: 5 },
    
    // Logistics & Lifecycle (3 questions) - Weight: 10%
    { id: 18, category: "Logistics & Lifecycle", text: "I have a clear timeline for when I want to purchase property in Israel.", value: 5 },
    { id: 19, category: "Logistics & Lifecycle", text: "I have identified reliable real estate agents or professionals to work with.", value: 5 },
    { id: 20, category: "Logistics & Lifecycle", text: "I know the legal requirements and documentation needed for property purchase as an Oleh.", value: 5 },
  ];

  const [responses, setResponses] = useState<Question[]>(() => {
    const saved = localStorage.getItem('buyReadinessResponses');
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  useEffect(() => {
    localStorage.setItem('buyReadinessResponses', JSON.stringify(responses));
    localStorage.setItem('buyReadinessShowResults', JSON.stringify(showResults));
  }, [responses, showResults]);

  const handleSliderChange = (questionId: number, value: number[]) => {
    setResponses(prev =>
      prev.map(q => q.id === questionId ? { ...q, value: value[0] } : q)
    );
  };

  const calculateScores = (): { 
    pillars: PillarScore[], 
    overall: number, 
    overallStatus: string 
  } => {
    const pillarGroups = {
      "Financial Capacity": {
        weight: 0.30,
        maxScore: 50,
        questions: responses.filter(q => q.category === "Financial Capacity"),
        summary: "Your savings and income stability are solid. Review liquidity post-purchase to ensure 9 months of housing reserves.",
        nextStep: "Calculate total first-year costs including setup, furnishings, and emergency reserves."
      },
      "Mortgage & Documentation": {
        weight: 0.20,
        maxScore: 40,
        questions: responses.filter(q => q.category === "Mortgage & Documentation"),
        summary: "You're prepared for pre-approval. Confirm Israeli lender documentation and tax filings.",
        nextStep: "Gather pay stubs, tax returns, and bank statements for mortgage pre-approval."
      },
      "Market Fit & Affordability": {
        weight: 0.25,
        maxScore: 50,
        questions: responses.filter(q => q.category === "Market Fit & Affordability"),
        summary: "Your price range aligns well with Beit Shemesh and Rehovot, but below Modi'in averages.",
        nextStep: "Visit top 3 neighborhoods and compare commute times, schools, and amenities."
      },
      "Property Readiness": {
        weight: 0.15,
        maxScore: 30,
        questions: responses.filter(q => q.category === "Property Readiness"),
        summary: "You prefer ready-to-move-in properties — focus on resale listings with strong structural inspections.",
        nextStep: "Schedule property tours and arrange for professional building inspections."
      },
      "Logistics & Lifecycle": {
        weight: 0.10,
        maxScore: 30,
        questions: responses.filter(q => q.category === "Logistics & Lifecycle"),
        summary: "Neighborhood logistics fit your stage well; proximity to schools and clinics supports stability.",
        nextStep: "Connect with recommended agents and schedule consultation with real estate lawyer."
      }
    };

    const pillars: PillarScore[] = Object.entries(pillarGroups).map(([name, data]) => {
      const score = data.questions.reduce((sum, q) => sum + q.value, 0);
      const percentage = Math.round((score / data.maxScore) * 100);
      let status = "";
      let icon = "";
      
      if (percentage >= 70) {
        status = "Ready";
        icon = "🟢";
      } else if (percentage >= 40) {
        status = "Partial";
        icon = "🟡";
      } else {
        status = "At Risk";
        icon = "🔴";
      }

      return { 
        name, 
        score, 
        maxScore: data.maxScore, 
        percentage, 
        status, 
        icon,
        summary: data.summary,
        nextStep: data.nextStep
      };
    });

    // Calculate weighted overall score
    let weightedSum = 0;
    Object.entries(pillarGroups).forEach(([name, data]) => {
      const pillar = pillars.find(p => p.name === name);
      if (pillar) {
        weightedSum += (pillar.percentage / 100) * data.weight;
      }
    });
    
    const overall = Math.round(weightedSum * 100);
    
    let overallStatus = "";
    if (overall >= 80) {
      overallStatus = "🟢 Ready to Buy";
    } else if (overall >= 50) {
      overallStatus = "🟡 Almost Ready (rent first)";
    } else {
      overallStatus = "🔴 Early Planning (prepare finances first)";
    }

    return { pillars, overall, overallStatus };
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setShowResults(false);
    setResponses(initialQuestions);
    localStorage.removeItem('buyReadinessResponses');
    localStorage.removeItem('buyReadinessShowResults');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResults) {
    const { pillars, overall, overallStatus } = calculateScores();
    const priorityPillars = [...pillars].sort((a, b) => a.percentage - b.percentage);

    return (
      <Layout hideBuddy={true}>
        {/* Header Section */}
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                Am I Ready to Buy a House?
              </h1>
              <p className="text-xl text-white leading-relaxed">
                This personalized report evaluates your readiness to purchase a home in Israel — financially, practically, and emotionally — and highlights next steps to help you move confidently toward your goal.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/real-estate-readiness')}
                  className="text-white/90 hover:text-white underline"
                >
                  ← Back to Real Estate Readiness
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">

              {/* Overall Readiness Gauge */}
              <Card className="p-8 text-center bg-gradient-to-br from-gray-100 to-gray-200">
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Your Readiness Score</h2>
                <div className="text-8xl font-bold text-primary mb-4">{overall}%</div>
                <div className="text-2xl font-semibold text-gray-700 mb-6">{overallStatus}</div>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                  Your readiness score suggests you're {overall >= 80 ? "ready to begin the purchase process" : overall >= 50 ? "close to being able to purchase, but should review financing and liquidity" : "in the early planning stages and should focus on building financial capacity"}.
                </p>
                <Button 
                  onClick={() => window.print()}
                  className="bg-gold-500 text-primary hover:bg-gold-600 px-6 py-3"
                >
                  📄 Download PDF Report
                </Button>
              </Card>

              {/* Five Readiness Pillars */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">Five Readiness Pillars</h3>
                <div className="space-y-6">
                  {pillars.map((pillar, idx) => (
                    <div key={idx} className="border-l-4 border-gold-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold text-primary">{pillar.name}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{pillar.icon}</span>
                          <span className="text-2xl font-bold text-primary">{pillar.percentage}%</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{pillar.summary}</p>
                      <div className="flex items-start gap-2">
                        <span className="text-gold-500 font-bold">→</span>
                        <p className="text-gray-600 italic">Next Step: {pillar.nextStep}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Key Risks & Mitigation */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">⚠️ Key Risks & Mitigation Plan</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold">Risk</th>
                        <th className="text-left py-3 px-2 font-semibold">Why It Matters</th>
                        <th className="text-left py-3 px-2 font-semibold">Mitigation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Interest Rate Risk</td>
                        <td className="py-3 px-2 text-gray-700">Variable rates can raise payments 10–20%</td>
                        <td className="py-3 px-2 text-gray-700">Lock rates or stress test at +1.5%</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">FX Volatility (USD/ILS)</td>
                        <td className="py-3 px-2 text-gray-700">Conversion timing affects affordability</td>
                        <td className="py-3 px-2 text-gray-700">Stage conversions; consider Wise/IBKR strategy</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Liquidity Shortfall</td>
                        <td className="py-3 px-2 text-gray-700">Moving costs, taxes, furnishings strain savings</td>
                        <td className="py-3 px-2 text-gray-700">Keep 6–12 months of housing costs liquid post-close</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Builder/Delivery Risk</td>
                        <td className="py-3 px-2 text-gray-700">"On-paper" projects may delay occupancy</td>
                        <td className="py-3 px-2 text-gray-700">Use lawyers to verify escrow safeguards</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Title/Legal Risk</td>
                        <td className="py-3 px-2 text-gray-700">Registration and tax missteps cause delays</td>
                        <td className="py-3 px-2 text-gray-700">Engage lawyer early; verify arnona/va'ad obligations</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Cost Overview */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">💰 Cost Overview</h3>
                
                {/* Monthly Carry Estimate */}
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-primary mb-4">Monthly Carry Estimate</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-2">Item</th>
                          <th className="text-left py-3 px-2">Typical Range</th>
                          <th className="text-left py-3 px-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Mortgage (4-room)</td>
                          <td className="py-3 px-2">₪8,000–₪10,000</td>
                          <td className="py-3 px-2 text-gray-700">Based on 3.5% rate, 70% LTV</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Arnona</td>
                          <td className="py-3 px-2">₪400–₪600</td>
                          <td className="py-3 px-2 text-gray-700">Depends on city, size, zoning</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Va'ad Bayit</td>
                          <td className="py-3 px-2">₪200–₪400</td>
                          <td className="py-3 px-2 text-gray-700">Moderate buildings with elevator</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Utilities</td>
                          <td className="py-3 px-2">₪600–₪800</td>
                          <td className="py-3 px-2 text-gray-700">Water, electricity, internet</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Transport</td>
                          <td className="py-3 px-2">₪800–₪1,200</td>
                          <td className="py-3 px-2 text-gray-700">One vehicle or regional commute</td>
                        </tr>
                        <tr className="border-b-2 border-gray-300 bg-gray-50">
                          <td className="py-3 px-2 font-bold">Total</td>
                          <td className="py-3 px-2 font-bold">₪10,000–₪13,000</td>
                          <td className="py-3 px-2 text-gray-700">≈ 30–35% of income typical</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* One-Time / Closing Costs */}
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4">One-Time / Closing Costs</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-2">Item</th>
                          <th className="text-left py-3 px-2">Typical Range</th>
                          <th className="text-left py-3 px-2">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Purchase Tax</td>
                          <td className="py-3 px-2">0%–8%</td>
                          <td className="py-3 px-2 text-gray-700">Oleh exemptions possible</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Legal Fees</td>
                          <td className="py-3 px-2">₪10,000–₪20,000</td>
                          <td className="py-3 px-2 text-gray-700">Varies by complexity</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Broker Fee</td>
                          <td className="py-3 px-2">1%–2%</td>
                          <td className="py-3 px-2 text-gray-700">Buyer + seller split varies</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Notary & Registration</td>
                          <td className="py-3 px-2">₪2,000–₪5,000</td>
                          <td className="py-3 px-2 text-gray-700">Based on asset type</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Furnishings & Appliances</td>
                          <td className="py-3 px-2">₪20,000–₪50,000</td>
                          <td className="py-3 px-2 text-gray-700">Depends on condition</td>
                        </tr>
                        <tr className="border-b border-gray-100">
                          <td className="py-3 px-2 font-medium">Movers / Setup</td>
                          <td className="py-3 px-2">₪5,000–₪10,000</td>
                          <td className="py-3 px-2 text-gray-700">Within Israel</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>

              {/* Rent vs. Buy Analysis */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">🏠 Rent vs. Buy Analysis</h3>
                <p className="text-gray-700 mb-6">
                  5-year comparison showing total costs and equity implications:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">Metric</th>
                        <th className="text-center py-3 px-2">Rent</th>
                        <th className="text-center py-3 px-2">Buy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Total Outlay (5 years)</td>
                        <td className="text-center py-3 px-2">₪600,000</td>
                        <td className="text-center py-3 px-2">₪850,000</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Net Equity Gain</td>
                        <td className="text-center py-3 px-2">N/A</td>
                        <td className="text-center py-3 px-2">₪250,000</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Maintenance/Tax</td>
                        <td className="text-center py-3 px-2">₪0</td>
                        <td className="text-center py-3 px-2">₪80,000</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Liquidity Impact</td>
                        <td className="text-center py-3 px-2">🟢 High</td>
                        <td className="text-center py-3 px-2">🔴 Moderate</td>
                      </tr>
                      <tr className="border-b-2 border-gray-300 bg-gray-50">
                        <td className="py-3 px-2 font-bold">5-Year Result</td>
                        <td className="text-center py-3 px-2 font-bold">—</td>
                        <td className="text-center py-3 px-2 font-bold">6% higher cost but ownership equity</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mt-6 p-4 bg-blue-50 rounded-lg">
                  <strong>Interpretation:</strong> Your five-year projection shows homeownership becomes financially advantageous after approximately 6–7 years, assuming stable rates and 3% annual appreciation.
                </p>
              </Card>

              {/* 90-Day Action Plan */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">📅 90-Day Action Plan</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">Timeline</th>
                        <th className="text-left py-3 px-2">Key Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium whitespace-nowrap">0–30 Days (Plan)</td>
                        <td className="py-3 px-2 text-gray-700">Define target budget and 3 cities; review FX strategy; consult mortgage advisor</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium whitespace-nowrap">30–60 Days (Prepare)</td>
                        <td className="py-3 px-2 text-gray-700">Gather documentation, request pre-approval, identify agent, short-list properties</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium whitespace-nowrap">60–120 Days (Act)</td>
                        <td className="py-3 px-2 text-gray-700">Conduct viewings, compare lenders, finalize legal review, secure financing, and offer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Neighborhood Fit Recommendations */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">🗺️ Neighborhood Fit Recommendations</h3>
                <p className="text-gray-700 mb-4">
                  Based on your responses and budget, here are communities that may fit your needs:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">Community</th>
                        <th className="text-left py-3 px-2">Avg Rent</th>
                        <th className="text-left py-3 px-2">Avg Buy Price</th>
                        <th className="text-left py-3 px-2">Anglo Presence</th>
                        <th className="text-center py-3 px-2">Fit</th>
                        <th className="text-left py-3 px-2">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Beit Shemesh</td>
                        <td className="py-3 px-2">₪10,400</td>
                        <td className="py-3 px-2">₪2.6M</td>
                        <td className="py-3 px-2">High</td>
                        <td className="text-center py-3 px-2 text-2xl">🟢</td>
                        <td className="py-3 px-2 text-gray-700">Affordable family-friendly</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Modi'in</td>
                        <td className="py-3 px-2">₪11,800</td>
                        <td className="py-3 px-2">₪3.2M</td>
                        <td className="py-3 px-2">Moderate</td>
                        <td className="text-center py-3 px-2 text-2xl">🟡</td>
                        <td className="py-3 px-2 text-gray-700">High quality, tighter budget</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium">Rehovot</td>
                        <td className="py-3 px-2">₪8,600</td>
                        <td className="py-3 px-2">₪2.3M</td>
                        <td className="py-3 px-2">Moderate</td>
                        <td className="text-center py-3 px-2 text-2xl">🟢</td>
                        <td className="py-3 px-2 text-gray-700">Balanced access and cost</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Professional Resources */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">🤝 Professional Resources & Referrals</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-2">Real Estate Agents</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Anglo-Israel Realty</li>
                      <li>• Modiin Homes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-2">Mortgage Brokers</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• First Israel Mortgages</li>
                      <li>• Mashkanta Center</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-2">Lawyers</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• Adv. Shira Harari</li>
                      <li>• Adv. Eli Gabai</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-primary mb-2">Accountants</h4>
                    <ul className="space-y-1 text-gray-700">
                      <li>• CPA Michael Goldberg</li>
                      <li>• CPA Ayala Cohen</li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Assumptions & Notes */}
              <Card className="p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-primary mb-3">Assumptions & Notes</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Calculations based on market data from Madlan, Yad2, CBS, and public averages (Q1 2025)</li>
                  <li>• USD/ILS rate: 3.65</li>
                  <li>• Mortgage modeled at 3.5% fixed 25-year term</li>
                  <li>• Actual rates and exemptions may vary</li>
                </ul>
              </Card>

              {/* CTA */}
              <Card className="p-8 bg-gold-500 text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">Ready to discuss your results?</h3>
                <p className="text-black mb-6">Our cross-border financial advisors can help you create a personalized action plan and address your specific gaps.</p>
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-primary text-white hover:bg-navy-700 px-8 py-6 text-lg"
                >
                  📅 Book an Appointment
                </Button>
              </Card>

              {/* Take Again Button */}
              <div className="text-center">
                <Button 
                  onClick={handleRestart}
                  variant="outline"
                  className="px-8 py-3 border-gold-500 text-primary hover:bg-gold-50"
                >
                  Take Assessment Again
                </Button>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-gray-600 text-center">
                This assessment provides general educational information only and does not constitute financial, tax, legal, or investment advice. 
                For personalized guidance, please consult with our licensed advisors.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Questionnaire View
  const questionsByCategory = {
    "💰 Financial Capacity": responses.filter(q => q.category === "Financial Capacity"),
    "📋 Mortgage & Documentation": responses.filter(q => q.category === "Mortgage & Documentation"),
    "🏘️ Market Fit & Affordability": responses.filter(q => q.category === "Market Fit & Affordability"),
    "🏠 Property Readiness": responses.filter(q => q.category === "Property Readiness"),
    "⚙️ Logistics & Lifecycle": responses.filter(q => q.category === "Logistics & Lifecycle"),
  };

  return (
    <Layout hideBuddy={true}>
      {/* Header Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-4">
              Am I Ready to Buy a House?
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Assess your rent vs. buy readiness and long-term housing stability in Israel.
            </p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/real-estate-readiness')}
                className="text-white/90 hover:text-white underline"
              >
                ← Back to Real Estate Readiness
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Questionnaire Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 sm:p-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                <p className="text-lg font-bold text-gray-900 leading-relaxed">
                  Rate each statement from 0 (Strongly Disagree) to 10 (Strongly Agree). Your responses will generate a personalized readiness report.
                </p>
              </div>

              <div className="space-y-8">
                {Object.entries(questionsByCategory).map(([categoryName, questions]) => (
                  <div key={categoryName}>
                    <h3 className="text-xl font-bold text-primary mb-4 pb-2 border-b-2 border-gray-200">
                      {categoryName}
                    </h3>
                    <div className="space-y-4">
                      {questions.map((question) => (
                        <div key={question.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
                          <label className="text-base font-semibold text-gray-900 mb-3 block">
                            {question.id}. {question.text}
                          </label>
                          <div className="space-y-2">
                            <Slider
                              value={[question.value]}
                              onValueChange={(value) => handleSliderChange(question.id, value)}
                              min={0}
                              max={10}
                              step={1}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-gray-500 px-1">
                              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <span key={num} className="w-4 text-center">{num}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button 
                  onClick={handleSubmit}
                  className="bg-primary text-white hover:bg-navy-700 px-12 py-6 text-lg"
                >
                  View My Results & Recommendations
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AmIReadyToBuy;

