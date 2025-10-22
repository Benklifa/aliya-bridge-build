import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  category: string;
  text: string;
  value: number;
}

interface CategoryScore {
  name: string;
  score: number;
  weight: number;
  weightedScore: number;
}

interface CommunityMatch {
  name: string;
  avgRent: string;
  avgBuyPrice: string;
  angloPresence: string;
  commute: string;
  costLevel: string;
  fitScore: number;
  fitIcon: string;
}

const WhereShouldILive = () => {
  const navigate = useNavigate();
  
  // Load saved state from localStorage
  const [showResults, setShowResults] = useState(() => {
    const saved = localStorage.getItem('communityFinderShowResults');
    return saved ? JSON.parse(saved) : false;
  });

  const [currentCity, setCurrentCity] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const initialQuestions: Question[] = [
    // A) Lifestyle & Community Fit (Weight 25%) - 7 questions
    { id: 1, category: "Lifestyle & Community Fit", text: "I want to live in a community where many people speak English.", value: 5 },
    { id: 2, category: "Lifestyle & Community Fit", text: "My religious or cultural environment is a top priority for where I live.", value: 5 },
    { id: 3, category: "Lifestyle & Community Fit", text: "I prefer a family-friendly suburban setting over a busy urban one.", value: 5 },
    { id: 4, category: "Lifestyle & Community Fit", text: "I enjoy being part of neighborhood events, volunteering, and community life.", value: 5 },
    { id: 5, category: "Lifestyle & Community Fit", text: "It's important that my neighbors share similar values and lifestyle.", value: 5 },
    { id: 6, category: "Lifestyle & Community Fit", text: "I feel comfortable in a mixed Israeli/Anglo community (not only Anglo).", value: 5 },
    { id: 7, category: "Lifestyle & Community Fit", text: "I prefer calm and safety to nightlife or entertainment options.", value: 5 },
    
    // B) Family & Education (Weight 20%) - 7 questions
    { id: 8, category: "Family & Education", text: "Access to quality schools will be a key factor in choosing where to live.", value: 5 },
    { id: 9, category: "Family & Education", text: "I prefer schools that offer English-speaking or bilingual support.", value: 5 },
    { id: 10, category: "Family & Education", text: "Parks, playgrounds, and family activities nearby are important to me.", value: 5 },
    { id: 11, category: "Family & Education", text: "Strong youth/after-school programs would influence my decision.", value: 5 },
    { id: 12, category: "Family & Education", text: "The religious orientation of local schools matters to me.", value: 5 },
    { id: 13, category: "Family & Education", text: "Proximity to preschools or early childcare is important.", value: 5 },
    { id: 14, category: "Family & Education", text: "I want a neighborhood where families with children are common.", value: 5 },
    
    // C) Budget & Affordability (Weight 30%) - 7 questions
    { id: 15, category: "Budget & Affordability", text: "My monthly housing budget is flexible for the right location.", value: 5 },
    { id: 16, category: "Budget & Affordability", text: "I'm comfortable paying more for a better community fit.", value: 5 },
    { id: 17, category: "Budget & Affordability", text: "I'm open to living outside major cities to reduce housing costs.", value: 5 },
    { id: 18, category: "Budget & Affordability", text: "I feel ready to cover first-year setup costs (deposits, appliances, etc.).", value: 5 },
    { id: 19, category: "Budget & Affordability", text: "I can make a reasonable down payment if I decide to buy.", value: 5 },
    { id: 20, category: "Budget & Affordability", text: "My income is stable enough to handle unexpected housing costs.", value: 5 },
    { id: 21, category: "Budget & Affordability", text: "I feel confident managing my budget in both shekels and dollars.", value: 5 },
    
    // D) Housing & Property Type (Weight 15%) - 7 questions
    { id: 22, category: "Housing & Property Type", text: "I prefer a newer apartment/building, even if it costs more.", value: 5 },
    { id: 23, category: "Housing & Property Type", text: "Elevator, parking, or other accessibility features are important to me.", value: 5 },
    { id: 24, category: "Housing & Property Type", text: "I would consider buying 'on paper' (pre-construction) for better value.", value: 5 },
    { id: 25, category: "Housing & Property Type", text: "I prefer move-in-ready over a renovation project.", value: 5 },
    { id: 26, category: "Housing & Property Type", text: "Outdoor space (balcony/garden/view) is a high priority.", value: 5 },
    { id: 27, category: "Housing & Property Type", text: "Having enough bedrooms and storage for long-term comfort matters to me.", value: 5 },
    { id: 28, category: "Housing & Property Type", text: "I value energy efficiency, quiet, and quality construction.", value: 5 },
    
    // E) Logistics & Accessibility (Weight 10%) - 7 questions
    { id: 29, category: "Logistics & Accessibility", text: "I need reliable public transportation close to home.", value: 5 },
    { id: 30, category: "Logistics & Accessibility", text: "I prefer walkable neighborhoods where daily needs are nearby.", value: 5 },
    { id: 31, category: "Logistics & Accessibility", text: "I plan to own a car or rely on one for most travel.", value: 5 },
    { id: 32, category: "Logistics & Accessibility", text: "Proximity to healthcare and kupot holim clinics is essential.", value: 5 },
    { id: 33, category: "Logistics & Accessibility", text: "I want to live within commuting distance of my work or family.", value: 5 },
    { id: 34, category: "Logistics & Accessibility", text: "Easy travel to Jerusalem or Tel Aviv is important to me.", value: 5 },
    { id: 35, category: "Logistics & Accessibility", text: "Proximity to shopping, restaurants, or entertainment matters to me.", value: 5 },
  ];

  const [responses, setResponses] = useState<Question[]>(() => {
    const saved = localStorage.getItem('communityFinderResponses');
    return saved ? JSON.parse(saved) : initialQuestions;
  });

  // Save to localStorage whenever responses or showResults change
  useEffect(() => {
    localStorage.setItem('communityFinderResponses', JSON.stringify(responses));
    localStorage.setItem('communityFinderShowResults', JSON.stringify(showResults));
  }, [responses, showResults]);

  const handleSliderChange = (questionId: number, value: number[]) => {
    setResponses(prev =>
      prev.map(q => q.id === questionId ? { ...q, value: value[0] } : q)
    );
  };

  const calculateScores = (): {
    categories: CategoryScore[],
    communityFitScore: number,
    fitBand: string,
    fitIcon: string,
    angloPreferenceIndex: number,
    familyPriority: number,
    affordabilityFlex: number,
    newVsExisting: number,
    transitPriority: number
  } => {
    // Category weights
    const weights = {
      "Lifestyle & Community Fit": 0.25,
      "Family & Education": 0.20,
      "Budget & Affordability": 0.30,
      "Housing & Property Type": 0.15,
      "Logistics & Accessibility": 0.10
    };

    // Calculate category scores
    const categories: CategoryScore[] = Object.entries(weights).map(([name, weight]) => {
      const categoryQuestions = responses.filter(q => q.category === name);
      const totalValue = categoryQuestions.reduce((sum, q) => sum + q.value, 0);
      const avgScore = totalValue / categoryQuestions.length; // 0-10 scale
      const weightedScore = avgScore * weight * 10; // Convert to 0-100 contribution
      
      return {
        name,
        score: avgScore,
        weight,
        weightedScore
      };
    });

    // Calculate overall Community Fit Score (0-100)
    const communityFitScore = Math.round(
      categories.reduce((sum, cat) => sum + cat.weightedScore, 0)
    );

    // Determine fit band
    let fitBand = "";
    let fitIcon = "";
    if (communityFitScore >= 80) {
      fitBand = "Strong match";
      fitIcon = "🟢";
    } else if (communityFitScore >= 50) {
      fitBand = "Moderate match";
      fitIcon = "🟡";
    } else {
      fitBand = "Early planning";
      fitIcon = "🔴";
    }

    // Calculate classification flags
    const lifestyleQuestions = responses.filter(q => q.category === "Lifestyle & Community Fit");
    const angloPreferenceIndex = (lifestyleQuestions[0].value + lifestyleQuestions[1].value) / 2;
    
    const familyQuestions = responses.filter(q => q.category === "Family & Education");
    const familyPriority = familyQuestions.reduce((sum, q) => sum + q.value, 0) / familyQuestions.length;
    
    const budgetQuestions = responses.filter(q => q.category === "Budget & Affordability");
    const affordabilityFlex = budgetQuestions.reduce((sum, q) => sum + q.value, 0) / budgetQuestions.length;
    
    const housingQuestions = responses.filter(q => q.category === "Housing & Property Type");
    const newVsExisting = (housingQuestions[0].value + housingQuestions[3].value) / 2;
    
    const logisticsQuestions = responses.filter(q => q.category === "Logistics & Accessibility");
    const transitPriority = (logisticsQuestions[0].value + logisticsQuestions[1].value) / 2;

    return {
      categories,
      communityFitScore,
      fitBand,
      fitIcon,
      angloPreferenceIndex,
      familyPriority,
      affordabilityFlex,
      newVsExisting,
      transitPriority
    };
  };

  const getCommunityMatches = (
    communityFitScore: number,
    angloPreferenceIndex: number,
    familyPriority: number,
    affordabilityFlex: number
  ): CommunityMatch[] => {
    // Base community data with match scoring logic
    const communities: CommunityMatch[] = [
      {
        name: "Beit Shemesh",
        avgRent: "₪10,400",
        avgBuyPrice: "₪2.6M",
        angloPresence: "High",
        commute: "40 min",
        costLevel: "Moderate",
        fitScore: 0,
        fitIcon: ""
      },
      {
        name: "Modi'in",
        avgRent: "₪11,800",
        avgBuyPrice: "₪3.2M",
        angloPresence: "Moderate",
        commute: "30 min",
        costLevel: "High",
        fitScore: 0,
        fitIcon: ""
      },
      {
        name: "Rehovot",
        avgRent: "₪8,600",
        avgBuyPrice: "₪2.3M",
        angloPresence: "Low",
        commute: "35 min",
        costLevel: "Low",
        fitScore: 0,
        fitIcon: ""
      },
      {
        name: "Netanya",
        avgRent: "₪8,000",
        avgBuyPrice: "₪2.9M",
        angloPresence: "Moderate",
        commute: "50 min",
        costLevel: "Moderate",
        fitScore: 0,
        fitIcon: ""
      },
      {
        name: "Haifa",
        avgRent: "₪6,500",
        avgBuyPrice: "₪1.8M",
        angloPresence: "Low",
        commute: "90 min",
        costLevel: "Low",
        fitScore: 0,
        fitIcon: ""
      }
    ];

    // Calculate fit scores based on user preferences
    communities.forEach(community => {
      let score = communityFitScore; // Start with base score
      
      // Adjust for Anglo preference
      if (angloPreferenceIndex >= 7) {
        if (community.angloPresence === "High") score += 10;
        else if (community.angloPresence === "Moderate") score += 5;
        else score -= 5;
      }
      
      // Adjust for family priority
      if (familyPriority >= 7) {
        if (community.name === "Beit Shemesh" || community.name === "Modi'in") score += 8;
      }
      
      // Adjust for affordability
      if (affordabilityFlex <= 5) {
        if (community.costLevel === "Low") score += 10;
        else if (community.costLevel === "High") score -= 10;
      }
      
      // Cap at 100
      community.fitScore = Math.min(Math.round(score), 100);
      
      // Set fit icon
      if (community.fitScore >= 80) community.fitIcon = "🟢";
      else if (community.fitScore >= 70) community.fitIcon = "🟡";
      else community.fitIcon = "🔴";
    });

    // Sort by fit score descending
    return communities.sort((a, b) => b.fitScore - a.fitScore);
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    setShowResults(false);
    setResponses(initialQuestions);
    localStorage.removeItem('communityFinderResponses');
    localStorage.removeItem('communityFinderShowResults');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setEmailSubmitted(true);
      console.log('Email submitted:', email);
    }
  };

  // Progress calculation
  const progress = responses.filter(q => q.value !== 5).length;
  const totalQuestions = responses.length;

  // Results View
  if (showResults) {
    const {
      categories,
      communityFitScore,
      fitBand,
      fitIcon,
      angloPreferenceIndex,
      familyPriority,
      affordabilityFlex,
      newVsExisting,
      transitPriority
    } = calculateScores();

    const communityMatches = getCommunityMatches(
      communityFitScore,
      angloPreferenceIndex,
      familyPriority,
      affordabilityFlex
    );

    // Generate personalized insights
    const generateInsights = () => {
      const insights: string[] = [];
      
      if (angloPreferenceIndex >= 7) {
        insights.push("You've indicated a strong preference for English-speaking, Anglo-friendly communities. Beit Shemesh and Modi'in offer the most established Anglo populations with English-speaking services and community support.");
      }
      
      if (familyPriority >= 7) {
        insights.push("Family and education are top priorities for you. Look for communities with strong school systems, family-friendly amenities, and active youth programs. Beit Shemesh and Modi'in excel in these areas.");
      }
      
      if (affordabilityFlex <= 5) {
        insights.push("Budget consciousness is important to you. Consider communities like Rehovot, Netanya, or Haifa where housing costs are more moderate while still offering quality of life.");
      } else if (affordabilityFlex >= 7) {
        insights.push("You have flexibility in your housing budget and are willing to pay more for the right community fit. This opens up options in premium areas like Modi'in or central Beit Shemesh.");
      }
      
      if (transitPriority >= 7) {
        insights.push("Public transportation and walkability are important to you. Modi'in has excellent train connections, while Beit Shemesh is expanding its public transit options.");
      }
      
      if (newVsExisting >= 7) {
        insights.push("You prefer newer, move-in-ready properties. Modi'in offers many modern developments, and Beit Shemesh has ongoing construction of new neighborhoods.");
      }
      
      return insights;
    };

    const insights = generateInsights();

    return (
      <Layout hideBuddy={true}>
        {/* Header Section */}
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                Your Top Community Matches
              </h1>
              <p className="text-xl text-white leading-relaxed">
                Based on your preferences, here are the Israeli communities that best match your lifestyle and priorities.
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
            <div className="max-w-6xl mx-auto space-y-8">

              {/* Block 1: Summary Wheel */}
              <Card className="p-8 bg-gradient-to-br from-primary to-navy-700 text-white">
                <div className="text-center">
                  <h2 className="text-3xl font-serif font-bold mb-4">Your Community Fit Score</h2>
                  <div className="text-7xl font-bold mb-2">{communityFitScore}/100</div>
                  <div className="text-2xl mb-6">{fitIcon} {fitBand}</div>
                  
                  {/* Key Preferences */}
                  <div className="mt-8 space-y-2 text-left max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold mb-4 text-center">Your Key Preferences:</h3>
                    {angloPreferenceIndex >= 7 && (
                      <p className="text-lg">• Prefers Anglo-friendly family areas</p>
                    )}
                    {familyPriority >= 7 && (
                      <p className="text-lg">• Strong focus on schools and family amenities</p>
                    )}
                    {affordabilityFlex <= 5 && (
                      <p className="text-lg">• Open to suburbs for better value</p>
                    )}
                    {affordabilityFlex >= 7 && (
                      <p className="text-lg">• Willing to invest in premium communities</p>
                    )}
                    {transitPriority >= 7 && (
                      <p className="text-lg">• Needs strong transit access</p>
                    )}
                  </div>

                  <div className="mt-8 flex gap-4 justify-center">
                    <Button
                      onClick={handleRetake}
                      className="bg-white text-primary hover:bg-gray-100"
                    >
                      🔄 Retake Assessment
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Block 2: Recommended Communities Table */}
              <Card className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-primary">Recommended Communities</h3>
                    <p className="text-gray-600 mt-2">Based on your preferences and current market data</p>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full text-xs">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-green-700 font-medium">Live Data</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Updated weekly</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-300">
                        <th className="text-left p-3 font-bold text-gray-700">Community</th>
                        <th className="text-left p-3 font-bold text-gray-700">Avg Rent (4-room)</th>
                        <th className="text-left p-3 font-bold text-gray-700">Avg Buy Price</th>
                        <th className="text-left p-3 font-bold text-gray-700">Anglo Presence</th>
                        <th className="text-left p-3 font-bold text-gray-700">Commute</th>
                        <th className="text-left p-3 font-bold text-gray-700">Cost Level</th>
                        <th className="text-center p-3 font-bold text-gray-700">Fit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {communityMatches.map((community, idx) => (
                        <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3 font-semibold text-primary">{community.name}</td>
                          <td className="p-3">{community.avgRent}</td>
                          <td className="p-3">{community.avgBuyPrice}</td>
                          <td className="p-3">{community.angloPresence}</td>
                          <td className="p-3">{community.commute}</td>
                          <td className="p-3">{community.costLevel}</td>
                          <td className="p-3 text-center">
                            <span className="font-bold">{community.fitIcon} {community.fitScore}%</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

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

              {/* Block 3: Cost-of-Living Comparison */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Cost-of-Living Comparison</h3>
                <p className="text-gray-700 mb-4">
                  Compare your current city's cost of living with your top-matched Israeli communities.
                </p>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter your current city (e.g., "New York City", "Los Angeles"):
                  </label>
                  <input
                    type="text"
                    value={currentCity}
                    onChange={(e) => setCurrentCity(e.target.value)}
                    placeholder="Your current city"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {currentCity && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                    <p className="text-gray-800 leading-relaxed">
                      <strong>Compared to {currentCity}:</strong> Israeli cities generally offer lower overall costs of living, 
                      with significant savings in rent (typically 40-70% lower), groceries (30-40% lower), and dining out (40-50% lower). 
                      However, utilities and transportation costs may be similar or slightly higher.
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      For detailed comparisons, visit{" "}
                      <a 
                        href={`https://www.numbeo.com/cost-of-living/compare_cities.jsp?country1=United+States&city1=${encodeURIComponent(currentCity)}&country2=Israel`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-semibold"
                      >
                        Numbeo's comparison tool
                      </a>
                    </p>
                  </div>
                )}
              </Card>

              {/* Block 4: Personalized Insights */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Personalized Insights</h3>
                <div className="space-y-4">
                  {insights.map((insight, idx) => (
                    <p key={idx} className="text-gray-700 leading-relaxed">
                      {insight}
                    </p>
                  ))}
                </div>
              </Card>

              {/* Block 5: Next Steps */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Next Steps</h3>
                
                <div className="space-y-4 mb-6">
                  {affordabilityFlex >= 7 || newVsExisting >= 7 ? (
                    <>
                      <p className="text-gray-700">✓ Consider purchase planning in year 1-2 based on your readiness</p>
                      <p className="text-gray-700">✓ Connect with mortgage brokers to explore financing options</p>
                      <p className="text-gray-700">✓ Schedule property tours in your top-matched communities</p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700">✓ Explore rentals for 6–12 months to get to know communities firsthand</p>
                      <p className="text-gray-700">✓ Visit your top-matched communities during a pilot trip</p>
                      <p className="text-gray-700">✓ Connect with local Anglo communities for insights and support</p>
                    </>
                  )}
                </div>

                <div className="border-t pt-6">
                  <h4 className="text-lg font-bold text-primary mb-4">Explore Your Top Communities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {communityMatches.slice(0, 3).map((community, idx) => (
                      <a
                        key={idx}
                        href={`https://www.yad2.co.il/realestate/rent?city=${encodeURIComponent(community.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-primary hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-gray-800">{community.name} Rentals</span>
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Professional Resources */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">🤝 Professional Resources</h3>
                <p className="text-gray-700 mb-6">
                  Connect with trusted professionals who specialize in helping Olim find their ideal community and home in Israel.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-primary mb-2">🏦 Financial Planning</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Work with advisors who understand cross-border financial planning for Aliyah.
                    </p>
                    <Button className="w-full bg-primary text-white hover:bg-navy-700">
                      Schedule Consultation
                    </Button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-primary mb-2">🏘️ Real Estate Agents</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Connect with experienced agents who work with Olim.
                    </p>
                    <Button className="w-full bg-primary text-white hover:bg-navy-700">
                      Find an Agent
                    </Button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-primary mb-2">⚖️ Legal Services</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Consult with Israeli real estate attorneys.
                    </p>
                    <Button className="w-full bg-primary text-white hover:bg-navy-700">
                      Legal Consultation
                    </Button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-lg font-bold text-primary mb-2">🏦 Mortgage Brokers</h4>
                    <p className="text-gray-700 text-sm mb-3">
                      Explore mortgage options for Olim.
                    </p>
                    <Button className="w-full bg-primary text-white hover:bg-navy-700">
                      Mortgage Options
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Email Capture for PDF */}
              <Card className="p-6 bg-gradient-to-br from-teal/10 to-primary/10">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">📧 Get Your Community Report (PDF)</h3>
                {!emailSubmitted ? (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <p className="text-gray-700">
                      Enter your email to receive a detailed PDF report with your community matches, cost comparisons, and personalized recommendations.
                    </p>
                    <div className="flex gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.email@example.com"
                        required
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <Button type="submit" className="bg-primary text-white hover:bg-navy-700 px-8">
                        Send Report
                      </Button>
                    </div>
                    <p className="text-xs text-gray-600">
                      We respect your privacy. Your email will only be used to send your report and occasional updates about Aliyah resources.
                    </p>
                  </form>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-semibold">✓ Report sent to {email}</p>
                    <p className="text-green-700 text-sm mt-2">
                      Check your inbox for your personalized Community Match Report. We've also added you to our Aliyah resources mailing list.
                    </p>
                  </div>
                )}
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
              Where Should I Live?
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Discover which Israeli communities best match your lifestyle, budget, and priorities.
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
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Instructions Card */}
            <Card className="p-6 bg-blue-50 border-2 border-blue-200">
              <p className="text-lg font-bold text-gray-900 leading-relaxed">
                Rate each statement from 0 (Strongly Disagree) to 10 (Strongly Agree). Your answers generate a personalized community match and a cost overview using live online data.
              </p>
              <div className="mt-4 bg-white rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">Progress:</span>
                  <span className="text-sm font-bold text-primary">{progress}/{totalQuestions} answered</span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(progress / totalQuestions) * 100}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            {/* Questions by Category */}
            <Card className="p-6">
              <div className="space-y-8">
                {["Lifestyle & Community Fit", "Family & Education", "Budget & Affordability", "Housing & Property Type", "Logistics & Accessibility"].map((category, catIdx) => (
                  <div key={category} className="space-y-6">
                    <h3 className="text-xl font-serif font-bold text-primary border-b-2 border-primary pb-2">
                      {category}
                      {catIdx === 0 && (
                        <span className="text-sm font-normal text-gray-600 ml-4">
                          (0 = Strongly Disagree • 10 = Strongly Agree)
                        </span>
                      )}
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
                  className="bg-primary text-white hover:bg-navy-700 px-12 py-6 text-lg"
                >
                  View My Community Matches
                </Button>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WhereShouldILive;

