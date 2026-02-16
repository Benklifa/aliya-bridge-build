import Layout from "../components/Layout";
import ReadinessQuestionnaire from "../components/ReadinessQuestionnaire";

const ReadinessScore = () => {
  return (
    <Layout hideBuddy={true}>
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
              Take this automated educational readiness assessment to see how prepared you are for Aliyah. 
              You'll receive a general preparedness score with illustrative planning considerations.
            </p>
            <p className="text-sm text-white/90 italic mt-4">
              For illustrative purposes only. Not personalized investment advice.
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

