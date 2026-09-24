import { useParams, Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import Layout from "@/components/Layout";
import { getLifeEvent } from "@/data/lifeEvents";
import NotFound from "./NotFound";

const LifeEvent = () => {
  const { slug } = useParams<{ slug: string }>();
  const event = slug ? getLifeEvent(slug) : undefined;

  if (!event) {
    return <NotFound />;
  }

  const Icon = event.icon;

  return (
    <Layout>
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center mx-auto mb-4">
              <Icon size={28} className="text-gold-500" />
            </div>
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              {event.pageTitle}
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              {event.pageIntro}
            </p>
          </div>
        </div>
      </div>

      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                Why It Matters
              </h2>
              <ul className="diamond-bullets space-y-3 text-muted-foreground leading-snug">
                {event.whyItMatters.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">
                How We Help
              </h2>
              <ul className="diamond-bullets space-y-3 text-muted-foreground leading-snug">
                {event.howWeHelp.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {event.slug === "aliya" && (
            <div className="max-w-3xl mx-auto text-center mt-10 pt-10 border-t border-border">
              <h3 className="font-serif text-xl font-bold text-primary mb-3">
                Why Cross-Border Planning Is Different
              </h3>
              <p className="fs-body text-muted-foreground leading-normal">
                A financial plan built for one country doesn't automatically work
                in two. Tax residency rules, retirement account treatment,
                currency exposure, and estate law all shift once Israel enters
                the picture — and the U.S. and Israeli systems don't always agree
                with each other. Planning across both means coordinating
                decisions that, made in isolation, can quietly work against you.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="cta-panel text-center px-6 py-5 shadow-lg">
              <h2 className="font-serif text-xl font-bold text-primary mb-2">
                A free 30-minute conversation.
              </h2>
              <hr className="hairline-gold" />
              <p className="text-primary/70 text-sm mt-2 mb-4">
                No products. No pressure. Ask us anything.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md font-semibold text-gold-600 hover:text-gold-500 transition-colors"
              >
                <Calendar size={18} />
                <span>Schedule a Free Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LifeEvent;
