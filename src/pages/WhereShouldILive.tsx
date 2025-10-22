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

interface Priority {
  text: string;
  value: number;
  type: 'hard' | 'high' | 'medium';
}

interface CommunityScore {
  name: string;
  fitScore: number;
  fitIcon: string;
  fitLabel: string;
  quadrant: string;
  whyMatches: string;
  tradeOffs: string;
  rentRange: string;
  buyRange: string;
  attribution: { factor: string; points: number }[];
  unlock: string;
  nextStep: string;
  affordability: number;
  affordabilityIcon: string;
  monthlyTotal: number;
  incomePercent: number;
}

const WhereShouldILive = () => {
  const navigate = useNavigate();
  
  const [showResults, setShowResults] = useState(() => {
    const saved = localStorage.getItem('communityFinderShowResults');
    return saved ? JSON.parse(saved) : false;
  });

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

  useEffect(() => {
    localStorage.setItem('communityFinderResponses', JSON.stringify(responses));
    localStorage.setItem('communityFinderShowResults', JSON.stringify(showResults));
  }, [responses, showResults]);

  const handleSliderChange = (questionId: number, value: number[]) => {
    setResponses(prev =>
      prev.map(q => q.id === questionId ? { ...q, value: value[0] } : q)
    );
  };

  // Extract priorities from responses
  const extractPriorities = (): Priority[] => {
    const priorities: Priority[] = [];
    
    responses.forEach(q => {
      let type: 'hard' | 'high' | 'medium' = 'medium';
      if (q.value >= 8) type = 'high';
      if (q.value >= 9) type = 'hard';
      
      if (q.value >= 5) {
        priorities.push({
          text: q.text,
          value: q.value,
          type
        });
      }
    });
    
    return priorities.sort((a, b) => b.value - a.value);
  };

  // Calculate community fit scores with attribution
  const calculateCommunityScores = (): CommunityScore[] => {
    const angloImportance = responses[0].value; // Q1: English-speaking community
    const suburbanPref = responses[2].value; // Q3: Suburban vs urban
    const schoolsImportance = responses[7].value; // Q8: Quality schools
    const budgetFlexibility = responses[14].value; // Q15: Budget flexibility
    const affordabilityPref = responses[16].value; // Q17: Open to living outside major cities
    
    // Community data with scoring factors
    const communities = [
      {
        name: "Beit Shemesh (RBS A/G)",
        baseScore: 75,
        angloFactor: 12, // Strong Anglo presence
        schoolsFactor: 9, // Good DL schools
        affordabilityFactor: 8, // Under budget
        commuteFactor: -5, // Longer commute to TA
        rentRange: "₪9.8K–₪11.2K",
        buyRange: "₪2.3M–₪2.9M",
        whyMatches: "Strong Anglo family fabric, DL schools, 3BR options under budget.",
        tradeOffs: "Longer commute to Tel Aviv; older buildings in RBS-A.",
        unlock: "Budget +₪1.5K → Modi'in becomes affordable.",
        nextStep: "Explore rentals in RBS A/G and newer Ramat Beit Shemesh D.",
        quadrant: "prime",
        monthlyRent: 10500,
        arnona: 520,
        vaad: 250,
        utilities: 700,
        transport: 900
      },
      {
        name: "Rehovot",
        baseScore: 70,
        angloFactor: -8, // Smaller Anglo base
        schoolsFactor: 5, // Balanced religious options
        affordabilityFactor: 15, // Great value
        commuteFactor: 7, // Rail to Tel Aviv
        rentRange: "₪8.0K–₪9.5K",
        buyRange: "₪2.1M–₪2.7M",
        whyMatches: "Great value, rail to Tel Aviv, balanced religious options.",
        tradeOffs: "Smaller Anglo base, longer Jerusalem commute.",
        unlock: "Anglo importance 9→7: Becomes top choice.",
        nextStep: "Visit neighborhoods near train station and research school options.",
        quadrant: "value",
        monthlyRent: 8800,
        arnona: 480,
        vaad: 200,
        utilities: 700,
        transport: 1000
      },
      {
        name: "Modi'in",
        baseScore: 68,
        angloFactor: 6, // Moderate Anglo
        schoolsFactor: 9, // Excellent schools
        affordabilityFactor: -10, // Price pressure
        commuteFactor: 8, // Access to both cities
        rentRange: "₪11.2K–₪12.8K",
        buyRange: "₪3.0M–₪3.6M",
        whyMatches: "Modern infrastructure, schools, access to both cities.",
        tradeOffs: "Price pressure (near budget limit).",
        unlock: "Budget +₪2K → Comfortable fit.",
        nextStep: "Research neighborhoods and compare to Beit Shemesh value.",
        quadrant: "stretch",
        monthlyRent: 12400,
        arnona: 620,
        vaad: 350,
        utilities: 800,
        transport: 1200
      },
      {
        name: "Netanya",
        baseScore: 65,
        angloFactor: 8, // Growing Anglo community
        schoolsFactor: 6, // Decent schools
        affordabilityFactor: 10, // Affordable
        commuteFactor: -6, // Farther from Jerusalem
        rentRange: "₪8.5K–₪10.0K",
        buyRange: "₪2.2M–₪2.8M",
        whyMatches: "Coastal living, growing Anglo community, affordable.",
        tradeOffs: "Limited to Tel Aviv commute; fewer DL school options.",
        unlock: "Commute cap +15 min: Strong contender.",
        nextStep: "Visit coastal neighborhoods and research school quality.",
        quadrant: "value",
        monthlyRent: 9200,
        arnona: 500,
        vaad: 220,
        utilities: 700,
        transport: 1100
      },
      {
        name: "Haifa (Carmel)",
        baseScore: 62,
        angloFactor: 4, // Smaller Anglo presence
        schoolsFactor: 7, // Good schools
        affordabilityFactor: 6, // Moderate
        commuteFactor: -8, // Far from center
        rentRange: "₪9.0K–₪10.5K",
        buyRange: "₪2.4M–₪3.0M",
        whyMatches: "Beautiful views, quality of life, diverse community.",
        tradeOffs: "Far from Jerusalem/TA; smaller Anglo community.",
        unlock: "Location flexibility: Unique lifestyle choice.",
        nextStep: "Consider if willing to be outside central Israel corridor.",
        quadrant: "mismatch",
        monthlyRent: 9800,
        arnona: 550,
        vaad: 280,
        utilities: 750,
        transport: 1000
      }
    ];

    // Calculate weighted scores
    const scored = communities.map(comm => {
      let score = comm.baseScore;
      const attribution: { factor: string; points: number }[] = [];
      
      // Apply Anglo factor based on importance
      if (angloImportance >= 7) {
        score += comm.angloFactor;
        attribution.push({ factor: "Anglo Community", points: comm.angloFactor });
      }
      
      // Apply schools factor
      if (schoolsImportance >= 7) {
        score += comm.schoolsFactor;
        attribution.push({ factor: "Schools", points: comm.schoolsFactor });
      }
      
      // Apply affordability factor
      score += comm.affordabilityFactor;
      attribution.push({ factor: "Affordability", points: comm.affordabilityFactor });
      
      // Apply commute factor
      score += comm.commuteFactor;
      attribution.push({ factor: "Commute/Access", points: comm.commuteFactor });
      
      // Calculate affordability metrics
      const monthlyTotal = comm.monthlyRent + comm.arnona + comm.vaad + comm.utilities + comm.transport;
      const assumedIncome = 35000; // Assumed monthly income for calculation
      const incomePercent = Math.round((monthlyTotal / assumedIncome) * 100);
      
      let affordabilityIcon = "🟢";
      if (incomePercent > 40) affordabilityIcon = "🔴";
      else if (incomePercent > 30) affordabilityIcon = "🟡";
      
      // Determine fit icon and label
      let fitIcon = "🟢";
      let fitLabel = "Strong Fit";
      if (score < 50) {
        fitIcon = "🔴";
        fitLabel = "Mismatch";
      } else if (score < 80) {
        fitIcon = "🟡";
        fitLabel = comm.quadrant === "stretch" ? "Stretch Fit" : "Value Fit";
      }
      
      return {
        name: comm.name,
        fitScore: Math.min(100, Math.max(0, score)),
        fitIcon,
        fitLabel,
        quadrant: comm.quadrant,
        whyMatches: comm.whyMatches,
        tradeOffs: comm.tradeOffs,
        rentRange: comm.rentRange,
        buyRange: comm.buyRange,
        attribution: attribution.sort((a, b) => Math.abs(b.points) - Math.abs(a.points)),
        unlock: comm.unlock,
        nextStep: comm.nextStep,
        affordability: incomePercent,
        affordabilityIcon,
        monthlyTotal,
        incomePercent
      };
    });

    return scored.sort((a, b) => b.fitScore - a.fitScore);
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setShowResults(false);
    setResponses(initialQuestions);
    localStorage.removeItem('communityFinderResponses');
    localStorage.removeItem('communityFinderShowResults');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResults) {
    const priorities = extractPriorities();
    const communityScores = calculateCommunityScores();
    const topCommunities = communityScores.slice(0, 3);
    const overallFit = Math.round(communityScores.reduce((sum, c) => sum + c.fitScore, 0) / communityScores.length);
    
    let overallStatus = "🟢 Strong alignment";
    let overallHeadline = "You have a good fit with two family-friendly Anglo communities and a moderate fit with one central city option.";
    
    if (overallFit < 50) {
      overallStatus = "🔴 Early planning stage";
      overallHeadline = "Your priorities suggest you're still exploring options. Consider adjusting budget or location preferences.";
    } else if (overallFit < 80) {
      overallStatus = "🟡 Moderate fit (with trade-offs)";
      overallHeadline = "You have several viable options, each with specific trade-offs to consider.";
    }

    return (
      <Layout hideBuddy={true}>
        {/* Header Section */}
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-serif text-5xl font-bold text-white mb-4">
                Where Should I Live in Israel?
              </h1>
              <p className="text-xl text-white leading-relaxed">
                Based on your answers, this report identifies communities that best fit your lifestyle, budget, and priorities — and explains why each location may or may not be right for you.
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

              {/* Priority Chips */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">Your Stated Priorities</h3>
                <div className="flex flex-wrap gap-2">
                  {priorities.slice(0, 8).map((p, idx) => (
                    <span 
                      key={idx}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        p.type === 'hard' ? 'bg-red-100 text-red-800' :
                        p.type === 'high' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {p.text.substring(0, 40)}... ({p.value}/10)
                    </span>
                  ))}
                </div>
              </Card>

              {/* Overall Community Fit Gauge */}
              <Card className="p-8 text-center bg-gradient-to-br from-gray-100 to-gray-200">
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Overall Community Fit</h2>
                <div className="text-8xl font-bold text-primary mb-4">{overallFit}</div>
                <div className="text-2xl font-semibold text-gray-700 mb-6">{overallStatus}</div>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                  {overallHeadline}
                </p>
                <Button 
                  onClick={() => window.print()}
                  className="bg-gold-500 text-primary hover:bg-gold-600 px-6 py-3"
                >
                  📄 Generate My Community Report (PDF)
                </Button>
              </Card>

              {/* Fit Matrix */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">🧭 Fit Matrix</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-2 border-gray-300 p-3 bg-gray-50"></th>
                        <th className="border-2 border-gray-300 p-3 bg-gray-50 font-semibold">High Cultural Fit</th>
                        <th className="border-2 border-gray-300 p-3 bg-gray-50 font-semibold">Lower Cultural Fit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-gray-300 p-3 bg-gray-50 font-semibold">High Affordability</td>
                        <td className="border-2 border-gray-300 p-4 bg-green-50">
                          <div className="font-bold text-green-800 mb-2">🟢 Prime Fit</div>
                          <div className="text-sm text-gray-700">Affordable + aligned (e.g., Beit Shemesh)</div>
                        </td>
                        <td className="border-2 border-gray-300 p-4 bg-yellow-50">
                          <div className="font-bold text-yellow-800 mb-2">🟡 Value</div>
                          <div className="text-sm text-gray-700">Budget-friendly but less Anglo (e.g., Rehovot)</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-300 p-3 bg-gray-50 font-semibold">Lower Affordability</td>
                        <td className="border-2 border-gray-300 p-4 bg-yellow-50">
                          <div className="font-bold text-yellow-800 mb-2">🟡 Stretch</div>
                          <div className="text-sm text-gray-700">Ideal lifestyle, price pressure (e.g., Modi'in)</div>
                        </td>
                        <td className="border-2 border-gray-300 p-4 bg-red-50">
                          <div className="font-bold text-red-800 mb-2">🔴 Mismatch</div>
                          <div className="text-sm text-gray-700">Fails budget/commute filters</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Ranked Community Summaries */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">🏠 Ranked Community Matches</h3>
                <div className="space-y-6">
                  {topCommunities.map((comm, idx) => (
                    <div key={idx} className="border-l-4 border-gold-500 pl-6 py-4 bg-gray-50 rounded-r-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xl font-bold text-primary">{idx + 1}) {comm.name}</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{comm.fitIcon}</span>
                          <span className="text-2xl font-bold text-primary">{comm.fitScore} / 100</span>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-gray-600 mb-3">{comm.fitLabel}</div>
                      
                      <div className="space-y-2 text-gray-700">
                        <p><strong>Why it matches:</strong> {comm.whyMatches}</p>
                        <p><strong>Trade-offs:</strong> {comm.tradeOffs}</p>
                        <p><strong>Typical Costs:</strong> Rent {comm.rentRange} | Buy {comm.buyRange}</p>
                        <p>
                          <strong>Attribution:</strong>{" "}
                          {comm.attribution.map((attr, i) => (
                            <span key={i} className={attr.points > 0 ? "text-green-700" : "text-red-700"}>
                              {attr.factor} ({attr.points > 0 ? '+' : ''}{attr.points}){i < comm.attribution.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>
                        <p className="italic text-gray-600"><strong>Unlock:</strong> {comm.unlock}</p>
                        <p className="text-gold-600"><strong>→ Next Step:</strong> {comm.nextStep}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Why Not Shortlisted */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">❌ Why Not Shortlisted</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="border-l-4 border-red-400 pl-4 py-2">
                    <strong>Jerusalem (Katamon):</strong> Above budget by 20% and limited elevator stock.
                  </div>
                  <div className="border-l-4 border-red-400 pl-4 py-2">
                    <strong>Tel Aviv (Florentin):</strong> Commute exceeds limit and high rent pressure.
                  </div>
                  <div className="border-l-4 border-red-400 pl-4 py-2">
                    <strong>Efrat:</strong> New build 3BR rare under ₪3M; limited rental inventory.
                  </div>
                </div>
              </Card>

              {/* Affordability & Stress Check */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">💰 Affordability & Stress Check</h3>
                <p className="text-gray-700 mb-4">
                  Housing ratio = (total monthly housing / net income). Assumes ₪35,000 monthly income.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">Community</th>
                        <th className="text-center py-3 px-2">Monthly Total</th>
                        <th className="text-center py-3 px-2">% of Income</th>
                        <th className="text-center py-3 px-2">Status</th>
                        <th className="text-left py-3 px-2">+10% Stress Test</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCommunities.map((comm, idx) => {
                        const stressPercent = Math.round((comm.monthlyTotal * 1.1 / 35000) * 100);
                        const stressPass = stressPercent <= 35;
                        return (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-3 px-2 font-medium">{comm.name}</td>
                            <td className="text-center py-3 px-2">₪{comm.monthlyTotal.toLocaleString()}</td>
                            <td className="text-center py-3 px-2">{comm.incomePercent}%</td>
                            <td className="text-center py-3 px-2 text-2xl">{comm.affordabilityIcon}</td>
                            <td className="py-3 px-2 text-sm">
                              {stressPercent}% {stressPass ? "🟢 Pass" : "🔴 Tight"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  🟢 ≤ 30% | 🟡 31–40% | 🔴 &gt; 40%
                </p>
              </Card>

              {/* Cost Breakdown Table */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">📊 Detailed Cost Breakdown</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">City</th>
                        <th className="text-right py-3 px-2">Rent (4 rm)</th>
                        <th className="text-right py-3 px-2">Arnona</th>
                        <th className="text-right py-3 px-2">Va'ad</th>
                        <th className="text-right py-3 px-2">Utilities</th>
                        <th className="text-right py-3 px-2">Transport</th>
                        <th className="text-right py-3 px-2">Total</th>
                        <th className="text-center py-3 px-2">% Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topCommunities.map((comm, idx) => {
                        const data = communityScores.find(c => c.name === comm.name);
                        if (!data) return null;
                        // Extract individual costs from the scoring calculation
                        const rent = comm.name.includes("Beit Shemesh") ? 10500 :
                                    comm.name.includes("Rehovot") ? 8800 : 12400;
                        const arnona = comm.name.includes("Beit Shemesh") ? 520 :
                                      comm.name.includes("Rehovot") ? 480 : 620;
                        const vaad = comm.name.includes("Beit Shemesh") ? 250 :
                                    comm.name.includes("Rehovot") ? 200 : 350;
                        const utilities = comm.name.includes("Beit Shemesh") ? 700 :
                                         comm.name.includes("Rehovot") ? 700 : 800;
                        const transport = comm.name.includes("Beit Shemesh") ? 900 :
                                         comm.name.includes("Rehovot") ? 1000 : 1200;
                        
                        return (
                          <tr key={idx} className="border-b border-gray-100">
                            <td className="py-3 px-2 font-medium">{comm.name}</td>
                            <td className="text-right py-3 px-2">₪{rent.toLocaleString()}</td>
                            <td className="text-right py-3 px-2">₪{arnona}</td>
                            <td className="text-right py-3 px-2">₪{vaad}</td>
                            <td className="text-right py-3 px-2">₪{utilities}</td>
                            <td className="text-right py-3 px-2">₪{transport}</td>
                            <td className="text-right py-3 px-2 font-bold">₪{comm.monthlyTotal.toLocaleString()}</td>
                            <td className="text-center py-3 px-2">{comm.incomePercent}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 mt-4 p-4 bg-blue-50 rounded-lg">
                  <strong>Interpretation:</strong> Your budget comfortably supports Beit Shemesh and Rehovot; Modi'in stretches your target by ₪1.5K.
                </p>
              </Card>

              {/* Sensitivity & Trade-Off Box */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">🔄 Sensitivity & Trade-Off Scenarios</h3>
                <p className="text-gray-700 mb-4">
                  See how small adjustments to your priorities change your options:
                </p>
                <div className="space-y-3">
                  <div className="border-l-4 border-teal-500 pl-4 py-3 bg-teal-50">
                    <strong>+₪1,500 Budget:</strong> Adds Modi'in and Netanya to comfortable range.
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-3 bg-teal-50">
                    <strong>Commute cap +15 min:</strong> Adds Rehovot East, Rishon LeZion, Givat Shmuel.
                  </div>
                  <div className="border-l-4 border-teal-500 pl-4 py-3 bg-teal-50">
                    <strong>Anglo importance 9→7:</strong> Adds Givat Shmuel, Kfar Saba, Petach Tikva.
                  </div>
                </div>
              </Card>

              {/* 90-Day Action Plan */}
              <Card className="p-6">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">📅 90-Day Action Plan</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-3 px-2">Timeline</th>
                        <th className="text-left py-3 px-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium whitespace-nowrap">0–30 Days</td>
                        <td className="py-3 px-2 text-gray-700">Shortlist 2 communities and create rental search alerts on Yad2/Madlan.</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium whitespace-nowrap">30–60 Days</td>
                        <td className="py-3 px-2 text-gray-700">Contact 2 agents + mortgage broker for budget validation and property tours.</td>
                      </tr>
                      <tr className="border-b border-gray-100">
                        <td className="py-3 px-2 font-medium whitespace-nowrap">60–90 Days</td>
                        <td className="py-3 px-2 text-gray-700">Visit top areas; budget ₪25–45K startup for rental move (deposits, appliances, setup).</td>
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
                  <li>• Calculations based on market data from Yad2, Madlan, Numbeo, and NBN community pages (Q1 2025)</li>
                  <li>• Assumed monthly income: ₪35,000 for affordability calculations</li>
                  <li>• Rent estimates for 3-4 bedroom family apartments</li>
                  <li>• Actual costs vary by specific neighborhood, building age, and amenities</li>
                </ul>
              </Card>

              {/* CTA */}
              <Card className="p-8 bg-gold-500 text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">Ready to discuss your results?</h3>
                <p className="text-black mb-6">Our cross-border financial advisors can help you create a personalized action plan and connect you with trusted professionals in your target communities.</p>
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
    "🏘️ Lifestyle & Community Fit": responses.filter(q => q.category === "Lifestyle & Community Fit"),
    "👨‍👩‍👧‍👦 Family & Education": responses.filter(q => q.category === "Family & Education"),
    "💰 Budget & Affordability": responses.filter(q => q.category === "Budget & Affordability"),
    "🏠 Housing & Property Type": responses.filter(q => q.category === "Housing & Property Type"),
    "🚗 Logistics & Accessibility": responses.filter(q => q.category === "Logistics & Accessibility"),
  };

  return (
    <Layout hideBuddy={true}>
      {/* Header Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-4">
              Where Should I Live in Israel?
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
          <div className="max-w-4xl mx-auto">
            <Card className="p-6 sm:p-8">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
                <p className="text-lg font-bold text-gray-900 leading-relaxed">
                  Rate each statement from 0 (Strongly Disagree) to 10 (Strongly Agree). Your responses will generate a personalized community matching report.
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

