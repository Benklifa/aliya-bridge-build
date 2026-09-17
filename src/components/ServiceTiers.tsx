import { Link } from "react-router-dom";
import { FileText, Compass, Crown, Check, ArrowRight, type LucideIcon } from "lucide-react";

// Service tiers for the Aliya Project Planning page. No dollar figures by
// design — fees are engagement-specific and described in the advisory
// agreement / Form ADV. Concierge (project management) framed as distinct
// from advisory.

interface Tier {
  icon: LucideIcon;
  name: string;
  type: string;
  pitch: string;
  includes: string[];
  fit: string;
  cta: string;
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    icon: FileText,
    name: "Aliyah Blueprint",
    type: "One-time engagement · flat fee",
    pitch: "The complete written plan — you execute at your own pace.",
    includes: [
      "Full financial plan with the Two-Country Scenario modeled",
      "Cross-border tax mapping and account-restructuring roadmap",
      "Phased 18-month timeline tailored to your move window",
      "Vetted referral list — U.S. and Israel-side professionals",
    ],
    fit: "Best for self-directed families who want the architecture done right, then to drive it themselves.",
    cta: "Start with a Blueprint",
  },
  {
    icon: Compass,
    name: "Guided Aliyah",
    type: "Blueprint + ongoing advisory through the transition",
    pitch: "The plan, plus a co-pilot from decision to landing.",
    includes: [
      "Everything in the Blueprint",
      "Scheduled coordination calls, increasing as the move nears",
      "Plan updates as circumstances and rules change",
      "Warm introductions into our Israel-side professional network",
    ],
    fit: "Best for families who want the plan executed with an experienced hand checking every step.",
    cta: "Explore Guided Aliyah",
    featured: true,
  },
  {
    icon: Crown,
    name: "Full Concierge",
    type: "Hands-on project management · limited availability",
    pitch: "We manage the moving parts — you manage the goodbyes.",
    includes: [
      "Everything in Guided Aliyah",
      "Active management of vendors, documents, and logistics",
      "In-country coordination on the Israel side",
      "Deliberately capped at a small number of families at a time",
    ],
    fit: "Best for families who want a single accountable coordinator across the entire transition.",
    cta: "Ask about availability",
  },
];

const ServiceTiers = () => {
  return (
    <section className="py-14 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs font-bold tracking-widest uppercase text-gold-500 mb-2">
            Three ways to work with us
          </p>
          <h2 className="font-serif text-3xl font-bold text-primary mb-3">
            From Blueprint to Full Concierge
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Every engagement is built on the same planning architecture — the tiers differ in how much
            of the execution we carry for you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-2xl bg-white p-7 ${
                  t.featured
                    ? "border-2 border-gold-500 shadow-lg md:-my-3 md:py-10"
                    : "border border-slate-200 shadow-sm"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white bg-gold-500 px-3 py-1 rounded-full">
                    MOST CHOSEN
                  </span>
                )}
                <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold-500" />
                </div>
                <h3 className="text-xl font-bold text-primary">{t.name}</h3>
                <p className="text-[11px] font-semibold tracking-wide uppercase text-gold-500 mt-1 mb-3">{t.type}</p>
                <p className="text-sm text-slate-700 mb-5">{t.pitch}</p>
                <ul className="space-y-2.5 mb-5">
                  {t.includes.map((line) => (
                    <li key={line} className="flex gap-2 text-sm text-slate-600 leading-snug">
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-gold-500" />
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="text-xs italic text-slate-500 mb-6">{t.fit}</p>
                <Link
                  to="/contact"
                  className={`mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold rounded-lg px-4 py-2.5 text-white transition hover:brightness-110 ${
                    t.featured ? "bg-gold-500" : "bg-primary"
                  }`}
                >
                  {t.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 text-center leading-relaxed max-w-3xl mx-auto mt-10">
          Fees are engagement-specific and disclosed before any work begins; advisory services and fees
          are described in our Form ADV and advisory agreement. Project-management and coordination
          services are distinct from investment advisory services and are covered by a separate fee
          arrangement. Aliya Financial LLC is a registered investment adviser.
        </p>
      </div>
    </section>
  );
};

export default ServiceTiers;
