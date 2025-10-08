import Layout from "@/components/Layout";

const News = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              In the News
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Featured articles about Aliya Financial and our cross-border financial planning expertise.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Article 4 - Top */}
            <div className="flex justify-center">
              <img 
                src="/Article4.jpg" 
                alt="Aliya Financial article featuring the A.L.I.Y.A. Framework and key takeaways for cross-border financial planning"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Article 3 - Bottom */}
            <div className="flex justify-center">
              <img 
                src="/Article3.jpg" 
                alt="Community News: Aliya Financial presents at Highland Park's Congregation Ohav Emeth"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;
