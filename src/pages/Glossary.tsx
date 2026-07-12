import Layout from "@/components/Layout";
import { BookOpen } from "lucide-react";

// "The Aliyah Financial Dictionary" — static educational glossary page.
// Internal-linking hub for blog posts.

interface GlossaryTerm {
  term: string;
  def: string;
}

interface GlossaryGroup {
  category: string;
  terms: GlossaryTerm[];
}

const GLOSSARY: GlossaryGroup[] = [
  {
    category: "The Move Itself",
    terms: [
      { term: "Aliyah", def: "Immigration to Israel by Jews under the Law of Return — literally “ascent.” In financial planning terms, a change of tax residency with consequences in both countries." },
      { term: "Oleh / Olim", def: "A new immigrant to Israel (plural: olim). Your status date as an oleh drives eligibility windows for several Israeli benefits." },
      { term: "Teudat Oleh", def: "The immigrant booklet/certificate documenting your Aliyah date and status — the anchor document for benefit eligibility timelines." },
      { term: "Nefesh B'Nefesh", def: "The nonprofit that facilitates Aliyah from North America and the U.K., coordinating with the Jewish Agency on applications, flights, and initial logistics." },
      { term: "Sal Klita", def: "The “absorption basket” — a package of initial financial assistance Israel provides to new olim during their first months." },
      { term: "Apostille", def: "An international certification that makes U.S. documents (birth certificates, marriage licenses) legally recognized in Israel — a common pre-move paperwork step." },
    ],
  },
  {
    category: "Cross-Border Tax",
    terms: [
      { term: "10-Year Exemption Period", def: "Israel's tax benefit for new residents: a general exemption on foreign-source income and gains, and an exemption from reporting foreign assets, for ten years from becoming an Israeli tax resident. What happens in year eleven is a central planning question." },
      { term: "U.S.–Israel Tax Treaty", def: "The bilateral treaty coordinating how the two countries tax cross-border income. It resolves many questions — and leaves others, like Roth treatment, notably ambiguous." },
      { term: "PFIC", def: "Passive Foreign Investment Company — the punitive U.S. tax regime that generally applies to Israeli mutual funds and pooled investments held by U.S. citizens. A key reason account decisions are examined before opening Israeli investment accounts." },
      { term: "FBAR", def: "The Report of Foreign Bank and Financial Accounts — a U.S. filing generally required once your non-U.S. accounts exceed $10,000 in aggregate. Applies to most olim who open Israeli accounts." },
      { term: "FATCA", def: "The U.S. law requiring foreign financial institutions to report on U.S. account holders — the reason Israeli banks ask detailed questions of American clients." },
      { term: "Citizenship-Based Taxation", def: "The U.S. taxes its citizens on worldwide income regardless of where they live — so U.S. filing obligations generally continue after Aliyah." },
      { term: "Section 121 Exclusion", def: "The U.S. rule that can exclude a large portion of gain on the sale of a primary residence, subject to ownership and use tests — which is why the timing of a U.S. home sale relative to a move gets examined." },
    ],
  },
  {
    category: "Retirement & Benefits",
    terms: [
      { term: "Totalization Agreement", def: "A bilateral pact coordinating social security coverage and credits for people who work in two countries. The U.S. and Israel do not have one — a fact with real consequences for people who split a career across both systems." },
      { term: "Bituach Leumi", def: "Israel's National Insurance Institute — the system handling Israeli social benefits and mandatory contributions, separate from and uncoordinated with U.S. Social Security." },
      { term: "Keren Pensia", def: "An Israeli pension fund — the standard workplace retirement vehicle in Israel, with its own contribution rules and tax characteristics." },
      { term: "Keren Hishtalmut", def: "An Israeli “advanced study fund” — in practice, a popular medium-term savings vehicle with favorable Israeli tax treatment (whose U.S. treatment raises its own questions)." },
      { term: "Kupat Holim", def: "Israel's health funds (Clalit, Maccabi, Meuhedet, Leumit) — membership in one is how residents access the universal healthcare system." },
      { term: "Medicare Part B Decision", def: "The question every retiring oleh faces: Medicare generally doesn't cover care abroad, but dropping Part B can mean lifelong premium penalties if you ever return. A classic keep-or-drop tradeoff." },
      { term: "Roth Treatment Ambiguity", def: "The unresolved question of how Israel taxes Roth IRA distributions after the exemption period — the treaty predates Roth accounts, and practitioners differ. One of the most consequential open questions in Aliyah planning." },
    ],
  },
  {
    category: "Estate & Currency",
    terms: [
      { term: "Israeli Succession Law", def: "Israel's inheritance framework — no estate tax currently, but its own succession procedure and probate process, which U.S. wills interact with in ways families often don't expect." },
      { term: "Situs", def: "Where an asset is legally located for tax and estate purposes — real property in each country generally follows local rules, which is why cross-border estates get examined jurisdiction by jurisdiction." },
      { term: "Currency (Shekel) Exposure", def: "The planning question of earning, holding, and spending across dollars and shekels — retirement income sourced in one currency against living costs in the other creates exposure that plans typically address explicitly." },
    ],
  },
];

const Glossary = () => {
  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-bold tracking-widest uppercase text-gold-500 mb-4">
              Educational Resource
            </p>
            <h1 className="font-serif text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4">
              <BookOpen className="w-10 h-10 text-gold-500" />
              The Aliyah Financial Dictionary
            </h1>
            <p className="text-xl text-white leading-relaxed">
              The terms that come up constantly in U.S.–Israel financial planning — defined in plain
              English. Bookmark it; you'll meet all of these on the journey.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-10">
              {GLOSSARY.map((group) => (
                <section key={group.category}>
                  <h2 className="text-sm font-bold tracking-widest uppercase text-primary border-b border-gold-500 pb-2 mb-5">
                    {group.category}
                  </h2>
                  <dl className="space-y-5">
                    {group.terms.map((t) => (
                      <div key={t.term}>
                        <dt className="font-semibold text-base text-primary">{t.term}</dt>
                        <dd className="text-sm text-slate-600 leading-relaxed mt-1">{t.def}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ))}
            </div>

            <footer className="mt-12 text-xs text-slate-400 leading-relaxed border-t border-slate-200 pt-6">
              Definitions are general educational descriptions, simplified for clarity — not legal, tax, or
              investment advice, and not a complete statement of any rule. Rules change and application
              depends on individual circumstances. Aliya Financial LLC is a registered investment adviser.
            </footer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Glossary;
