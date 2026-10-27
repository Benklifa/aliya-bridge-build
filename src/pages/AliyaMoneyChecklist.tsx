import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Download } from "lucide-react";
import Layout from "@/components/Layout";

// Download page for the lead magnet "The Aliya Money Checklist"
// (compliance log AC-071, v2 with the five re-review fixes; source
// /workspace/aliya-ads/lead-magnet/aliya-money-checklist.md).
// Not linked from the nav; noindex; not in sitemap. Do not publish until
// Michael gives CCO sign-off on the checklist. All copy requires compliance
// review before any change. Direct download, no email capture.
// Meta Pixel: ViewContent fires from MetaPixelTracker. No Lead (no form).
const PDF_URL = "/downloads/aliya-money-checklist.pdf";

const AliyaMoneyChecklist = () => {
  // Keep this page out of search indexes during client-side navigation too
  // (the prerendered HTML already carries the robots meta tag).
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "robots";
      document.head.appendChild(tag);
    }
    const previous = tag.content;
    tag.content = "noindex";
    return () => {
      if (created) tag?.remove();
      else if (tag) tag.content = previous;
    };
  }, []);

  return (
    <Layout>
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">The Aliya Money Checklist</h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              A money checklist for Americans planning Aliya, organized by time horizon.
            </p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-primary/80 mb-4">
              28 items to review, organize, or plan, in four parts: planning a move in the future, about a
              year out, the final months before the move, and the first months after arriving.
            </p>
            <p className="text-primary/80 mb-8">
              Rules change, and every family's situation is different. Many items are worth reviewing with a
              qualified professional such as a cross-border CPA, Israeli counsel, or a US investment adviser.
            </p>
            <a
              id="download-checklist"
              href={PDF_URL}
              download
              className="btn-gold inline-flex items-center space-x-2 px-6 py-3 rounded-md font-semibold"
            >
              <Download size={18} />
              <span>Download the checklist (PDF)</span>
            </a>
            <p className="text-primary/70 text-sm mt-8">
              Questions about your own situation?{" "}
              <Link to="/contact" className="underline hover:text-accent">
                Request a free consultation
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Page disclosure (compliance review 2026-10-23, required edit 2) */}
      <div className="py-6 bg-white border-t border-border">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            Aliya Financial LLC is registered as an investment adviser with the New Jersey Bureau of
            Securities. Registration does not imply a certain level of skill or training. Investing involves
            risk, including loss of principal. This checklist is educational and general in nature. It is not
            tax, legal, or individualized investment advice. Michael Benklifa is also a licensed insurance
            agent; any insurance is offered separately, may pay him a commission, and carries no advisory
            fee. Aliya Financial LLC is based in the United States, is not licensed in Israel, and does not give Israeli tax advice.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AliyaMoneyChecklist;
