import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Send,
  Copy,
  Printer,
  RotateCcw,
  Loader2,
  CheckCircle2,
} from "lucide-react";

/* ============================================================
   Aliya Financial — Client Risk Profile Questionnaire
   Two-dimension scoring: Risk CAPACITY (objective) and Risk
   TOLERANCE (subjective). The final model is constrained by the
   LOWER of the two — a defensible, conservative-binding approach.
   Cross-border questions generate advisor-review flags.
   ============================================================ */

interface QuestionOption {
  label: string;
  score?: number;
  flag?: string | null;
}

interface Question {
  id: string;
  section: string;
  dim: "capacity" | "tolerance" | "flag";
  text: string;
  options: QuestionOption[];
}

const SECTIONS = [
  { id: "horizon", label: "Time Horizon & Objectives" },
  { id: "capacity", label: "Financial Capacity" },
  { id: "tolerance", label: "Risk Tolerance" },
  { id: "crossborder", label: "Cross-Border Factors" },
];

const QUESTIONS: Question[] = [
  // ---------- Time horizon & objectives ----------
  {
    id: "q1",
    section: "horizon",
    dim: "capacity",
    text: "When do you expect to begin withdrawing money from this portfolio?",
    options: [
      { label: "Within 3 years", score: 1 },
      { label: "3–5 years", score: 2 },
      { label: "6–10 years", score: 3 },
      { label: "11–20 years", score: 4 },
      { label: "More than 20 years", score: 5 },
    ],
  },
  {
    id: "q2",
    section: "horizon",
    dim: "capacity",
    text: "Once withdrawals begin, over what period do you expect to spend this money?",
    options: [
      { label: "All at once (lump sum need)", score: 1 },
      { label: "Over 1–5 years", score: 2 },
      { label: "Over 6–10 years", score: 3 },
      { label: "Over 10+ years", score: 4 },
      { label: "I don't expect to spend it — legacy / long-term growth", score: 5 },
    ],
  },
  {
    id: "q3",
    section: "horizon",
    dim: "tolerance",
    text: "Which statement best describes your primary objective for this portfolio?",
    options: [
      { label: "Preserve capital — avoiding losses matters most", score: 1 },
      { label: "Generate steady income with modest growth", score: 2 },
      { label: "Balance growth and stability roughly equally", score: 3 },
      { label: "Grow the portfolio; I accept meaningful fluctuation", score: 4 },
      { label: "Maximize long-term growth; short-term losses don't concern me", score: 5 },
    ],
  },
  // ---------- Financial capacity ----------
  {
    id: "q4",
    section: "capacity",
    dim: "capacity",
    text: "How stable are your current sources of income (salary, business, pension)?",
    options: [
      { label: "Unstable or uncertain right now", score: 1 },
      { label: "Somewhat stable, but could change (e.g., career transition, relocation)", score: 2 },
      { label: "Stable single source", score: 3 },
      { label: "Stable with some diversification", score: 4 },
      { label: "Very stable, multiple independent sources", score: 5 },
    ],
  },
  {
    id: "q5",
    section: "capacity",
    dim: "capacity",
    text: "Outside this portfolio, how many months of living expenses do you hold in cash or equivalents?",
    options: [
      { label: "Less than 3 months", score: 1 },
      { label: "3–6 months", score: 2 },
      { label: "6–12 months", score: 3 },
      { label: "12–24 months", score: 4 },
      { label: "More than 24 months", score: 5 },
    ],
  },
  {
    id: "q6",
    section: "capacity",
    dim: "capacity",
    text: "Roughly what portion of your total investable assets will this portfolio represent?",
    options: [
      { label: "Nearly all of it (over 80%)", score: 1 },
      { label: "A majority (60–80%)", score: 2 },
      { label: "About half (40–60%)", score: 3 },
      { label: "A minority (20–40%)", score: 4 },
      { label: "A small portion (under 20%)", score: 5 },
    ],
  },
  {
    id: "q7",
    section: "capacity",
    dim: "capacity",
    text: "If this portfolio lost value at the wrong moment, how would it affect your essential plans (housing, education, retirement date)?",
    options: [
      { label: "Severely — essential plans depend on this money soon", score: 1 },
      { label: "Significantly — I would have to change major plans", score: 2 },
      { label: "Moderately — some plans would be delayed", score: 3 },
      { label: "Mildly — mostly discretionary goals affected", score: 4 },
      { label: "Minimally — my essential needs are covered elsewhere", score: 5 },
    ],
  },
  // ---------- Risk tolerance ----------
  {
    id: "q8",
    section: "tolerance",
    dim: "tolerance",
    text: "Imagine your portfolio fell 20% in three months during a market decline. What would you most likely do?",
    options: [
      { label: "Sell everything to prevent further losses", score: 1 },
      { label: "Sell a portion and move to safer holdings", score: 2 },
      { label: "Hold, but with real anxiety", score: 3 },
      { label: "Hold comfortably — declines are part of investing", score: 4 },
      { label: "Invest more while prices are lower", score: 5 },
    ],
  },
  {
    id: "q9",
    section: "tolerance",
    dim: "tolerance",
    text: "Which hypothetical one-year outcome range would you be most comfortable with? (Illustrative only — not a projection.)",
    options: [
      { label: "Best +6% / Worst −2%", score: 1 },
      { label: "Best +10% / Worst −6%", score: 2 },
      { label: "Best +16% / Worst −12%", score: 3 },
      { label: "Best +24% / Worst −20%", score: 4 },
      { label: "Best +32% / Worst −28%", score: 5 },
    ],
  },
  {
    id: "q10",
    section: "tolerance",
    dim: "tolerance",
    text: "How would you describe your experience with investing?",
    options: [
      { label: "None — this is new to me", score: 1 },
      { label: "Limited — bank deposits, savings plans", score: 2 },
      { label: "Moderate — mutual funds, ETFs, retirement accounts", score: 3 },
      { label: "Substantial — individual stocks and bonds", score: 4 },
      { label: "Extensive — options, alternatives, multiple market cycles", score: 5 },
    ],
  },
  {
    id: "q11",
    section: "tolerance",
    dim: "tolerance",
    text: "Which statement do you agree with most?",
    options: [
      { label: "I would rather earn less and never watch my account fall", score: 1 },
      { label: "Small, steady gains are worth giving up higher returns", score: 2 },
      { label: "I can accept moderate swings for moderately better returns", score: 3 },
      { label: "Larger swings are acceptable if long-term returns are higher", score: 4 },
      { label: "Volatility is the price of growth — I focus only on the long term", score: 5 },
    ],
  },
  // ---------- Cross-border ----------
  {
    id: "q12",
    section: "crossborder",
    dim: "flag",
    text: "Are you planning a relocation between the U.S. and Israel?",
    options: [
      { label: "Yes — within the next 2 years", flag: "relocation-near" },
      { label: "Yes — in 2–5 years", flag: "relocation-mid" },
      { label: "Considering it, no timeline yet", flag: "relocation-considering" },
      { label: "Already relocated / dual-country household", flag: "dual-country" },
      { label: "No relocation planned", flag: null },
    ],
  },
  {
    id: "q13",
    section: "crossborder",
    dim: "flag",
    text: "In what currency do you expect most of your future spending to occur?",
    options: [
      { label: "Mostly U.S. dollars", flag: null },
      { label: "Mostly Israeli shekels", flag: "ils-spending" },
      { label: "A meaningful mix of both", flag: "mixed-currency" },
      { label: "Uncertain at this point", flag: "currency-uncertain" },
    ],
  },
  {
    id: "q14",
    section: "crossborder",
    dim: "flag",
    text: "Do you hold retirement or investment accounts in both countries (e.g., IRA/401(k) and keren pensia/kupat gemel)?",
    options: [
      { label: "U.S. accounts only", flag: null },
      { label: "Israeli accounts only", flag: "il-accounts" },
      { label: "Accounts in both countries", flag: "dual-accounts" },
      { label: "Not sure what I hold", flag: "accounts-unclear" },
    ],
  },
];

const FLAG_NOTES: Record<string, string> = {
  "relocation-near":
    "Relocation planned within 2 years — near-term liquidity and currency needs should be carved out before applying a long-term model.",
  "relocation-mid":
    "Relocation planned in 2–5 years — moving costs and transition reserves may shorten the effective horizon for part of the portfolio.",
  "relocation-considering":
    "Relocation under consideration — revisit this profile when a timeline firms up.",
  "dual-country":
    "Dual-country household — tax treatment, reporting (PFIC, FBAR/FATCA), and account eligibility should be reviewed before implementation.",
  "ils-spending":
    "Future spending expected in shekels — currency exposure of the model should be reviewed against ILS-denominated liabilities.",
  "mixed-currency":
    "Spending expected in both currencies — consider how each sleeve of the portfolio maps to USD vs. ILS needs.",
  "currency-uncertain":
    "Currency of future spending is uncertain — flag for planning conversation before finalizing allocation.",
  "il-accounts":
    "Israeli accounts only — U.S. tax treatment of Israeli investment vehicles requires review before any recommendation.",
  "dual-accounts":
    "Accounts in both countries — coordination across jurisdictions (asset location, PFIC exposure, treaty treatment) should precede implementation.",
  "accounts-unclear":
    "Existing holdings unclear — a full account inventory is needed before any model is implemented.",
};

interface ModelDetail {
  label: string;
  pct: number;
}

interface RiskModel {
  level: number;
  name: string;
  summary: string;
  equity: number;
  fixed: number;
  cash: number;
  detail: ModelDetail[];
}

const MODELS: RiskModel[] = [
  {
    level: 1,
    name: "Capital Preservation",
    summary: "Prioritizes stability and liquidity. Designed for short horizons or low capacity for loss.",
    equity: 20,
    fixed: 68,
    cash: 12,
    detail: [
      { label: "U.S. equity", pct: 14 },
      { label: "International equity", pct: 6 },
      { label: "Short-term bonds / Treasuries", pct: 40 },
      { label: "Core investment-grade bonds", pct: 28 },
      { label: "Cash & money market", pct: 12 },
    ],
  },
  {
    level: 2,
    name: "Conservative Income",
    summary: "Emphasizes income and downside moderation with a modest growth component.",
    equity: 35,
    fixed: 57,
    cash: 8,
    detail: [
      { label: "U.S. equity", pct: 24 },
      { label: "International equity", pct: 11 },
      { label: "Short-term bonds / Treasuries", pct: 22 },
      { label: "Core investment-grade bonds", pct: 35 },
      { label: "Cash & money market", pct: 8 },
    ],
  },
  {
    level: 3,
    name: "Balanced",
    summary: "Roughly equal emphasis on growth and stability across market cycles.",
    equity: 52,
    fixed: 42,
    cash: 6,
    detail: [
      { label: "U.S. equity", pct: 34 },
      { label: "International equity", pct: 18 },
      { label: "Short-term bonds / Treasuries", pct: 12 },
      { label: "Core investment-grade bonds", pct: 30 },
      { label: "Cash & money market", pct: 6 },
    ],
  },
  {
    level: 4,
    name: "Growth",
    summary: "Growth-oriented with a meaningful fixed income buffer. Expects significant interim fluctuation.",
    equity: 70,
    fixed: 26,
    cash: 4,
    detail: [
      { label: "U.S. equity", pct: 45 },
      { label: "International equity", pct: 25 },
      { label: "Core investment-grade bonds", pct: 26 },
      { label: "Cash & money market", pct: 4 },
    ],
  },
  {
    level: 5,
    name: "Aggressive Growth",
    summary: "Maximum long-term growth orientation. Suitable only where both capacity and tolerance for loss are high.",
    equity: 88,
    fixed: 9,
    cash: 3,
    detail: [
      { label: "U.S. equity", pct: 56 },
      { label: "International equity", pct: 32 },
      { label: "Core investment-grade bonds", pct: 9 },
      { label: "Cash & money market", pct: 3 },
    ],
  },
];

const DISCLOSURES = [
  "This questionnaire is an educational and information-gathering tool. It does not, by itself, constitute investment advice or a recommendation.",
  "The model portfolio shown is a preliminary illustration. Any actual recommendation will be made only by your adviser after a review of your complete financial circumstances, and will be documented in your advisory agreement and suitability profile.",
  "Target allocations are illustrative. Actual portfolios may differ, and allocations may change over time. Hypothetical outcome ranges shown in this questionnaire are illustrative only and are not projections or guarantees.",
  "All investing involves risk, including possible loss of principal. Diversification and asset allocation do not ensure a profit or protect against loss.",
  "Cross-border circumstances (tax residency, currency needs, account types such as PFICs, and reporting obligations) can materially affect what is appropriate for you and require individual review.",
  "Aliya Financial LLC is a registered investment adviser. Registration does not imply a certain level of skill or training.",
];

/* Advisor intake address — matches the address shown on /contact */
const ADVISOR_EMAIL = "Michael@AliyaFinancial.com";

/* ------------------------ types ------------------------ */

type Answers = Record<string, number>;

interface Results {
  capacity: number;
  tolerance: number;
  level: number;
  flags: string[];
  divergence: boolean;
  relocationCap: boolean;
}

type DeliveryKey = "copy" | "advisor";
type DeliveryStatus = "working" | "done" | "error" | undefined;

/* ------------------------ helpers ------------------------ */

function buildSummaryText({
  clientName,
  results,
  model,
  answers,
  completedAt,
  full,
}: {
  clientName: string;
  results: Results;
  model: RiskModel;
  answers: Answers;
  completedAt: string;
  full: boolean;
}): string {
  const L: string[] = [];
  L.push("ALIYA FINANCIAL — CLIENT RISK PROFILE (PRELIMINARY)");
  if (clientName) L.push(`Client: ${clientName}`);
  L.push(`Completed: ${completedAt}`);
  L.push("");
  L.push(`Preliminary model: ${model.name} (Level ${model.level} of 5)`);
  L.push(`Risk capacity score: ${results.capacity.toFixed(1)} / 5.0`);
  L.push(`Risk tolerance score: ${results.tolerance.toFixed(1)} / 5.0`);
  L.push(`Illustrative allocation: ${model.equity}% equity / ${model.fixed}% fixed income / ${model.cash}% cash`);
  if (results.relocationCap) L.push("Note: model limited to Balanced pending review of near-term relocation plans.");
  if (results.divergence) L.push("Note: capacity and tolerance scores diverge meaningfully — adviser review recommended.");
  if (results.flags.length) {
    L.push("");
    L.push("Cross-border items for adviser review:");
    results.flags.forEach((f) => L.push(`- ${FLAG_NOTES[f]}`));
  }
  if (full) {
    L.push("");
    L.push("Full response record:");
    QUESTIONS.forEach((q, i) => {
      const a = answers[q.id];
      L.push(`${i + 1}. ${q.text}`);
      L.push(`   Answer: ${a !== undefined ? q.options[a].label : "—"}`);
    });
  }
  L.push("");
  L.push("This summary is a preliminary, educational tool and does not constitute investment advice or a recommendation.");
  return L.join("\n");
}

function computeResults(answers: Answers): Results {
  let capSum = 0,
    capN = 0,
    tolSum = 0,
    tolN = 0;
  const flags: string[] = [];
  QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (a === undefined) return;
    const opt = q.options[a];
    if (q.dim === "capacity") {
      capSum += opt.score ?? 0;
      capN++;
    } else if (q.dim === "tolerance") {
      tolSum += opt.score ?? 0;
      tolN++;
    } else if (q.dim === "flag" && opt.flag) {
      flags.push(opt.flag);
    }
  });
  const capacity = capN ? capSum / capN : 0;
  const tolerance = tolN ? tolSum / tolN : 0;
  const binding = Math.min(capacity, tolerance);
  let level = Math.round(binding);
  level = Math.max(1, Math.min(5, level));

  // Near-term relocation caps the model at Balanced pending advisor review
  const relocationCap = flags.includes("relocation-near");
  if (relocationCap && level > 3) level = 3;

  const divergence = Math.abs(capacity - tolerance) >= 1.25;
  return { capacity, tolerance, level, flags, divergence, relocationCap };
}

/* ------------------------ subcomponents ------------------------ */

function ScoreBar({ label, value, colorClass }: { label: string; value: number; colorClass: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="text-sm font-bold text-primary tabular-nums">{value.toFixed(1)} / 5.0</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

function AllocationBar({ model }: { model: RiskModel }) {
  const segs = [
    { label: "Equity", pct: model.equity, colorClass: "bg-primary" },
    { label: "Fixed income", pct: model.fixed, colorClass: "bg-gold-500" },
    { label: "Cash", pct: model.cash, colorClass: "bg-slate-400" },
  ];
  return (
    <div>
      <div className="flex h-7 rounded-md overflow-hidden border border-border">
        {segs.map((s) => (
          <div
            key={s.label}
            className={`flex items-center justify-center ${s.colorClass}`}
            style={{ width: `${s.pct}%` }}
          >
            {s.pct >= 8 && <span className="text-white text-xs font-bold">{s.pct}%</span>}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-2">
        {segs.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`w-2.5 h-2.5 rounded-sm inline-block ${s.colorClass}`} />
            {s.label} {s.pct}%
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------ main component ------------------------ */

const RiskProfileQuestionnaire = () => {
  const [screen, setScreen] = useState<"welcome" | "quiz" | "results">("welcome");
  const [acknowledged, setAcknowledged] = useState(false);
  const [clientName, setClientName] = useState("");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [delivery, setDelivery] = useState<Partial<Record<DeliveryKey, DeliveryStatus>>>({});

  const q = QUESTIONS[idx];
  const total = QUESTIONS.length;
  const results = useMemo(() => computeResults(answers), [answers]);
  const model = MODELS[results.level - 1];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const completedAt = useMemo(() => new Date().toLocaleString(), [screen === "results"]);

  const setStatus = (k: DeliveryKey, v: DeliveryStatus) => setDelivery((d) => ({ ...d, [k]: v }));
  const summaryArgs = { clientName, results, model, answers, completedAt };

  const select = (value: string) => setAnswers((a) => ({ ...a, [q.id]: Number(value) }));
  const next = () => (idx < total - 1 ? setIdx(idx + 1) : setScreen("results"));
  const back = () => (idx > 0 ? setIdx(idx - 1) : setScreen("welcome"));
  const restart = () => {
    setAnswers({});
    setIdx(0);
    setScreen("welcome");
    setAcknowledged(false);
    setDelivery({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const beginQuiz = () => {
    if (!acknowledged) return;
    setScreen("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const finishQuiz = () => {
    next();
    if (idx === total - 1) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText({ ...summaryArgs, full: true }));
      setStatus("copy", "done");
      setTimeout(() => setStatus("copy", undefined), 2500);
    } catch {
      setStatus("copy", "error");
    }
  };

  const emailSummary = () => {
    // mailto has URL-length limits, so the email carries the compact summary;
    // the full record travels via print/PDF, the copied text, or "Send full profile" below.
    const body = buildSummaryText({ ...summaryArgs, full: false });
    const subject = `Risk profile — ${clientName || "new client"}`;
    window.location.href = `mailto:${ADVISOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const sendToAdvisor = async () => {
    setStatus("advisor", "working");
    try {
      const res = await fetch("/api/risk-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName,
          modelName: model.name,
          modelLevel: model.level,
          capacity: results.capacity,
          tolerance: results.tolerance,
          flags: results.flags.map((f) => FLAG_NOTES[f]),
          divergence: results.divergence,
          relocationCap: results.relocationCap,
          summary: buildSummaryText({ ...summaryArgs, full: true }),
        }),
      });
      if (!res.ok) throw new Error("bad status");
      setStatus("advisor", "done");
    } catch {
      setStatus("advisor", "error");
    }
  };

  const sectionLabel = SECTIONS.find((s) => s.id === q?.section)?.label;

  /* ---------------- WELCOME ---------------- */
  if (screen === "welcome") {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 sm:p-10">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
            Before we recommend anything, we listen.
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl mb-8">
            This questionnaire takes about five minutes. It looks at two different things: your{" "}
            <strong className="text-card-foreground">capacity</strong> to take risk (your finances) and your{" "}
            <strong className="text-card-foreground">tolerance</strong> for risk (your temperament). Your
            preliminary model is set by whichever is <em>lower</em> — because a portfolio you can't afford,
            or can't sleep with, isn't the right portfolio.
          </p>

          <div className="bg-navy-50 border border-border rounded-lg p-6 mb-8">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-3">
              Important disclosures
            </p>
            <ul className="list-disc list-outside pl-4 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              {DISCLOSURES.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6 max-w-sm">
            <Label htmlFor="clientName" className="text-sm font-semibold text-muted-foreground mb-2 block">
              Your name (optional — appears on your summary)
            </Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="First and last name"
            />
          </div>

          <label className="flex items-start gap-3 mb-8 cursor-pointer max-w-xl">
            <Checkbox
              checked={acknowledged}
              onCheckedChange={(checked) => setAcknowledged(checked === true)}
              className="mt-0.5"
            />
            <span className="text-sm leading-relaxed text-card-foreground">
              I have read the disclosures above and understand this questionnaire is a preliminary tool,
              not a recommendation.
            </span>
          </label>

          <Button onClick={beginQuiz} disabled={!acknowledged} size="lg" className="px-8">
            Begin the questionnaire
          </Button>
        </Card>
      </div>
    );
  }

  /* ---------------- QUIZ ---------------- */
  if (screen === "quiz") {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 sm:p-10">
          <div className="flex justify-between items-end flex-wrap gap-3 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-1">{sectionLabel}</p>
              <p className="text-sm text-muted-foreground">
                Question {idx + 1} of {total}
              </p>
            </div>
            <div className="w-full sm:w-48">
              <Progress value={((idx + 1) / total) * 100} />
            </div>
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-6 leading-snug max-w-xl">
            {q.text}
          </h2>

          <RadioGroup
            value={answers[q.id]?.toString() ?? ""}
            onValueChange={select}
            className="gap-3"
          >
            {q.options.map((opt, i) => {
              const optionId = `${q.id}-opt-${i}`;
              return (
                <Label
                  key={i}
                  htmlFor={optionId}
                  className={`flex items-center gap-3 w-full text-left p-4 rounded-lg border cursor-pointer transition-colors font-normal ${
                    answers[q.id] === i
                      ? "border-2 border-accent bg-navy-50"
                      : "border-input bg-white hover:border-accent/50"
                  }`}
                >
                  <RadioGroupItem value={i.toString()} id={optionId} />
                  <span className={`text-sm sm:text-base ${answers[q.id] === i ? "font-semibold text-primary" : "text-card-foreground"}`}>
                    {opt.label}
                  </span>
                </Label>
              );
            })}
          </RadioGroup>

          <div className="flex gap-3 mt-8">
            <Button onClick={back} variant="outline">
              <ArrowLeft />
              Back
            </Button>
            <Button onClick={finishQuiz} disabled={answers[q.id] === undefined}>
              {idx === total - 1 ? "See my profile" : "Continue"}
              <ArrowRight />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  /* ---------------- RESULTS ---------------- */
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-gold-500 mb-1">
          Preliminary risk profile{clientName ? ` — ${clientName}` : ""}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-2">{model.name}</h1>
        <p className="text-base sm:text-lg leading-relaxed text-muted-foreground max-w-xl">{model.summary}</p>
      </div>

      {/* Scores */}
      <Card className="p-6">
        <ScoreBar label="Risk capacity (financial)" value={results.capacity} colorClass="bg-teal-500" />
        <ScoreBar label="Risk tolerance (behavioral)" value={results.tolerance} colorClass="bg-gold-500" />
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          Your model is set by the <strong className="text-card-foreground">lower</strong> of the two scores
          {results.relocationCap
            ? ", and further limited to Balanced pending review of your near-term relocation plans"
            : ""}
          .
        </p>
      </Card>

      {/* Allocation */}
      <Card className="p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Illustrative target allocation
        </p>
        <AllocationBar model={model} />
        <div className="mt-4 border-t border-border pt-3 space-y-1">
          {model.detail.map((d) => (
            <div key={d.label} className="flex justify-between text-sm py-1">
              <span className="text-card-foreground">{d.label}</span>
              <span className="font-bold tabular-nums">{d.pct}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Flags */}
      {(results.flags.length > 0 || results.divergence) && (
        <Card className="p-6 bg-gold-50 border-gold-500/40">
          <p className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-3">
            For discussion with your adviser
          </p>
          <ul className="list-disc list-outside pl-4 space-y-1.5 text-sm text-card-foreground leading-relaxed">
            {results.divergence && (
              <li>
                Your financial capacity and personal tolerance scores diverge meaningfully — this is worth
                a conversation before finalizing any allocation.
              </li>
            )}
            {results.flags.map((f) => (
              <li key={f}>{FLAG_NOTES[f]}</li>
            ))}
          </ul>
        </Card>
      )}

      {/* Response record (print-friendly) */}
      <Card className="p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Response record — completed {completedAt}
        </p>
        <div className="divide-y divide-border">
          {QUESTIONS.map((qq, i) => (
            <div key={qq.id} className="py-2">
              <p className="text-sm text-muted-foreground">
                {i + 1}. {qq.text}
              </p>
              <p className="text-sm font-semibold text-card-foreground mt-0.5">
                {answers[qq.id] !== undefined ? qq.options[answers[qq.id]].label : "—"}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Disclosures */}
      <div className="bg-navy-50 border border-border rounded-lg p-6 text-xs text-muted-foreground leading-relaxed space-y-1.5">
        {DISCLOSURES.map((d, i) => (
          <p key={i}>{d}</p>
        ))}
      </div>

      {/* Send results */}
      <Card className="p-6 print:hidden">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Send your results
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={emailSummary}>
            <Mail />
            Email to my adviser
          </Button>
          <Button
            onClick={sendToAdvisor}
            disabled={delivery.advisor === "working"}
            className="bg-gold-500 text-primary hover:bg-gold-500/90"
          >
            {delivery.advisor === "working" ? <Loader2 className="animate-spin" /> : <Send />}
            {delivery.advisor === "working"
              ? "Sending…"
              : delivery.advisor === "done"
                ? "Sent to advisor ✓"
                : "Send full profile to advisor"}
          </Button>
          <Button onClick={copySummary} variant="outline">
            {delivery.copy === "done" ? <CheckCircle2 /> : <Copy />}
            {delivery.copy === "done" ? "Copied ✓" : "Copy full summary"}
          </Button>
          <Button onClick={() => window.print()} variant="outline">
            <Printer />
            Print / save PDF
          </Button>
          <Button onClick={restart} variant="outline">
            <RotateCcw />
            Start over
          </Button>
        </div>
        {delivery.advisor === "error" && (
          <p className="text-sm text-destructive mt-3">
            Couldn't send your profile. Please use email or print instead, or try again in a moment.
          </p>
        )}
        {delivery.copy === "error" && (
          <p className="text-sm text-destructive mt-3">
            Couldn't copy to the clipboard in this browser. Use print or email instead.
          </p>
        )}
      </Card>
    </div>
  );
};

export default RiskProfileQuestionnaire;
