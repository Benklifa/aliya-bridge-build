import Layout from "../components/Layout";

const ReadinessScore = () => {
  return (
    <Layout>
      {/* Header Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              Aliya Readiness Score™
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Take this 10-minute self-assessment to see how prepared you are for Aliyah. 
              You'll receive a personalized readiness report with your top gaps and next steps.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section - Empty for future embedding */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg card-shadow p-8 min-h-[400px]">
              {/* This area is reserved for future Manus workflow embedding */}
              <div className="text-center text-gray-500">
                <p className="text-lg">Assessment tool will be embedded here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReadinessScore;

