import { useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import {
  Calculator,
  Landmark,
  PiggyBank,
  MessageSquare,
  ScrollText,
  Scale,
  ChevronRight,
  Loader2,
  RefreshCw,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";

// =====================================================================
// ALIYA FINANCIAL — Educational Tools Suite
// RIA-COMPLIANT: All tools provide GENERAL EDUCATION ONLY.
// System prompts prohibit individualized advice, predictions, or
// performance claims. Every response carries a disclosure footer.
//
// Requests go through the Vercel serverless proxy at /api/tool-education,
// which holds ANTHROPIC_API_KEY as an environment variable.
// =====================================================================

const API_URL = "/api/tool-education";

const SHARED_COMPLIANCE_RULES = `
STRICT COMPLIANCE RULES — YOU MUST FOLLOW ALL OF THESE:
- You are an EDUCATIONAL tool on the website of Aliya Financial LLC, a registered investment adviser. You provide GENERAL EDUCATION ONLY — never individualized investment, tax, insurance, or legal advice.
- NEVER tell the user what they specifically "should" do with their assets or benefits. Frame everything as "people in situations like this typically consider..." or "the factors that generally drive this decision are..."
- NEVER predict specific outcomes, returns, tax amounts, benefit amounts, or savings figures. No dollar estimates of what the user will pay, save, or receive. Directional and conceptual only.
- NEVER make performance claims or use hypothetical client results.
- Do not interpret treaty provisions, statutes, or regulations as applied to the user's specific facts — describe them at the general level and note that application depends on individual circumstances.
- If the user's input suggests urgency, distress, or an imminent irreversible decision, gently note that decisions like this benefit from professional review before acting.
- Always close with exactly this line, verbatim, as the final paragraph: "This is general educational information, not personalized advice. How these considerations apply to your specific situation depends on facts a website tool cannot evaluate — a conversation can. You can schedule a complimentary consultation with Aliya Financial to discuss your circumstances."
- Keep responses to 250-400 words. Use short paragraphs. No markdown headers. You may use a short dash-list for enumerable considerations.
- Write with genuine expertise and specificity about U.S.-Israel cross-border planning concepts — the education should be substantive, not generic filler. Demonstrate command of the terrain (e.g., the 10-year new-oleh exemption concept, PFIC issues with Israeli funds, absence of a U.S.-Israel totalization agreement, Israeli inheritance law vs. U.S. estate framework) at the conceptual level.
- Output plain text only — no markdown syntax of any kind (no asterisks, underscores, or headers; a simple dash-list is the only allowed structure).
- Use regulatory and Israeli terms precisely: FATCA (never FCPA), FBAR, PFIC, mas rechisha for Israeli purchase tax. If unsure of a term, describe the concept without naming it.
`;

interface ToolField {
  key: string;
  label: string;
  type: "select" | "multi" | "textarea";
  options?: string[];
  placeholder?: string;
}

interface ToolDef {
  id: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  system: string;
  fields: ToolField[];
  buildPrompt: (v: Record<string, string>) => string;
}

const TOOLS: ToolDef[] = [
  {
    id: "tax",
    icon: Calculator,
    title: "Aliyah Tax Considerations Explorer",
    tagline: "The cross-border tax landscape for a move like yours",
    description:
      "Answer a few general questions and get an educational overview of the U.S.–Israel tax considerations that typically apply to situations like yours.",
    system: `You are the Aliyah Tax Considerations Explorer for Aliya Financial. Given a general profile (age range, income range, account types, move timeframe), produce an educational overview of the U.S.-Israel cross-border tax CONSIDERATIONS that typically apply to profiles like this. Cover, as relevant: the concept of Israel's 10-year exemption period for new immigrants and what it generally does and does not cover; continuing U.S. filing obligations for citizens abroad; the general PFIC problem with Israeli pooled investments; timing concepts around the tax year of a move; and why account restructuring is usually examined before, not after, a move. ${SHARED_COMPLIANCE_RULES}`,
    fields: [
      { key: "age", label: "Age range", type: "select", options: ["Under 40", "40–49", "50–59", "60–69", "70+"] },
      { key: "income", label: "Household income range (USD)", type: "select", options: ["Under $100k", "$100k–$250k", "$250k–$500k", "$500k+", "Prefer not to say"] },
      { key: "accounts", label: "Account types you hold (select all that apply)", type: "multi", options: ["Traditional IRA / 401(k)", "Roth IRA / Roth 401(k)", "Taxable brokerage", "Business ownership", "Rental real estate", "Pension"] },
      { key: "timeline", label: "Move timeframe", type: "select", options: ["Within 12 months", "1–3 years", "3–5 years", "Someday / exploring", "Not moving — planning for the possibility"] },
    ],
    buildPrompt: (v) =>
      `Profile: age ${v.age}; household income ${v.income}; holds: ${v.accounts || "not specified"}; move timeframe: ${v.timeline}. Provide the educational overview of typical U.S.-Israel tax considerations for a profile like this.`,
  },
  {
    id: "ss",
    icon: Landmark,
    title: "Social Security & Israel Explainer",
    tagline: "How U.S. benefits generally work for Americans in Israel",
    description:
      "Learn how Social Security and Medicare generally interact with a move to Israel — including the questions people most often overlook.",
    system: `You are the Social Security & Israel Explainer for Aliya Financial. Given a general profile, produce an educational overview covering, as relevant: that U.S. citizens can generally continue receiving Social Security while living in Israel; the significance of there being NO U.S.-Israel totalization agreement and what totalization agreements generally address (coordination of coverage and credits for people who work in both systems); the general Medicare questions a move raises (Part A retention, the Part B premium/penalty tradeoff for people who might return, Medicare's general non-coverage abroad); and how Israel's Bituach Leumi is a separate system with its own rules. Do not estimate anyone's benefit amount. ${SHARED_COMPLIANCE_RULES}`,
    fields: [
      { key: "age", label: "Age range", type: "select", options: ["Under 55", "55–61", "62–66", "67–70", "70+"] },
      { key: "claiming", label: "Social Security status", type: "select", options: ["Not yet claiming", "Currently receiving benefits", "Not sure when to claim"] },
      { key: "work", label: "Do you expect to work in Israel?", type: "select", options: ["Yes", "No", "Possibly / part-time"] },
      { key: "timeline", label: "Move timeframe", type: "select", options: ["Within 12 months", "1–3 years", "3–5 years", "Someday / exploring"] },
    ],
    buildPrompt: (v) =>
      `Profile: age ${v.age}; Social Security status: ${v.claiming}; expects to work in Israel: ${v.work}; move timeframe: ${v.timeline}. Provide the educational overview of how U.S. Social Security and Medicare generally interact with a move like this.`,
  },
  {
    id: "roth",
    icon: PiggyBank,
    title: "Roth & Aliyah Decision Framework",
    tagline: "The factors that typically drive the Roth question",
    description:
      "One of the most common — and most misunderstood — Aliyah planning questions. See the framework people typically use to think it through.",
    system: `You are the Roth & Aliyah Decision Framework tool for Aliya Financial. Produce an educational explanation of why Roth accounts raise a genuine cross-border question: at a general level, the U.S.-Israel tax treaty's treatment of Roth accounts is a known area of ambiguity, and Israel's taxation of Roth distributions after the exemption period is not guaranteed to mirror the U.S. tax-free treatment. Explain the FACTORS that typically drive how people think about this: time horizon relative to the 10-year exemption window, the mix of Roth vs. traditional assets, conversion timing questions people typically examine BEFORE a move rather than after, and the difference between what is settled and what remains uncertain. Emphasize that this is precisely the kind of question where professional analysis of individual facts matters, without resolving it for the user. ${SHARED_COMPLIANCE_RULES}`,
    fields: [
      { key: "age", label: "Age range", type: "select", options: ["Under 40", "40–49", "50–59", "60–69", "70+"] },
      { key: "rothsize", label: "Roth assets (approximate share of retirement savings)", type: "select", options: ["Small share (<25%)", "Meaningful share (25–50%)", "Majority (50%+)", "Considering conversions"] },
      { key: "timeline", label: "Move timeframe", type: "select", options: ["Within 12 months", "1–3 years", "3–5 years", "Someday / exploring"] },
    ],
    buildPrompt: (v) =>
      `Profile: age ${v.age}; Roth position: ${v.rothsize}; move timeframe: ${v.timeline}. Provide the educational framework for how people in situations like this typically think about the Roth question in Aliyah planning.`,
  },
  {
    id: "readiness",
    icon: MessageSquare,
    title: "Aliyah Financial Readiness Review",
    tagline: "Describe your situation — see the gaps people typically miss",
    description:
      "Describe your situation in your own words. Get an educational read on the planning areas families like yours most often have gaps in — and what typically gets addressed first.",
    system: `You are the Aliyah Financial Readiness Review for Aliya Financial. The user will describe their situation in free text. Identify, at a GENERAL level, the 3-5 planning areas where families in situations like theirs most commonly have gaps (e.g., account restructuring before opening Israeli investment accounts, healthcare bridging, tax-year timing, estate documents that work in both countries, currency exposure of retirement income). Order them by what is typically addressed first given their timeline. Frame everything as what families like theirs commonly encounter — never as a diagnosis of their specific readiness or a prescription. Do NOT assign scores or verdicts like "ready" or "not ready." ${SHARED_COMPLIANCE_RULES}`,
    fields: [
      { key: "situation", label: "Describe your situation (family, work, timeline, what you've done so far)", type: "textarea", placeholder: "e.g., We're in our late 50s, two kids in college, thinking about Aliyah in 3–4 years. We have retirement accounts and a house we'd probably sell..." },
    ],
    buildPrompt: (v) => `The user describes their situation as follows: "${v.situation}". Provide the educational readiness review.`,
  },
  {
    id: "estate",
    icon: ScrollText,
    title: "Two-Country Estate Planning Snapshot",
    tagline: "Where U.S. and Israeli frameworks typically diverge",
    description:
      "U.S. estate documents don't always do what people expect once Israel is in the picture. See the considerations families typically need to examine.",
    system: `You are the Two-Country Estate Planning Snapshot for Aliya Financial. Given a general family/asset profile, produce an educational overview of the cross-border estate considerations families like this typically examine: the general divergence between the U.S. estate/gift tax framework and Israel's inheritance framework (Israel currently has no estate tax but has its own succession law); why a U.S. will may interact unexpectedly with Israeli succession procedure and why families often examine whether documents work in both jurisdictions; beneficiary designations on U.S. retirement accounts as a separate layer from wills; and situs questions for real property in each country. Do not evaluate the sufficiency of the user's documents. ${SHARED_COMPLIANCE_RULES}`,
    fields: [
      { key: "family", label: "Family situation", type: "select", options: ["Married, children", "Married, no children", "Single", "Blended family", "Grandchildren in the picture"] },
      { key: "assets", label: "Asset types (select all that apply)", type: "multi", options: ["U.S. real estate", "Israeli real estate (own or plan to buy)", "Retirement accounts", "Business interests", "Taxable investments"] },
      { key: "docs", label: "Current documents", type: "select", options: ["U.S. will/trust in place", "Documents in both countries", "Nothing formal yet", "Not sure what we have"] },
    ],
    buildPrompt: (v) =>
      `Profile: family situation: ${v.family}; assets: ${v.assets || "not specified"}; current documents: ${v.docs}. Provide the educational overview of two-country estate considerations for families like this.`,
  },
  {
    id: "scenario",
    icon: Scale,
    title: "The Two-Country Scenario — Preview",
    tagline: "What generally shifts between staying and moving",
    description:
      "A conceptual preview of our signature planning model: the financial variables that typically shift when a household moves from the U.S. to Israel — and which ones people most often overlook.",
    system: `You are the Two-Country Scenario Preview for Aliya Financial. This is a conceptual, ILLUSTRATIVE preview of the firm's stay-vs-move scenario modeling. Given a general profile, describe — qualitatively and directionally ONLY, with zero dollar figures — the categories of financial variables that typically shift between a "stay in the U.S." path and a "move to Israel" path for households like this: tax residency and the exemption-period concept, retirement income sourcing and currency exposure, healthcare cost structure differences, housing decisions on both sides, and estate framework differences. Note which of these people most often overlook. Make clear this is the conceptual skeleton of a full side-by-side model, which requires individual analysis to populate. ${SHARED_COMPLIANCE_RULES}`,
    fields: [
      { key: "stage", label: "Life stage", type: "select", options: ["Working years", "Approaching retirement (5–10 yrs)", "Recently retired", "Retired 5+ years"] },
      { key: "housing", label: "Housing picture", type: "select", options: ["Own U.S. home, would sell", "Own U.S. home, would keep", "Rent in the U.S.", "Already own in Israel too"] },
      { key: "timeline", label: "How live is the Israel question?", type: "select", options: ["Actively planning a move", "Serious possibility", "Someday maybe", "Unlikely, but want it modeled"] },
    ],
    buildPrompt: (v) =>
      `Profile: life stage: ${v.stage}; housing: ${v.housing}; Israel question status: ${v.timeline}. Provide the conceptual stay-vs-move preview for households like this.`,
  },
];

// ---------------------------------------------------------------------

const Disclosure = () => {
  return (
    <div className="text-xs leading-relaxed text-slate-500 bg-slate-50 border border-slate-200 rounded-lg p-3">
      <span className="font-semibold text-slate-600">Educational tool — not advice. </span>
      This tool provides general educational information only and does not constitute individualized
      investment, tax, or legal advice. Results are illustrative, based on general principles rather than
      your specific circumstances, and may not reflect recent changes in law. Aliya Financial LLC is a
      registered investment adviser. Please consult a qualified professional before making financial decisions.
    </div>
  );
};

interface FieldProps {
  field: ToolField;
  value: string | undefined;
  onChange: (value: string) => void;
}

const Field = ({ field, value, onChange }: FieldProps) => {
  if (field.type === "textarea") {
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-primary">{field.label}</label>
        <textarea
          className="w-full border border-input rounded-lg p-3 text-sm min-h-28 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
          placeholder={field.placeholder || ""}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
  if (field.type === "multi") {
    const selected = value ? value.split("; ") : [];
    const toggle = (opt: string) => {
      const next = selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt];
      onChange(next.join("; "));
    };
    return (
      <div className="space-y-1">
        <label className="text-sm font-medium text-primary">{field.label}</label>
        <div className="flex flex-wrap gap-2">
          {(field.options || []).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`text-xs px-3 py-1.5 rounded-full border transition ${
                selected.includes(opt)
                  ? "bg-primary text-white border-transparent"
                  : "text-slate-600 border-slate-300 bg-white hover:border-slate-400"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-primary">{field.label}</label>
      <select
        className="w-full border border-input rounded-lg p-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Select…</option>
        {(field.options || []).map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
};

interface AnthropicContentBlock {
  type: string;
  text?: string;
}

interface AnthropicResponse {
  content?: AnthropicContentBlock[];
}

const ToolPanel = ({ tool }: { tool: ToolDef }) => {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ready = tool.fields.every((f) => (values[f.key] || "").trim().length > 0);

  async function run() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: tool.system,
          messages: [{ role: "user", content: tool.buildPrompt(values) }],
        }),
      });
      const data: AnthropicResponse = await res.json();
      const text = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n");
      if (!text) throw new Error("Empty response");
      setResult(text);
    } catch {
      setError("Something went wrong generating your overview. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-primary">{tool.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
      </div>

      <Disclosure />

      <div className="grid gap-4">
        {tool.fields.map((f) => (
          <Field key={f.key} field={f} value={values[f.key]} onChange={(v) => setValues((s) => ({ ...s, [f.key]: v }))} />
        ))}
      </div>

      <button
        onClick={run}
        disabled={!ready || loading}
        className="btn-gold inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-40 transition"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
        {loading ? "Preparing your educational overview…" : "See the considerations"}
      </button>

      {error && <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">{error}</div>}

      {result && (
        <div className="space-y-4">
          <div className="bg-white border border-gold-500 rounded-xl p-5 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
            {result}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <CalendarCheck className="w-4 h-4" /> Schedule a complimentary consultation
            </Link>
            <button
              onClick={() => { setResult(null); setValues({}); }}
              className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2.5 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-400"
            >
              <RefreshCw className="w-4 h-4" /> Start over
            </button>
          </div>
          <p className="text-xs text-slate-400 italic">
            General educational information only — not individualized investment, tax, or legal advice. Illustrative and
            hypothetical; application depends on your specific circumstances.
          </p>
        </div>
      )}
    </div>
  );
};

const Tools = () => {
  const [active, setActive] = useState(TOOLS[0].id);
  const tool = TOOLS.find((t) => t.id === active) ?? TOOLS[0];

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-gold-500 mb-4">
              Aliya Financial · Learning Tools
            </p>
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              Cross-Border Planning, Explained
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Free educational tools that map the U.S.–Israel financial terrain — whether you're moving next year,
              someday, or just want the question answered.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <nav className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TOOLS.map((t) => {
                const Icon = t.icon;
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`text-left rounded-xl border p-3 transition ${
                      isActive
                        ? "bg-primary text-white border-transparent shadow-md"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1.5 ${isActive ? "text-gold-500" : "text-primary"}`} />
                    <div className="text-xs font-semibold leading-tight">{t.title}</div>
                  </button>
                );
              })}
            </nav>

            <main className="bg-white rounded-2xl card-shadow p-6">
              <ToolPanel key={tool.id} tool={tool} />
            </main>

            <footer className="text-xs text-slate-400 text-center leading-relaxed max-w-2xl mx-auto">
              Aliya Financial LLC is a registered investment adviser. These tools are provided for general educational
              purposes, are not a solicitation or offer of advisory services in any jurisdiction where the firm is not
              properly registered or exempt, and do not create an advisory relationship. Hypothetical or illustrative
              content does not represent actual client experiences or outcomes.
            </footer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
