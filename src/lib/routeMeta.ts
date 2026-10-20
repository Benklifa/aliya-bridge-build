// Per-route browser tab titles and meta descriptions.
// Used at build time (entry-server.tsx -> scripts/prerender.mjs writes them into
// each prerendered page) and in the browser on client-side navigation
// (RouteMeta component). Titles follow "Page Name | Aliya Financial".
// Copy rules: "Aliya" (no h), "adviser" (never "planner"), no em or en dashes,
// no performance, rate, testimonial, or superlative claims.
import { lifeEvents } from "@/data/lifeEvents";

export interface RouteMetaEntry {
  title: string;
  description: string;
  ogTitle?: string;
}

const SITE = "Aliya Financial";
const t = (name: string) => `${name} | ${SITE}`;

export const DEFAULT_META: RouteMetaEntry = {
  title: t("Fee-Based Investment Adviser"),
  description:
    "Aliya Financial, LLC is a fee-based investment adviser registered in New Jersey, serving U.S. clients, including Americans preparing to make Aliya.",
};

export const routeMeta: Record<string, RouteMetaEntry> = {
  "/": DEFAULT_META,
  "/about": {
    title: t("About Us"),
    description: "About Aliya Financial, LLC, a fee-based investment adviser registered in New Jersey and based in Highland Park, NJ.",
  },
  "/services": {
    title: t("Services"),
    description: "Investment advisory services from Aliya Financial, a fee-based investment adviser registered in New Jersey.",
  },
  "/contact": {
    title: t("Contact Us"),
    description: "Contact Aliya Financial by email or phone, or send a message to request a free consultation.",
  },
  "/events": {
    title: t("Events"),
    description: "Seminars and workshops from Aliya Financial for people preparing to make Aliya.",
  },
  "/news": {
    title: t("In the News"),
    description: "Articles and interviews featuring Aliya Financial.",
  },
  "/faq": {
    title: t("Frequently Asked Questions"),
    description: "Answers to common questions about U.S. and Israeli money matters for people preparing to make Aliya.",
  },
  "/framework": {
    title: t("The A.L.I.Y.A. Framework"),
    description: "An overview of the A.L.I.Y.A. framework: Align, Live, Invest, Y'rusha, and Adapt.",
  },
  "/framework/a": {
    title: t("Align: A.L.I.Y.A. Framework"),
    description: "The Align step of the A.L.I.Y.A. framework: housing, budget, and real estate questions before a move to Israel.",
  },
  "/framework/l": {
    title: t("Live: A.L.I.Y.A. Framework"),
    description: "The Live step of the A.L.I.Y.A. framework: retirement income, longevity, and healthcare questions.",
  },
  "/framework/i": {
    title: t("Invest: A.L.I.Y.A. Framework"),
    description: "The Invest step of the A.L.I.Y.A. framework: investment and insurance questions for a cross-border move.",
  },
  "/framework/y": {
    title: t("Y'rusha: A.L.I.Y.A. Framework"),
    description: "The Y'rusha (legacy) step of the A.L.I.Y.A. framework: wills and estate questions across the U.S. and Israel.",
  },
  "/framework/adapt": {
    title: t("Adapt: A.L.I.Y.A. Framework"),
    description: "The Adapt step of the A.L.I.Y.A. framework: cash reserves, currency, and banking questions after a move.",
  },
  "/readiness": {
    title: t("Aliya Readiness Score"),
    description: "A self-assessment questionnaire about financial readiness for a move to Israel. Educational only.",
  },
  "/where-should-i-live": {
    title: t("Where Should I Live in Israel?"),
    description: "A questionnaire that compares Israeli communities against your budget and priorities. Educational only.",
  },
  "/am-i-ready-to-buy": {
    title: t("Am I Ready to Buy a House?"),
    description: "A questionnaire about readiness to buy a home in Israel. Educational only.",
  },
  "/tools": {
    title: t("Learning Tools"),
    description: "Educational tools and explainers on cross-border money questions for Americans moving to Israel.",
  },
  "/glossary": {
    title: t("Financial Glossary"),
    description: "Plain-language definitions of U.S. and Israeli financial terms.",
  },
  "/disclosures": {
    title: t("Disclosures"),
    description: "Important disclosures for Aliya Financial, LLC, an investment adviser registered in New Jersey (CRD 340264).",
  },
  "/privacy": {
    title: t("Privacy Policy"),
    description: "The Aliya Financial privacy policy, including how this website collects and uses information.",
  },
  "/borrow-against-portfolio": {
    title: t("Borrowing Against a Portfolio"),
    description:
      "How a securities-based loan from your brokerage works, who makes the loan, the conflicts, and the risks. Aliya Financial does not make the loan.",
  },
  "/aliya-plan": {
    title: t("Preparing for Aliya"),
    description: "U.S. money questions to consider before a move to Israel. General information, not a recommendation.",
  },
  ...Object.fromEntries(
    lifeEvents.map((e) => [
      `/life-events/${e.slug}`,
      {
        title: t(e.pageTitle),
        description: e.metaDescription,
      },
    ]),
  ),
};

export const NOT_FOUND_META: RouteMetaEntry = {
  title: t("Page Not Found"),
  description: DEFAULT_META.description,
};

export const getRouteMeta = (pathname: string): RouteMetaEntry => {
  const path = pathname !== "/" ? pathname.replace(/\/+$/, "") : pathname;
  return routeMeta[path] ?? NOT_FOUND_META;
};
