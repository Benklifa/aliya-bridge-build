import { Link } from "react-router-dom";

const services = [
  {
    title: "Financial Planning",
    description:
      "Comprehensive planning for retirement, wealth transfer, and major life transitions, with specialized expertise in U.S.-Israel cross-border situations. On estate matters, we can coordinate with your estate attorneys.",
  },
  {
    title: "Investment Management",
    description:
      "Fee-based portfolio management with tax-aware strategies that consider the implications of living, working, or retiring across two countries.",
  },
  {
    title: "Retirement Income Strategies",
    description:
      "Personalized income plans covering Social Security timing, IRA and 401(k) distributions, pensions, and healthcare coverage.",
  },
  {
    title: "Aliya Planning",
    description:
      "Planning for individuals and families moving to Israel, including dual-country taxes, asset transfers, currency exposure, and benefits coordination.",
  },
];

const HomeServices = () => (
  <section className="py-10 bg-white" aria-labelledby="home-services-heading">
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <h2 id="home-services-heading" className="font-serif text-2xl font-bold text-primary text-center mb-2">
          How Aliya Financial Helps
        </h2>
        <p className="text-center text-muted-foreground mb-6">
          Aliya Financial is a fee-based investment adviser serving U.S. clients, including Americans preparing to make Aliya. Aliya Financial is based in the United States and is not licensed in Israel.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="border border-border rounded-lg p-5">
              <h3 className="font-serif text-lg font-bold text-primary mb-2">{s.title}</h3>
              <p className="text-muted-foreground leading-snug">{s.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link to="/services" className="text-gold-700 hover:text-primary underline font-semibold">
            Explore all services
          </Link>
        </p>
      </div>
    </div>
  </section>
);

export default HomeServices;
