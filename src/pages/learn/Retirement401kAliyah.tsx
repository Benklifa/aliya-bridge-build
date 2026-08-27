import PageMeta from "@/components/PageMeta";
import Layout from "@/components/Layout";

/**
 * SCAFFOLD PAGE — placeholder content only.
 * Michael: replace `question`/`answer` and the PageMeta title/description
 * below with compliance-reviewed copy. This is the reference pattern for
 * all future src/pages/learn/ pages — keep the shape (PageMeta, FAQPage
 * JSON-LD built from the same content that renders on the page, Layout
 * wrapper) when scaffolding the rest.
 */
const question = "What happens to my 401(k) when I make Aliyah?";
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

const Retirement401kAliyah = () => {
  return (
    <Layout>
      <PageMeta
        title="What Happens to My 401(k) When I Make Aliyah? | Aliya Financial"
        description="PLACEHOLDER — replace with a compliance-reviewed meta description before publishing."
        path="/learn/401k-when-you-make-aliyah"
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

export default Retirement401kAliyah;
