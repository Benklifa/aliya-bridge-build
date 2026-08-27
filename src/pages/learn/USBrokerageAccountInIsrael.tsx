import PageMeta from "@/components/PageMeta";
import Layout from "@/components/Layout";

/**
 * SCAFFOLD PAGE — placeholder content only.
 * Michael: replace `question`/`answer` and the PageMeta title/description
 * below with compliance-reviewed copy. Same pattern as
 * src/pages/learn/Retirement401kAliyah.tsx — keep the shape (PageMeta,
 * FAQPage JSON-LD built from the same content that renders on the page,
 * Layout wrapper) when scaffolding further pages.
 */
const question = "Can I keep my US brokerage account after moving to Israel?";
const answer =
  "PLACEHOLDER — replace with compliance-reviewed content before publishing.";

const qaJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    },
  ],
});

const USBrokerageAccountInIsrael = () => {
  return (
    <Layout>
      <PageMeta
        title="Can I Keep My US Brokerage Account After Moving to Israel? | Aliya Financial"
        description="PLACEHOLDER — replace with a compliance-reviewed meta description before publishing."
        path="/learn/us-brokerage-account-after-moving-to-israel"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: qaJsonLd }}
      />
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              {question}
            </h1>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default USBrokerageAccountInIsrael;
