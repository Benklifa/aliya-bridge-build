import { Link } from "react-router-dom";
import { Plane, Compass, ArrowRight } from "lucide-react";

// Two-door entry module — sits directly under the homepage hero.
// Door A → the readiness quiz; Door B → the Services page.

const TwoDoorModule = () => {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-sm italic text-muted-foreground mb-8">
          Wherever you are on the journey, start here.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Door A — actively planning */}
          <Link
            to="/readiness"
            className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:shadow-lg hover:border-slate-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5">
              <Plane className="w-6 h-6 text-gold-500" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              We're planning our Aliyah
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 mb-6">
              You have a move in view. We coordinate the financial architecture —
              tax timing, account restructuring, benefits, and a phased plan — so
              nothing falls through the cracks.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 group-hover:gap-3 transition-all">
              Start with the Readiness Quiz
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Door B — someday maybe */}
          <Link
            to="/tools"
            className="group relative rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:shadow-lg hover:border-slate-300"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5">
              <Compass className="w-6 h-6 text-gold-500" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">
              Israel is a possibility — we want it modeled
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 mb-6">
              Maybe someday, maybe never. Either way, an unresolved "what if we
              moved?" quietly distorts real decisions. We build your plan and model
              the Aliyah scenario inside it — so the question is answered, not
              carried.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold-500 group-hover:gap-3 transition-all">
              Explore Aliyah-Ready Planning
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TwoDoorModule;
