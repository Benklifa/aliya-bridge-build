import { useState } from "react";
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

const ReadinessQuestionnaire = () => {
  const [showResults, setShowResults] = useState(false);

  const initialQuestions: Question[] = [
    // A - Align (Lifestyle & Budget) - 6 questions
    { id: 1, category: "Align", text: "Do you know what your everyday life in Israel will cost?", value: 5 },
    { id: 2, category: "Align", text: "Have you made a draft budget that fits your income and lifestyle?", value: 5 },
    { id: 3, category: "Align", text: "Do you know which areas match both your needs and your budget?", value: 5 },
    { id: 4, category: "Align", text: "Have you decided whether to rent or buy first?", value: 5 },
    { id: 5, category: "Align", text: "Do you understand extra housing costs like Arnona and va'ad bayit?", value: 5 },
    { id: 6, category: "Align", text: "Have you planned what to do with your U.S. home – sell, rent, or keep?", value: 5 },
    
    // L - Live (Longevity & Lifetime Income) - 5 questions
    { id: 7, category: "Live", text: "Have you estimated how long your savings need to last?", value: 5 },
    { id: 8, category: "Live", text: "Do you know your essential monthly expenses through retirement?", value: 5 },
    { id: 9, category: "Live", text: "Do you have steady income that won't run out (pension, Social Security, etc.)?", value: 5 },
    { id: 10, category: "Live", text: "Have you looked at ways to create lifetime income (annuities or similar)?", value: 5 },
    { id: 11, category: "Live", text: "Have you tested your plan for living longer or for market downturns?", value: 5 },
    
    // I - Invest (Income & 10-Year Window) - 6 questions
    { id: 12, category: "Invest", text: "Do you know which income sources are stable versus market-based?", value: 5 },
    { id: 13, category: "Invest", text: "Have you planned how to use Israel's 10-year tax break wisely?", value: 5 },
    { id: 14, category: "Invest", text: "Do you know which investments to keep in the U.S. and which to move?", value: 5 },
    { id: 15, category: "Invest", text: "Do you have a plan for converting dollars to shekels over time?", value: 5 },
    { id: 16, category: "Invest", text: "Have you checked how inflation and currency swings affect your plan?", value: 5 },
    { id: 17, category: "Invest", text: "Do you have a way to access cash without large tax bills?", value: 5 },
    
    // Y - Y'rusha (Protection & Estate) - 4 questions
    { id: 18, category: "Y'rusha", text: "Do you have wills that work in both the U.S. and Israel?", value: 5 },
    { id: 19, category: "Y'rusha", text: "Have you set up power-of-attorney and health directives for both countries?", value: 5 },
    { id: 20, category: "Y'rusha", text: "Do you know if your life-insurance coverage will still apply after Aliyah?", value: 5 },
    { id: 21, category: "Y'rusha", text: "Have you reviewed all your beneficiary designations?", value: 5 },
    
    // A - Adapt (Liquidity & Flexibility) - 5 questions
    { id: 22, category: "Adapt", text: "Do you have 3–6 months of expenses ready in USD and ILS?", value: 5 },
    { id: 23, category: "Adapt", text: "Have you budgeted for one-time setup costs like flights or deposits?", value: 5 },
    { id: 24, category: "Adapt", text: "Do you have credit or borrowing options if you need quick liquidity?", value: 5 },
    { id: 25, category: "Adapt", text: "Are your U.S. and Israeli bank accounts working for easy transfers?", value: 5 },
    { id: 26, category: "Adapt", text: "Do you have a fallback plan if you need to pause or delay Aliyah?", value: 5 },
  ];

  const [responses, setResponses] = useState<Question[]>(initialQuestions);

  const handleSliderChange = (questionId: number, value: number[]) => {
    setResponses(prev =>
      prev.map(q => q.id === questionId ? { ...q, value: value[0] } : q)
    );
  };

  const calculateScores = (): { categories: CategoryScore[], overall: number, overallStatus: string } => {
    const categoryGroups = {
      "Align": { maxScore: 60, questions: responses.filter(q => q.category === "Align") },
      "Live": { maxScore: 50, questions: responses.filter(q => q.category === "Live") },
      "Invest": { maxScore: 60, questions: responses.filter(q => q.category === "Invest") },
      "Y'rusha": { maxScore: 40, questions: responses.filter(q => q.category === "Y'rusha") },
      "Adapt": { maxScore: 50, questions: responses.filter(q => q.category === "Adapt") },
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

    const totalScore = responses.reduce((sum, q) => sum + q.value, 0);
    const overall = Math.round((totalScore / 260) * 100);
    
    let overallStatus = "";
    if (overall >= 70) {
      overallStatus = "🟢 Ready for Aliyah";
    } else if (overall >= 50) {
      overallStatus = "🟡 Partially Ready";
    } else {
      overallStatus = "🔴 Needs Preparation";
    }

    return { categories, overall, overallStatus };
  };

  const getPriorityAreas = (categories: CategoryScore[]) => {
    return [...categories]
      .sort((a, b) => a.percentage - b.percentage);
  };

  const getRecommendations = (categoryName: string): string => {
    const recommendations: { [key: string]: string } = {
      "Align": "Create a detailed Israel budget, research neighborhoods that fit your lifestyle and budget, and decide on your U.S. home strategy (sell, rent, or keep).",
      "Live": "Calculate your essential monthly expenses through retirement, explore lifetime income options like annuities, and stress-test your plan for longevity and market downturns.",
      "Invest": "Develop a strategy to maximize Israel's 10-year tax break, decide which investments to keep in the U.S. versus move, and create a multi-year currency conversion plan.",
      "Y'rusha": "Update your will with an attorney familiar with both U.S. and Israeli law, establish power of attorney and health directives in both countries, and review all beneficiary designations.",
      "Adapt": "Build emergency funds in both USD and ILS, budget for one-time setup costs, and ensure you have credit access and banking infrastructure in both countries.",
    };
    return recommendations[categoryName] || "";
  };

  const getNextSteps = (overall: number): { title: string, steps: string[] } => {
    if (overall >= 70) {
      return {
        title: "✅ NEXT STEPS - You're on the right track!",
        steps: [
          "Schedule a financial review to optimize your cross-border strategy",
          "Finalize any remaining documentation or legal requirements",
          "Connect with our team to discuss timeline and final preparations"
        ]
      };
    } else if (overall >= 50) {
      return {
        title: "⚠️ NEXT STEPS - Address these gaps before your move",
        steps: [
          "Focus on your priority areas identified above",
          "Schedule a comprehensive planning session with our advisors",
          "Create a 90-day action plan to improve readiness in key categories"
        ]
      };
    } else {
      return {
        title: "🚨 NEXT STEPS - Significant preparation needed",
        steps: [
          "Book an initial consultation to create a personalized readiness roadmap",
          "Address critical gaps immediately in your lowest scoring areas",
          "Consider your Aliyah timeline to ensure core areas are strengthened"
        ]
      };
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setShowResults(false);
    setResponses(initialQuestions);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showResults) {
    const { categories, overall, overallStatus } = calculateScores();
    const priorityAreas = getPriorityAreas(categories);
    const nextSteps = getNextSteps(overall);

    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Overall Score */}
        <Card className="p-8 bg-gradient-to-br from-primary to-navy-700 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold mb-4">Your Aliya Readiness Score™</h2>
            <div className="text-6xl font-bold mb-2">{overall}%</div>
            <div className="text-2xl">{overallStatus}</div>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-6">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">Category Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2">Category</th>
                  <th className="text-center py-3 px-2">Score</th>
                  <th className="text-center py-3 px-2">Percent</th>
                  <th className="text-center py-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-3 px-2 font-medium text-black">{cat.name}</td>
                    <td className="text-center py-3 px-2 text-black">{cat.score}/{cat.maxScore}</td>
                    <td className="text-center py-3 px-2 text-black">{cat.percentage}%</td>
                    <td className="text-center py-3 px-2">{cat.icon} {cat.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Priority Areas */}
        <Card className="p-6">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">🎯 Priority Areas</h3>
          <div className="space-y-4">
            {priorityAreas.map((gap, idx) => (
              <div key={idx} className="border-l-4 border-gold-500 pl-4">
                <div className="font-semibold text-lg text-black">{idx + 1}. {gap.name} - {gap.percentage}%</div>
                <div className="text-gray-700 mt-1">→ {getRecommendations(gap.name)}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-primary mb-4">{nextSteps.title}</h3>
          <ul className="space-y-2">
            {nextSteps.steps.map((step, idx) => (
              <li key={idx} className="flex items-start text-black">
                <span className="text-gold-500 mr-2">•</span>
                <span>{step}</span>
              </li>
            ))}
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
            className="px-8 py-3"
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
    );
  }

  // Group questions by category
  const questionsByCategory = {
    "A – Align (Lifestyle & Budget)": responses.filter(q => q.category === "Align"),
    "L – Live (Longevity & Lifetime Income)": responses.filter(q => q.category === "Live"),
    "I – Invest (Income & 10-Year Window)": responses.filter(q => q.category === "Invest"),
    "Y – Y'rusha (Protection & Estate)": responses.filter(q => q.category === "Y'rusha"),
    "A – Adapt (Liquidity & Flexibility)": responses.filter(q => q.category === "Adapt"),
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-6 sm:p-8">
        <p className="text-sm text-gray-600 mb-6">
          Rate each question from 0 (not at all prepared) to 10 (completely ready). Your responses will generate a personalized readiness report.
        </p>

        <div className="space-y-8">
          {Object.entries(questionsByCategory).map(([categoryName, questions]) => (
            <div key={categoryName}>
              <h3 className="text-xl font-bold text-primary mb-4 pb-2 border-b-2 border-gray-200">
                {categoryName}
              </h3>
              <div className="space-y-4">
                {questions.map((question) => (
                  <div key={question.id} className="space-y-2">
                    <label className="text-sm font-medium text-black flex justify-between items-start">
                      <span className="flex-1">{question.id}. {question.text}</span>
                      <span className="ml-4 text-primary font-bold text-lg min-w-[2rem] text-right">
                        {question.value}
                      </span>
                    </label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">0</span>
                      <Slider
                        value={[question.value]}
                        onValueChange={(value) => handleSliderChange(question.id, value)}
                        min={0}
                        max={10}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-gray-500">10</span>
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
            Calculate My Readiness Score
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReadinessQuestionnaire;

