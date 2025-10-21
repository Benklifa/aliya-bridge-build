import Layout from "../components/Layout";
import ReadinessQuestionnaire from "../components/ReadinessQuestionnaire";

const ReadinessScore = () => {
  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src="/traffic-light.png" alt="Traffic Light" className="w-16 h-16 object-contain" />
              <h1 className="font-serif text-5xl font-bold text-white">
                Aliya Readiness Score™
              </h1>
            </div>
            <p className="text-xl text-white leading-relaxed">
              Take this 10-minute self-assessment to see how prepared you are for Aliyah. 
              You'll receive a personalized readiness report with your top gaps and next steps.
            </p>
          </div>
        </div>
      </div>

      {/* Questionnaire Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <ReadinessQuestionnaire />
        </div>
      </div>
    </Layout>
  );
};

export default ReadinessScore;

