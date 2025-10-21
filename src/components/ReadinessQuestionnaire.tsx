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
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState("");

  const questions: Question[] = [
    // A - Aliya Lifestyle (6 questions)
    { id: 1, category: "Lifestyle", text: "Housing plan – Do you know where you want to live and the cost range?", value: 5 },
    { id: 2, category: "Lifestyle", text: "Language readiness – Are you prepared with Hebrew skills for daily life?", value: 5 },
    { id: 3, category: "Lifestyle", text: "Transportation plan – Do you have a plan for driving, licensing, or public transport?", value: 5 },
    { id: 4, category: "Lifestyle", text: "Community integration – Have you identified suitable schools, synagogues, and networks?", value: 5 },
    { id: 5, category: "Lifestyle", text: "Cost-of-living awareness – Do you have an Israel-adjusted budget?", value: 5 },
    { id: 6, category: "Lifestyle", text: "Emotional support – Do you have a support system in Israel for transition?", value: 5 },
    
    // L - Longevity (5 questions)
    { id: 7, category: "Longevity", text: "Kupah knowledge – Do you understand Israel's kupot holim options?", value: 5 },
    { id: 8, category: "Longevity", text: "Supplemental coverage – Have you explored private health insurance or upgrades?", value: 5 },
    { id: 9, category: "Longevity", text: "Long-term care planning – Have you considered future care and costs?", value: 5 },
    { id: 10, category: "Longevity", text: "Health history – Have you mapped chronic needs to Israel's system?", value: 5 },
    { id: 11, category: "Longevity", text: "End-of-life preferences – Do you have them recorded in both countries?", value: 5 },
    
    // I - Income (6 questions)
    { id: 12, category: "Income", text: "Retirement accounts – Do you know how your U.S. savings will fund Israeli expenses?", value: 5 },
    { id: 13, category: "Income", text: "Pension/Social Security – Have you planned timing and taxation in Israel?", value: 5 },
    { id: 14, category: "Income", text: "Investment income – Are your investments aligned for income in Israel?", value: 5 },
    { id: 15, category: "Income", text: "Work/side income – Do you have a plan for employment or consulting?", value: 5 },
    { id: 16, category: "Income", text: "Currency transfers – Do you have a USD/ILS conversion strategy?", value: 5 },
    { id: 17, category: "Income", text: "Inflation-adjusted income – Have you stress-tested income against inflation?", value: 5 },
    
    // Y - Y'rusha (4 questions)
    { id: 18, category: "Y'rusha", text: "Wills – Do you have valid wills recognized in both the U.S. and Israel?", value: 5 },
    { id: 19, category: "Y'rusha", text: "Power of attorney – Do you have updated POAs in both countries?", value: 5 },
    { id: 20, category: "Y'rusha", text: "Trusts/Inheritance – Have you addressed cross-border estate complexities?", value: 5 },
    { id: 21, category: "Y'rusha", text: "Beneficiaries – Have you updated designations for both countries?", value: 5 },
    
    // A - Access (5 questions)
    { id: 22, category: "Access", text: "Emergency funds – Do you have 3–6 months' liquidity in both currencies?", value: 5 },
    { id: 23, category: "Access", text: "Banking access – Do you maintain functioning accounts in both countries?", value: 5 },
    { id: 24, category: "Access", text: "Credit – Do you have credit lines in Israel?", value: 5 },
    { id: 25, category: "Access", text: "Big purchases – Can you cover large one-off costs (car, appliances, deposits)?", value: 5 },
    { id: 26, category: "Access", text: "Flexibility – Could you return or pivot financially if needed?", value: 5 },
  ];

  const [responses, setResponses] = useState<Question[]>(questions);

  const handleSliderChange = (questionId: number, value: number[]) => {
    setResponses(prev =>
      prev.map(q => q.id === questionId ? { ...q, value: value[0] } : q)
    );
  };

  const calculateScores = (): { categories: CategoryScore[], overall: number, overallStatus: string } => {
    const categoryGroups = {
      "Lifestyle": { maxScore: 60, questions: responses.filter(q => q.category === "Lifestyle") },
      "Longevity": { maxScore: 50, questions: responses.filter(q => q.category === "Longevity") },
      "Income": { maxScore: 60, questions: responses.filter(q => q.category === "Income") },
      "Y'rusha": { maxScore: 40, questions: responses.filter(q => q.category === "Y'rusha") },
      "Access": { maxScore: 50, questions: responses.filter(q => q.category === "Access") },
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

  const getTopGaps = (categories: CategoryScore[]) => {
    return [...categories]
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3);
  };

  const getRecommendations = (categoryName: string): string => {
    const recommendations: { [key: string]: string } = {
      "Lifestyle": "Start Hebrew language courses, research housing options in your preferred area, and connect with communities of recent olim to build your support network.",
      "Longevity": "Research Israel's kupot holim system, explore supplemental health insurance options, and ensure your chronic health needs are mapped to Israeli healthcare providers.",
      "Income": "Develop a clear retirement account withdrawal strategy, understand U.S.-Israel tax treaty implications, and establish a USD/ILS currency conversion plan.",
      "Y'rusha": "Update your will with an attorney familiar with both U.S. and Israeli law, establish power of attorney in both countries, and review all beneficiary designations.",
      "Access": "Build emergency funds in both USD and ILS, establish Israeli banking relationships, and ensure you have credit access for major purchases.",
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
          "Focus on your top 3 priority areas identified above",
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

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setShowResults(false);
    setResponses(questions);
  };

  if (showResults) {
    const { categories, overall, overallStatus } = calculateScores();
    const topGaps = getTopGaps(categories);
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

        {/* Top 3 Gaps */}
        <Card className="p-6">
          <h3 className="text-2xl font-serif font-bold text-primary mb-4">🎯 Your Top 3 Priority Areas</h3>
          <div className="space-y-4">
            {topGaps.map((gap, idx) => (
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

        {/* Restart Button */}
        <div className="text-center">
          <Button onClick={handleRestart} variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
            Take Assessment Again
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center border-t pt-4">
          This assessment is for educational purposes only and does not constitute financial, legal, or tax advice. 
          Results are based on self-reported information and should be discussed with qualified professionals.
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gold-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="p-8 mb-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-primary text-white rounded-full text-sm font-medium mb-4">
            {currentQuestion.category}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-black mb-8">
          {currentQuestion.text}
        </h3>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Not at all (0)</span>
            <span>Completely ready (10)</span>
          </div>
          <Slider
            value={[responses[currentStep].value]}
            onValueChange={(value) => handleSliderChange(currentQuestion.id, value)}
            max={10}
            step={1}
            className="w-full"
          />
          <div className="text-center">
            <span className="text-3xl font-bold text-primary">{responses[currentStep].value}</span>
          </div>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          variant="outline"
          className="text-primary border-primary hover:bg-primary hover:text-white"
        >
          ← Previous
        </Button>
        <Button
          onClick={handleNext}
          className="bg-primary text-white hover:bg-navy-700"
        >
          {currentStep === questions.length - 1 ? 'See Results' : 'Next →'}
        </Button>
      </div>
    </div>
  );
};

export default ReadinessQuestionnaire;

