import Layout from "../components/Layout";
import { Mail } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Michael Hanania Benklifa",
      title: "Managing Member & Chief Compliance Officer",
      credentials: "Series 65 | Licensed Life Insurance Producer | Dual MBA",
      bio: "Michael Hanania Benklifa is the Managing Member and Chief Compliance Officer of Aliya Financial LLC, and has 30 years of experience in the financial industry. He is a Series 65–licensed Investment Adviser Representative and a Licensed Life Insurance Producer. Michael has also earned his FINRA Series 7 and 63, along with dual MBAs from Texas A&M University and École Supérieure de Commerce in France. He holds a B.A. in Philosophy and is fluent in English, Hebrew, and French.\n\nHis practice focuses on cross-border financial planning, including multi-currency portfolio management, tax-aware investment strategies, and options-based growth and income strategies.",
      bookLinks: [
        { title: "Think Like an Option Trader", url: "https://www.amazon.com/Think-Like-Option-Trader-Options/dp/0133065308" },
        { title: "Profiting with Iron Condor Options", url: "https://www.amazon.com/Profiting-Iron-Condor-Options-Strategies/dp/0134394607" },
      ],
      riskNote: "Note: Certain investment strategies, including derivatives and alternatives, involve significant risk and may not be suitable for all investors.",
      email: "Michael@AliyaFinancial.com",
    },
    {
      name: "Lisa Geller",
      title: "Principal, Operations",
      credentials: "CISM | MBA (NYU Stern) | 25+ Years Banking Experience",
      bio: "Lisa Geller has over 25 years of experience in banking, finance, program management, and risk governance. She holds Certified Information Security Manager (CISM) and Open FAIR (Risk Analysis) certifications, a dual MBA in Finance and Technology from the NYU Stern School of Business, and a BA in Communications from SUNY Albany.\n\nHer work centers on client logistics, budgeting, financing and real estate solutions, and internal operations.",
      email: "Lisa@AliyaFinancial.com",
    }
  ];

  const whyReasons = [
    {
      title: "Licensed Expertise",
      description: "Registered Investment Adviser in the State of New Jersey, with proper licensing and credentials in U.S. financial markets"
    },
    {
      title: "Cross-Border Focus",
      description: "Knowledge of dual-country financial regulations and comprehensive planning needs"
    },
    {
      title: "Client-Centered Approach",
      description: "Dedicated to guiding families through the financial aspects of U.S.–Israel transitions"
    }
  ];

  return (
    <Layout>
      <div className="bg-primary pt-6 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              About Aliya Financial
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-6">
              We provide comprehensive cross-border financial planning services and advisory solutions,
              combining professional expertise with deep understanding of U.S.–Israel financial transitions.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-2 pb-16 bg-primary">
        <div className="container mx-auto px-4">

          {/* Team Members */}
          <div className="max-w-4xl mx-auto space-y-10 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="cta-panel shadow-lg p-8 md:p-10">
                <h2 className="font-serif fs-h2 font-bold text-primary mb-1">
                  {member.name}
                </h2>
                <h3 className="fs-body-lg font-serif-italic text-gold-600 mb-2">
                  {member.title}
                </h3>
                <p className="text-primary/70 mb-4 fs-body">
                  {member.credentials}
                </p>

                <div className="prose prose-lg max-w-none mb-4">
                  {member.bio.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-primary mb-4 leading-normal">
                      {paragraph}
                    </p>
                  ))}
                  {member.bookLinks && (
                    <p className="text-primary mb-4 leading-normal">
                      He is also the author of{" "}
                      {member.bookLinks.map((book, i) => (
                        <span key={book.url}>
                          {i > 0 && (i === member.bookLinks.length - 1 ? " and " : ", ")}
                          <a
                            href={book.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-gold-600 transition-colors"
                          >
                            {book.title}
                          </a>
                        </span>
                      ))}
                      , available on Amazon.
                    </p>
                  )}
                  {member.riskNote && (
                    <p className="text-primary/70 text-sm mb-4 leading-snug">
                      {member.riskNote}
                    </p>
                  )}
                </div>

                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center space-x-2 text-primary hover:text-gold-600 transition-colors"
                >
                  <Mail size={18} />
                  <span>{member.email}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Why Aliya Financial */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif fs-h2 font-bold text-white text-center mb-12">
              Why Aliya Financial
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyReasons.map((reason, index) => (
                <div key={index} className="cta-panel shadow-lg p-6 text-center">
                  <h3 className="font-semibold text-xl text-primary mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-primary/70 leading-snug">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default About;
