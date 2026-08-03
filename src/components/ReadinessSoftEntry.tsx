import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Low-commitment entry point for the "someday maybe" audience — most people
// who look into Aliyah never make the move, and that's fine. This block
// exists to give them a next step smaller than "talk to an advisor."

const ReadinessSoftEntry = () => {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-3xl mx-auto rounded-2xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
        <p className="text-xs font-bold tracking-widest uppercase text-gold-500 mb-3">
          No Commitment Required
        </p>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary mb-4">
          Not sure Aliyah is even the right move?
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-xl mx-auto">
          Most people who look into Aliyah don't end up making the move — and that's completely
          normal. Before anything else, the Aliya Readiness Score gives you an honest,
          judgment-free look at where you stand. It takes a few minutes, there's no cost, and no
          advisor call required.
        </p>
        <Link
          to="/readiness"
          className="btn-gold inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-base hover:scale-105 transition-transform"
        >
          Take the Free Readiness Score
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-slate-400 italic mt-4">
          For illustrative purposes only. Not personalized investment advice.
        </p>
      </div>
    </section>
  );
};

export default ReadinessSoftEntry;
