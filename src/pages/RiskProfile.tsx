import Layout from "@/components/Layout";
import RiskProfileQuestionnaire from "@/components/RiskProfileQuestionnaire";

const RiskProfile = () => {
  return (
    <Layout hideBuddy={true}>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              Client Risk Profile
            </h1>
            <p className="text-xl text-white leading-relaxed">
              A confidential, two-part questionnaire — your capacity to take risk and your tolerance for it.
            </p>
            <p className="text-sm text-white/90 italic mt-4">
              For illustrative purposes only. Not personalized investment advice.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <RiskProfileQuestionnaire />
        </div>
      </div>
    </Layout>
  );
};

export default RiskProfile;
