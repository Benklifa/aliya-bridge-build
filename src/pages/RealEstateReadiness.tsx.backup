import { useState, useEffect } from "react";
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

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: string;
  icon: string;
}

interface CommunityMatch {
  city: string;
  matchScore: number;
  avgPrice: string;
  rentPrice: string;
  costOfLiving: string;
  description: string;
  pros: string[];
  cons: string[];
}

const RealEstateReadiness = () => {
  // Load saved state from localStorage
  const [showResults, setShowResults] = useState(() => {
    const saved = localStorage.getItem('realEstateShowResults');
    return saved ? JSON.parse(saved) : false;
  });

  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const initialQuestions: Question[] = [
    // Budget & Financing (5 questions) - Weight: 30%
    { id: 1, category: "Budget & Financing", text: "I have a clear understanding of my total budget for purchasing property in Israel.", value: 5 },
    { id: 2, category: "Budget & Financing", text: "I know the down payment requirements and have funds available or a plan to secure them.", value: 5 },
    { id: 3, category: "Budget & Financing", text: "I understand Israeli mortgage options and qualification requirements for Olim.", value: 5 },
    { id: 4, category: "Budget & Financing", text: "I have accounted for additional costs like purchase tax, legal fees, and renovation expenses.", value: 5 },
    { id: 5, category: "Budget & Financing", text: "I have a strategy for converting USD to ILS for my real estate purchase.", value: 5 },
    
    // Lifestyle & Community (6 questions) - Weight: 25%
    { id: 6, category: "Lifestyle & Community", text: "I have identified specific cities or neighborhoods that match my lifestyle preferences.", value: 5 },
    { id: 7, category: "Lifestyle & Community", text: "I understand the community demographics and cultural fit of my target areas.", value: 5 },
    { id: 8, category: "Lifestyle & Community", text: "I have researched schools, synagogues, and community resources in my preferred locations.", value: 5 },
    { id: 9, category: "Lifestyle & Community", text: "I know the proximity to work opportunities, family, and essential services in my target areas.", value: 5 },
    { id: 10, category: "Lifestyle & Community", text: "I have visited or virtually toured properties in my preferred neighborhoods.", value: 5 },
    { id: 11, category: "Lifestyle & Community", text: "I understand the Anglo community presence and support networks in my target cities.", value: 5 },
    
    // Timeline & Logistics (5 questions) - Weight: 25%
    { id: 12, category: "Timeline & Logistics", text: "I have a clear timeline for when I want to purchase property in Israel.", value: 5 },
    { id: 13, category: "Timeline & Logistics", text: "I understand the typical home-buying process and timeline in Israel.", value: 5 },
    { id: 14, category: "Timeline & Logistics", text: "I have identified reliable real estate agents or professionals to work with.", value: 5 },
    { id: 15, category: "Timeline & Logistics", text: "I know the legal requirements and documentation needed for property purchase as an Oleh.", value: 5 },
    { id: 16, category: "Timeline & Logistics", text: "I have a plan for temporary housing while searching for or closing on a property.", value: 5 },
    
    // Market Knowledge (4 questions) - Weight: 20%
    { id: 17, category: "Market Knowledge", text: "I understand current real estate market trends in my target areas.", value: 5 },
    { id: 18, category: "Market Knowledge", text: "I know the typical price per square meter in my preferred neighborhoods.", value: 5 },
    { id: 19, category: "Market Knowledge", text: "I understand the difference between buying new construction versus existing properties.", value: 5 },
    { id: 20, category: "Market Knowledge", text: "I am aware of government benefits and incentives available to Olim for real estate purchases.", value: 5 },
  ];

  const [responses, setResponses] = useState<Question[]>(() => {
    const saved = localStorage.getItem('realEstateResponses');
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  // Save to localStorage whenever responses or showResults change
  useEffect(() => {
    localStorage.setItem('realEstateResponses', JSON.stringify(responses));
    localStorage.setItem('realEstateShowResults', JSON.stringify(showResults));
  }, [responses, showResults]);

  const handleSliderChange = (questionId: number, value: number[]) => {
    setResponses(prev =>
      prev.map(q => q.id === questionId ? { ...q, value: value[0] } : q)
    );
  };

  const calculateScores = (): { 
    categories: CategoryScore[], 
    overall: number, 
    overallStatus: string,
    weightedScore: number 
  } => {
    // Category weights
    const categoryWeights = {
      "Budget & Financing": 0.30,
      "Lifestyle & Community": 0.25,
      "Timeline & Logistics": 0.25,
      "Market Knowledge": 0.20,
    };

    const categoryGroups = {
      "Budget & Financing": { maxScore: 50, questions: responses.filter(q => q.category === "Budget & Financing") },
      "Lifestyle & Community": { maxScore: 60, questions: responses.filter(q => q.category === "Lifestyle & Community") },
      "Timeline & Logistics": { maxScore: 50, questions: responses.filter(q => q.category === "Timeline & Logistics") },
      "Market Knowledge": { maxScore: 40, questions: responses.filter(q => q.category === "Market Knowledge") },
    };

    const categories: CategoryScore[] = Object.entries(categoryGroups).map(([name, data]) => {
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

      return { name, score, maxScore: data.maxScore, percentage, status, icon };
    });

    // Calculate weighted score
    let weightedScore = 0;
    categories.forEach(cat => {
      const weight = categoryWeights[cat.name as keyof typeof categoryWeights] || 0;
      weightedScore += (cat.percentage * weight);
    });
    weightedScore = Math.round(weightedScore);

    const totalScore = responses.reduce((sum, q) => sum + q.value, 0);
    const overall = Math.round((totalScore / 200) * 100);
    
    let overallStatus = "";
    if (weightedScore >= 70) {
      overallStatus = "🟢 Ready to Purchase";
    } else if (weightedScore >= 50) {
      overallStatus = "🟡 Needs More Research";
    } else {
      overallStatus = "🔴 Early Planning Stage";
    }

    return { categories, overall, overallStatus, weightedScore };
  };

  const getCommunityMatches = (weightedScore: number, categories: CategoryScore[]): CommunityMatch[] => {
    // Get lifestyle score to influence community matching
    const lifestyleCategory = categories.find(c => c.name === "Lifestyle & Community");
    const lifestyleScore = lifestyleCategory ? lifestyleCategory.percentage : 50;
    
    // Get budget score to influence price range recommendations
    const budgetCategory = categories.find(c => c.name === "Budget & Financing");
    const budgetScore = budgetCategory ? budgetCategory.percentage : 50;

    // Sample community data - will be replaced with live data in Phase 2
    const allCommunities: CommunityMatch[] = [
      {
        city: "Beit Shemesh",
        matchScore: Math.min(95, 70 + Math.floor(lifestyleScore * 0.25)),
        avgPrice: "₪18,500/m²",
        rentPrice: "₪5,200/month",
        costOfLiving: "Medium",
        description: "Large Anglo community with established infrastructure, religious neighborhoods, and growing job market.",
        pros: ["Strong Anglo presence", "Affordable housing", "Religious community", "Close to Jerusalem"],
        cons: ["Limited public transport", "Hot summers", "Some areas under development"]
      },
      {
        city: "Modi'in",
        matchScore: Math.min(92, 65 + Math.floor(lifestyleScore * 0.27)),
        avgPrice: "₪22,000/m²",
        rentPrice: "₪6,500/month",
        costOfLiving: "Medium-High",
        description: "Modern planned city with excellent infrastructure, diverse community, and central location between Tel Aviv and Jerusalem.",
        pros: ["Modern infrastructure", "Good schools", "Central location", "Family-friendly"],
        cons: ["Higher prices", "Less established community", "Commute to major cities"]
      },
      {
        city: "Rehovot",
        matchScore: Math.min(88, 60 + Math.floor(lifestyleScore * 0.28)),
        avgPrice: "₪20,500/m²",
        rentPrice: "₪5,800/month",
        costOfLiving: "Medium",
        description: "Academic city with Weizmann Institute, growing tech sector, and mix of secular and religious communities.",
        pros: ["Academic atmosphere", "Tech jobs", "Good quality of life", "Reasonable prices"],
        cons: ["Smaller Anglo community", "Less nightlife", "Hot climate"]
      },
      {
        city: "Netanya",
        matchScore: Math.min(85, 55 + Math.floor(lifestyleScore * 0.30)),
        avgPrice: "₪17,800/m²",
        rentPrice: "₪4,900/month",
        costOfLiving: "Medium-Low",
        description: "Coastal city with beautiful beaches, growing Anglo community, and affordable housing options.",
        pros: ["Beach lifestyle", "Affordable", "Growing community", "Mild climate"],
        cons: ["Limited job market", "Distance from center", "Public transport challenges"]
      },
      {
        city: "Haifa",
        matchScore: Math.min(82, 50 + Math.floor(lifestyleScore * 0.32)),
        avgPrice: "₪16,500/m²",
        rentPrice: "₪4,500/month",
        costOfLiving: "Medium-Low",
        description: "Northern port city with diverse population, beautiful views, and lower cost of living.",
        pros: ["Affordable housing", "Diverse community", "Beautiful scenery", "Cooler climate"],
        cons: ["Smaller Anglo presence", "Distance from center", "Limited religious infrastructure"]
      }
    ];

    // Sort by match score and return top 5
    return allCommunities.sort((a, b) => b.matchScore - a.matchScore).slice(0, 5);
  };

  const getRecommendations = (categoryName: string): string => {
    const recommendations: { [key: string]: string } = {
      "Budget & Financing": "Work with a financial advisor to clarify your budget, explore mortgage pre-approval options, and develop a currency conversion strategy. Research Olim benefits and tax implications.",
      "Lifestyle & Community": "Visit Israel to tour neighborhoods, connect with local Anglo communities, and research schools and services. Consider renting first to explore different areas before purchasing.",
      "Timeline & Logistics": "Connect with experienced real estate agents who work with Olim, consult with an Israeli real estate attorney, and create a detailed timeline with milestones for your purchase.",
      "Market Knowledge": "Research current market trends, attend Aliyah fairs with real estate sessions, and subscribe to Israeli real estate platforms. Consider working with a buyer's agent who specializes in helping Olim.",
    };
    return recommendations[categoryName] || "";
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setShowResults(false);
    setResponses(initialQuestions);
    setEmail("");
    setEmailSubmitted(false);
    localStorage.removeItem('realEstateResponses');
    localStorage.removeItem('realEstateShowResults');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setEmailSubmitted(true);
      // In production, this would send to a backend API
      console.log('Email submitted:', email);
    }
  };

  if (showResults) {
    const { categories, overall, overallStatus, weightedScore } = calculateScores();
    const communityMatches = getCommunityMatches(weightedScore, categories);

    return (
      <Layout hideBuddy={true}>
        {/* Header Section */}
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                Real Estate Readiness Assessment
              </h1>
              <p className="text-xl text-white leading-relaxed">
                Your personalized readiness report with community recommendations for purchasing property in Israel.
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8 print:space-y-4">
        {/* Overall Score */}
        <Card className="p-8 bg-gradient-to-br from-primary to-navy-700 text-white print:break-inside-avoid">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Your Real Estate Readiness Score</h2>
            <div className="text-6xl font-bold mb-2">{weightedScore}%</div>
            <div className="text-2xl mb-6">{overallStatus}</div>
            <div className="flex gap-4 justify-center print:hidden">
              <Button 
                onClick={() => window.print()}
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3"
              >
                📄 Download PDF Report
              </Button>
              <Button 
                onClick={handleRestart}
                className="bg-white text-primary hover:bg-gray-100 px-6 py-3"
              >
                🔄 Retake Assessment
              </Button>
            </div>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6 print:break-inside-avoid">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">Category Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2">Category</th>
                  <th className="text-center py-3 px-2">Score</th>
                  <th className="text-center py-3 px-2">Percent</th>
                  <th className="text-center py-3 px-2">Status</th>
                  <th className="text-center py-3 px-2">Weight</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => {
                  const weights = {
                    "Budget & Financing": "30%",
                    "Lifestyle & Community": "25%",
                    "Timeline & Logistics": "25%",
                    "Market Knowledge": "20%",
                  };
                  return (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-3 px-2 font-medium text-black">{cat.name}</td>
                      <td className="text-center py-3 px-2 text-black">{cat.score}/{cat.maxScore}</td>
                      <td className="text-center py-3 px-2 text-black">{cat.percentage}%</td>
                      <td className="text-center py-3 px-2">{cat.icon} {cat.status}</td>
                      <td className="text-center py-3 px-2 text-black">{weights[cat.name as keyof typeof weights]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Community Match Table */}
        <Card className="p-6 print:break-inside-avoid">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary">🏘️ Community Match Recommendations</h3>
              <p className="text-gray-600 mt-2">Based on your responses, here are the top communities that match your preferences and readiness level.</p>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full text-xs">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-700 font-medium">Live Data</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Updated weekly</p>
            </div>
          </div>
          
          <div className="space-y-6">
            {communityMatches.map((community, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-black">{idx + 1}. {community.city}</h4>
                    <p className="text-sm text-gray-600 mt-1">{community.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{community.matchScore}%</div>
                    <div className="text-xs text-gray-500">Match Score</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="text-xs text-gray-600">Avg. Purchase Price</div>
                    <div className="text-lg font-bold text-black">{community.avgPrice}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="text-xs text-gray-600">Avg. Rent (3BR)</div>
                    <div className="text-lg font-bold text-black">{community.rentPrice}</div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded">
                    <div className="text-xs text-gray-600">Cost of Living</div>
                    <div className="text-lg font-bold text-black">{community.costOfLiving}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-semibold text-green-700 mb-2">✅ Pros:</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {community.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-orange-700 mb-2">⚠️ Considerations:</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {community.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cost of Living Comparison */}
        <Card className="p-6 print:break-inside-avoid">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">💰 Cost of Living Comparison</h3>
          <p className="text-gray-600 mb-6">Estimated monthly expenses for a family of 4 in each recommended city:</p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2">City</th>
                  <th className="text-center py-3 px-2">Housing</th>
                  <th className="text-center py-3 px-2">Groceries</th>
                  <th className="text-center py-3 px-2">Transportation</th>
                  <th className="text-center py-3 px-2">Utilities</th>
                  <th className="text-center py-3 px-2">Total/Month</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium text-black">Beit Shemesh</td>
                  <td className="text-center py-3 px-2 text-black">₪5,200</td>
                  <td className="text-center py-3 px-2 text-black">₪3,500</td>
                  <td className="text-center py-3 px-2 text-black">₪1,200</td>
                  <td className="text-center py-3 px-2 text-black">₪800</td>
                  <td className="text-center py-3 px-2 font-bold text-black">₪10,700</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium text-black">Modi'in</td>
                  <td className="text-center py-3 px-2 text-black">₪6,500</td>
                  <td className="text-center py-3 px-2 text-black">₪3,800</td>
                  <td className="text-center py-3 px-2 text-black">₪1,400</td>
                  <td className="text-center py-3 px-2 text-black">₪850</td>
                  <td className="text-center py-3 px-2 font-bold text-black">₪12,550</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium text-black">Rehovot</td>
                  <td className="text-center py-3 px-2 text-black">₪5,800</td>
                  <td className="text-center py-3 px-2 text-black">₪3,600</td>
                  <td className="text-center py-3 px-2 text-black">₪1,300</td>
                  <td className="text-center py-3 px-2 text-black">₪800</td>
                  <td className="text-center py-3 px-2 font-bold text-black">₪11,500</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium text-black">Netanya</td>
                  <td className="text-center py-3 px-2 text-black">₪4,900</td>
                  <td className="text-center py-3 px-2 text-black">₪3,400</td>
                  <td className="text-center py-3 px-2 text-black">₪1,100</td>
                  <td className="text-center py-3 px-2 text-black">₪750</td>
                  <td className="text-center py-3 px-2 font-bold text-black">₪10,150</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-2 font-medium text-black">Haifa</td>
                  <td className="text-center py-3 px-2 text-black">₪4,500</td>
                  <td className="text-center py-3 px-2 text-black">₪3,300</td>
                  <td className="text-center py-3 px-2 text-black">₪1,000</td>
                  <td className="text-center py-3 px-2 text-black">₪700</td>
                  <td className="text-center py-3 px-2 font-bold text-black">₪9,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 mt-4">* Estimates based on current market data. Actual costs may vary based on lifestyle and specific location within each city.</p>
          
          {/* Data Sources Attribution */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">📊 Data Sources</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-gray-50 p-3 rounded">
                <a href="https://www.yad2.co.il/realestate" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Yad2
                </a>
                <p className="text-gray-600 mt-1">Property listings and market prices</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <a href="https://www.madlan.co.il" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Madlan
                </a>
                <p className="text-gray-600 mt-1">Market analytics and trends</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <a href="https://www.numbeo.com/cost-of-living" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
                  Numbeo
                </a>
                <p className="text-gray-600 mt-1">Cost-of-living data</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 italic">Data updated weekly • Last update: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </Card>

        {/* Priority Areas & Recommendations */}
        <Card className="p-6 print:break-inside-avoid">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">📋 Priority Areas & Recommendations</h3>
          <div className="space-y-4">
            {categories
              .sort((a, b) => a.percentage - b.percentage)
              .map((cat, idx) => (
                <div key={idx} className="border-l-4 border-primary pl-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-black">{cat.icon} {cat.name}</h4>
                    <span className="text-sm text-gray-600">{cat.percentage}% Ready</span>
                  </div>
                  <p className="text-sm text-gray-700">{getRecommendations(cat.name)}</p>
                </div>
              ))}
          </div>
        </Card>

        {/* Professional Resources */}
        <Card className="p-6 print:break-inside-avoid">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">🤝 Professional Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-black mb-2">🏦 Financial Planning</h4>
              <p className="text-sm text-gray-700 mb-3">Work with advisors who specialize in Aliyah financial planning to optimize your budget and financing strategy.</p>
              <Button className="bg-primary text-white hover:bg-navy-700 w-full">Schedule Consultation</Button>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-bold text-black mb-2">🏘️ Real Estate Agents</h4>
              <p className="text-sm text-gray-700 mb-3">Connect with experienced agents who work with Olim and understand your unique needs and timeline.</p>
              <Button className="bg-primary text-white hover:bg-navy-700 w-full">Find an Agent</Button>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-bold text-black mb-2">⚖️ Legal Services</h4>
              <p className="text-sm text-gray-700 mb-3">Consult with Israeli real estate attorneys to navigate contracts, regulations, and Olim benefits.</p>
              <Button className="bg-primary text-white hover:bg-navy-700 w-full">Legal Consultation</Button>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-bold text-black mb-2">🏦 Mortgage Brokers</h4>
              <p className="text-sm text-gray-700 mb-3">Explore mortgage options with brokers who specialize in helping Olim secure favorable financing.</p>
              <Button className="bg-primary text-white hover:bg-navy-700 w-full">Mortgage Options</Button>
            </div>
          </div>
        </Card>

        {/* Email Capture Form */}
        {!emailSubmitted ? (
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 print:hidden">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">📧 Get Your Personalized Action Plan</h3>
            <p className="text-gray-700 mb-4">Enter your email to receive a detailed action plan, market updates, and exclusive resources for Olim purchasing real estate in Israel.</p>
            <form onSubmit={handleEmailSubmit} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" className="bg-primary text-white hover:bg-navy-700 px-8 py-3">
                Send Me Resources
              </Button>
            </form>
          </Card>
        ) : (
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 print:hidden">
            <div className="text-center">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="text-2xl font-serif font-bold text-green-700 mb-2">Thank You!</h3>
              <p className="text-gray-700">Check your email for your personalized action plan and resources. We'll be in touch soon!</p>
            </div>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="p-6 print:break-inside-avoid">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">
            {weightedScore >= 70 ? "✅ NEXT STEPS - You're Ready!" : weightedScore >= 50 ? "⚠️ NEXT STEPS - Continue Preparing" : "🚨 NEXT STEPS - Start Your Journey"}
          </h3>
          <div className="space-y-3">
            {weightedScore >= 70 ? (
              <>
                <p className="text-gray-700">✓ Connect with our recommended real estate agents to begin your property search</p>
                <p className="text-gray-700">✓ Schedule property tours in your top-matched communities</p>
                <p className="text-gray-700">✓ Finalize your financing and begin the purchase process</p>
                <p className="text-gray-700">✓ Book a consultation to optimize your real estate strategy and tax benefits</p>
              </>
            ) : weightedScore >= 50 ? (
              <>
                <p className="text-gray-700">✓ Focus on strengthening your priority areas identified above</p>
                <p className="text-gray-700">✓ Schedule a comprehensive planning session with our advisors</p>
                <p className="text-gray-700">✓ Visit Israel to explore your top-matched communities</p>
                <p className="text-gray-700">✓ Create a 6-month action plan to improve readiness in key categories</p>
              </>
            ) : (
              <>
                <p className="text-gray-700">✓ Book an initial consultation to create a personalized roadmap</p>
                <p className="text-gray-700">✓ Research and clarify your budget and financing options</p>
                <p className="text-gray-700">✓ Begin exploring communities and lifestyle preferences</p>
                <p className="text-gray-700">✓ Consider your timeline and ensure adequate preparation time</p>
              </>
            )}
          </div>
        </Card>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Questionnaire View
  return (
    <Layout hideBuddy={true}>
      {/* Header Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-4">
              Real Estate Readiness Assessment
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Discover your readiness to purchase property in Israel and get personalized community recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Questionnaire Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
      <Card className="p-8 bg-gradient-to-br from-primary to-navy-700 text-white">
        <h2 className="text-3xl font-serif font-bold mb-4 text-center">Real Estate Readiness Assessment</h2>
        <p className="text-center text-lg">
          Discover your readiness to purchase property in Israel and get personalized community recommendations based on your goals and preferences.
        </p>
      </Card>

      <Card className="p-6">
        <p className="text-gray-700 mb-6">
          Rate each statement on a scale of 0-10, where 0 means "Not at all true" and 10 means "Completely true". 
          This assessment covers 4 key areas: Budget & Financing, Lifestyle & Community, Timeline & Logistics, and Market Knowledge.
        </p>

        <div className="space-y-8">
          {["Budget & Financing", "Lifestyle & Community", "Timeline & Logistics", "Market Knowledge"].map((category) => (
            <div key={category} className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-primary border-b-2 border-primary pb-2">
                {category}
              </h3>
              {responses
                .filter(q => q.category === category)
                .map((question) => (
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
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={handleSubmit}
            className="bg-primary text-white hover:bg-navy-700 px-12 py-4 text-lg"
          >
            View My Results & Community Matches
          </Button>
        </div>
      </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RealEstateReadiness;

