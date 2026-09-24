import {
  Scale,
  TrendingUp,
  HeartPulse,
  Home,
  ScrollText,
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
    <section className="py-10 px-4 bg-primary">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs font-bold tracking-widest uppercase text-gold-500 mb-3">
          Our signature planning model
        </p>
        <h2 className="font-serif text-3xl font-bold text-white mb-4">
          The Two-Country Scenario
        </h2>
        <p className="text-slate-200 leading-snug max-w-2xl mb-6">
          Making Aliya introduces structural changes to tax planning, income,
          budget, real estate, estate planning and more. Make decisions that
          are informed and quantified, not hypothetical — whether you act on
          it now, in a year, in ten years or never.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
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
                  <div className="text-xs leading-snug text-slate-300">
                    {d.line}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 leading-snug max-w-2xl">
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
