import { Link } from "react-router-dom";
import { PieChart, Compass, FileText, Check, ArrowRight, type LucideIcon } from "lucide-react";

// Homepage services teaser — three tiers, general-planning-first. Tier 2 is
// the flagship (U.S.-Israel relocation/Aliyah) but is presented alongside,
// not instead of, everyday financial and retirement planning. Full detail
// lives on /services (general) and /aliya-project-planning (flagship pricing tiers).

interface Tier {
  icon: LucideIcon;
  title: string;
  description: string;
  includes: string[];
  cta: string;
  to: string;
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    icon: PieChart,
    title: "Financial & Retirement Planning",
    description:
      "Comprehensive planning for retirement, investments, and wealth transfer — built to stand on its own, wherever life takes you next.",
    includes: [
      "Retirement income & Social Security strategy",
      "Investment & portfolio management",
      "Estate and wealth transfer planning",
    ],
    cta: "Explore Financial Planning",
    to: "/services",
  },
  {
    icon: Compass,
    title: "U.S.–Israel Relocation & Aliya Planning",
    description:
      "Our flagship specialty: structured, coordinated planning for families relocating between the U.S. and Israel.",
    includes: [
      "Dual-country tax mapping",
      "Cross-border benefits & currency planning",
      "Phased project management, start to finish",
    ],
    cta: "Explore Aliya Planning",
    to: "/aliya-project-planning",
    featured: true,
  },
  {
    icon: FileText,
    title: "Financial Snapshots & Plans",
    description:
      "Not ready for a full engagement? Start with a complimentary snapshot — an educational, no-cost look at where you stand today.",
    includes: [
      "Free, no-obligation initial conversation",
      "Educational overview, not a sales pitch",
      "A natural first step before a full plan",
    ],
    cta: "Request a Free Snapshot",
    to: "/contact",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              How We Help
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              From everyday retirement and investment planning to specialized U.S.–Israel relocation
              support, our services meet you wherever you are in the process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {TIERS.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className={`relative flex flex-col rounded-2xl bg-card p-7 ${
                    t.featured
                      ? "border-2 border-gold-500 shadow-lg md:-my-3 md:py-10"
                      : "card-shadow"
                  }`}
                >
                  {t.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[11px] font-bold text-white bg-gold-500 px-3 py-1 rounded-full">
                      OUR SPECIALTY
                    </span>
                  )}
                  <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-gold-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">{t.title}</h3>
                  <p className="text-sm text-card-foreground leading-relaxed mb-4">
                    {t.description}
                  </p>
                  <ul className="space-y-2 mb-5">
                    {t.includes.map((line) => (
                      <li key={line} className="flex gap-2 text-sm text-slate-600 leading-snug">
                        <Check className="w-4 h-4 shrink-0 mt-0.5 text-gold-500" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={t.to}
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
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
