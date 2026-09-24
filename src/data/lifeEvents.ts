import {
  PiggyBank,
  Scroll,
  Heart,
  HeartCrack,
  Home,
  FileText,
  Plane,
  type LucideIcon,
} from "lucide-react";

export interface LifeEvent {
  slug: string;
  label: string;
  icon: LucideIcon;
  hoverBlurb: string;
  pageTitle: string;
  pageIntro: string;
  whyItMatters: string[];
  howWeHelp: string[];
}

export const lifeEvents: LifeEvent[] = [
  {
    slug: "retirement",
    label: "Retirement",
    icon: PiggyBank,
    hoverBlurb:
      "Retirement resets your income, tax bracket, and healthcare picture all at once — and if Israel is part of the plan, the timing of that reset matters even more.",
    pageTitle: "Retirement",
    pageIntro:
      "Retirement is one of the biggest financial pivots you'll make — income shifts from a paycheck to a mix of Social Security, pensions, and withdrawals, and every one of those pieces is taxed differently depending on where you live.",
    whyItMatters: [
      "The order you draw from taxable, tax-deferred, and Roth accounts can materially change your lifetime tax bill.",
      "Social Security claiming age, pension elections, and required minimum distributions are largely irreversible once made.",
      "If a move to Israel is on the table, the 10-year Israeli tax exemption window interacts directly with retirement income timing.",
    ],
    howWeHelp: [
      "Build a retirement income sequence designed for tax efficiency across U.S. and, if relevant, Israeli rules.",
      "Model Social Security and pension claiming strategies against your actual retirement date and lifestyle needs.",
      "Coordinate required minimum distributions, Roth conversions, and healthcare costs into one plan — not a patchwork of decisions.",
    ],
  },
  {
    slug: "inheritance",
    label: "Inheritance",
    icon: Scroll,
    hoverBlurb:
      "Receiving or settling an inheritance brings tax, timing, and cross-border reporting questions that are easy to get wrong and expensive to unwind.",
    pageTitle: "Inheritance",
    pageIntro:
      "Whether you're receiving an inheritance or helping settle one, the financial and reporting questions that follow rarely have obvious answers — especially once a second country and currency are involved.",
    whyItMatters: [
      "Inherited accounts (IRAs, brokerage accounts, property) each carry different tax treatment and distribution rules.",
      "Cross-border inheritances can trigger U.S. reporting requirements (like FBAR or Form 3520) that are easy to miss.",
      "Timing of a sale or transfer — especially real estate or foreign assets — can significantly change the tax outcome.",
    ],
    howWeHelp: [
      "Walk through what you've inherited and what it means for your tax filings, both U.S. and cross-border.",
      "Help you decide whether to hold, sell, or restructure inherited assets in light of your own financial plan.",
      "Coordinate with your attorney and CPA so nothing falls between the cracks of estate administration.",
    ],
  },
  {
    slug: "marriage",
    label: "Marriage",
    icon: Heart,
    hoverBlurb:
      "Combining finances with a spouse means combining tax situations, goals, and sometimes two different countries' worth of accounts.",
    pageTitle: "Marriage",
    pageIntro:
      "Marriage merges more than two lives — it merges two financial histories, two sets of goals, and often two different sets of accounts, benefits, and tax considerations.",
    whyItMatters: [
      "Filing status changes affect tax brackets, deductions, and retirement account contribution limits.",
      "Beneficiary designations, wills, and insurance coverage typically need to be updated after a marriage.",
      "If one spouse is considering Aliyah and the other isn't yet ready, that gap needs an explicit financial plan of its own.",
    ],
    howWeHelp: [
      "Build a combined financial picture that respects both partners' goals and timelines.",
      "Update beneficiary designations, insurance, and account titling to reflect your new household.",
      "Model shared scenarios — including an Aliyah timeline that may not be identical for both spouses.",
    ],
  },
  {
    slug: "divorce",
    label: "Divorce",
    icon: HeartCrack,
    hoverBlurb:
      "Dividing a household's finances means dividing accounts, taxes, and sometimes assets held in two different currencies.",
    pageTitle: "Divorce",
    pageIntro:
      "Divorce requires untangling shared accounts, shared tax history, and shared plans — a process that gets more complex, not less, when cross-border assets or an Aliyah plan are involved.",
    whyItMatters: [
      "Splitting retirement accounts, real estate, and investment accounts each carries its own tax and timing considerations.",
      "Filing status, dependents, and support arrangements change your tax picture going forward.",
      "Estate documents, beneficiaries, and insurance almost always need to be revisited after a divorce.",
    ],
    howWeHelp: [
      "Help you understand the financial implications of different settlement structures before they're final.",
      "Rebuild a standalone financial plan for your new household — income, savings, and goals included.",
      "Update beneficiaries, insurance, and estate documents so your plan matches your new reality.",
    ],
  },
  {
    slug: "empty-nest",
    label: "Empty Nest",
    icon: Home,
    hoverBlurb:
      "When the kids move out, your home, your budget, and your timeline all deserve a second look — especially if Aliyah moves from 'someday' to 'now.'",
    pageTitle: "Empty Nest",
    pageIntro:
      "Once the kids are out on their own, the financial plan built around raising them usually needs one too — freed-up cash flow, a house that may no longer fit, and a timeline that's suddenly a lot more open.",
    whyItMatters: [
      "Money once earmarked for tuition, activities, and dependents can be redirected — toward retirement, savings, or an Aliyah timeline.",
      "A larger home may no longer make financial or practical sense; downsizing (or relocating) changes your tax and cash-flow picture.",
      "This is often the first real window to seriously evaluate an Aliyah plan without day-to-day parenting logistics in the way.",
    ],
    howWeHelp: [
      "Redirect freed-up cash flow toward retirement savings, debt payoff, or an Aliyah fund — deliberately, not by default.",
      "Model the financial impact of downsizing, relocating, or selling a home you no longer need.",
      "If Aliyah is now on the table, walk through the Readiness Score and A.L.I.Y.A. Framework to see what the timeline could look like.",
    ],
  },
  {
    slug: "estate-planning",
    label: "Estate Planning",
    icon: FileText,
    hoverBlurb:
      "U.S. and Israeli inheritance law don't automatically agree with each other — estate planning across both takes deliberate coordination.",
    pageTitle: "Estate Planning",
    pageIntro:
      "A will and a beneficiary form that work perfectly in the U.S. don't automatically carry the same effect in Israel. Cross-border estate planning means making sure your wishes hold up in both places.",
    whyItMatters: [
      "U.S. and Israeli inheritance law can conflict — without coordination, a plan valid in one country may not hold in the other.",
      "Beneficiary designations on retirement and brokerage accounts generally override what's written in a will.",
      "Currency, property, and account location all affect how — and how quickly — assets can pass to heirs.",
    ],
    howWeHelp: [
      "Review your beneficiary designations and account titling against your actual estate wishes.",
      "Coordinate with U.S. and Israeli estate attorneys so your plan is consistent in both jurisdictions.",
      "This is the same thinking behind the Y'rusha (Legacy) element of our A.L.I.Y.A. framework — see how it fits the bigger picture on our Framework page.",
    ],
  },
  {
    slug: "aliya",
    label: "Aliya",
    icon: Plane,
    hoverBlurb:
      "Making Aliyah touches your taxes, your accounts, your real estate, and your retirement timeline all at once — this is the transition we specialize in.",
    pageTitle: "Aliya",
    pageIntro:
      "Making Aliyah is the transition we built this firm around. It touches nearly every part of your financial life — taxes, retirement accounts, real estate, and how your savings in dollars will fund spending in shekels.",
    whyItMatters: [
      "The 10-year Israeli tax exemption window creates a real, time-limited planning opportunity for new olim.",
      "IRA, Roth, and pension withdrawals are taxed differently once you're an Israeli tax resident.",
      "Deciding whether to sell, hold, rent, or buy real estate on either side of the move has lasting tax and cash-flow effects.",
    ],
    howWeHelp: [
      "Model your Aliyah timeline against IRA, Roth, and pension withdrawal strategy to maximize tax efficiency.",
      "Build a real estate strategy — sell, hold, rent, or buy — that fits your specific situation.",
      "Take our Readiness Score or explore the full A.L.I.Y.A. Framework to see the complete planning approach.",
    ],
  },
];

export const getLifeEvent = (slug: string) =>
  lifeEvents.find((event) => event.slug === slug);
