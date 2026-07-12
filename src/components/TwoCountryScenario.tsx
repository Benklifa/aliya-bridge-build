import { Link } from "react-router-dom";
import {
  Scale,
  TrendingUp,
  HeartPulse,
  Home,
  ScrollText,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

// "The Two-Country Scenario" — named deliverable block for the Services page.

interface ScenarioDimension {
  icon: LucideIcon;
  label: string;
  line: string;
}

const SCENARIO_DIMENSIONS: ScenarioDimension[] = [
  {
    icon: Scale,
    label: "Tax residency & timing",
    line: "How the exemption-period concept and the timing of a move generally interact with both tax systems.",
  },
  {
    icon: TrendingUp,
    label: "Retirement income & currency",
    line: "How income sourcing and shekel-dollar exposure typically shift between the two paths.",
  },
  {
    icon: HeartPulse,
    label: "Healthcare structure",
    line: "How coverage and cost structures generally differ — and the Medicare decisions a move raises.",
  },
  {
    icon: Home,
    label: "Housing on both sides",
    line: "The sell-keep-rent questions on the U.S. side and the buy-rent questions on the Israeli side.",
  },
  {
    icon: ScrollText,
    label: "Estate frameworks",
    line: "Where the U.S. estate framework and Israeli succession law typically diverge for cross-border families.",
  },
];

const TwoCountryScenario = () => {
  return (
    <section className="py-14 px-4 bg-primary">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-gold-500 mb-3">
          Our signature planning model
        </p>
        <h2 className="font-serif text-3xl font-bold text-white mb-4">
          The Two-Country Scenario
        </h2>
        <p className="text-slate-200 leading-relaxed max-w-2xl mb-10">
          Every plan can include a side-by-side model of staying versus making
          Aliyah — with the tax, income, and estate differences laid out year by
          year. So the decision is informed and quantified, not hypothetical —
          whether you act on it this year, in ten years, or never.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {SCENARIO_DIMENSIONS.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.label}
                className="flex gap-4 rounded-xl bg-white/5 border border-white/10 p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-gold-500 flex items-center justify-center shrink-0">
                  <Icon className="text-white" size={18} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">
                    {d.label}
                  </div>
                  <div className="text-xs leading-relaxed text-slate-300">
                    {d.line}
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA card fills the sixth grid slot */}
          <Link
            to="/contact"
            className="group flex items-center justify-between rounded-xl bg-gold-500 p-4 transition hover:brightness-110"
          >
            <div>
              <div className="text-sm font-bold text-white mb-1">
                See it built for your numbers
              </div>
              <div className="text-xs text-white/85">
                Schedule a complimentary consultation
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Scenario models are illustrative planning frameworks based on the
          information provided and stated assumptions — not projections or
          guarantees of any outcome, tax result, or benefit amount. Aliya
          Financial LLC is a registered investment adviser.
        </p>
      </div>
    </section>
  );
};

export default TwoCountryScenario;
