import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Calendar, CheckCircle, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/metaPixel";
import { getUtm } from "@/lib/utm";
import UtmHiddenFields from "@/components/UtmHiddenFields";
import MobileCtaBar from "@/components/MobileCtaBar";
import { scrollToId } from "@/lib/scrollToAnchor";

// Landing page for the Meta ad "Buying in Israel: borrowing against a portfolio instead of selling it." Not linked from the nav; noindex (see prerender + effect below).
// All copy requires compliance review before any change.

const FORM_SOURCE = "Portfolio Lending";

const steps = [
  {
    title: "Review your situation",
    body: "We start with a free consultation to understand your goals, your timeline, and the investments you hold in eligible U.S. brokerage accounts. The consultation is educational. Any loan is between you and the custodian.",
  },
  {
    title: "Check eligibility with the custodian",
    body: "The brokerage firm that holds your account decides which securities may be borrowed against and how much credit may be available, based on its own lending criteria.",
  },
  {
    title: "Access funds if approved",
    body: "If the custodian approves a line of credit, you may draw funds from that lender as needed, for example toward a purchase in Israel, while your portfolio generally stays invested. Approval and funding are the custodian's decisions, not Aliya Financial's.",
  },
  {
    title: "Plan for repayment",
    body: "Interest accrues on the amount you borrow at a variable rate set by the lender. We can help you think through how a loan would fit your overall financial picture. We do not set the rate, service the loan, or arrange repayment with the lender.",
  },
];

const mayFit = [
  "People planning Aliya who need a significant sum for a defined, shorter-term purpose, such as a down payment on a home in Israel.",
  "Investors with a diversified, taxable brokerage portfolio who would prefer not to sell appreciated holdings.",
  "People with a clear plan and an expected source of funds to repay the loan.",
  "Those who are comfortable with market fluctuations and able to add funds if the lender requires it.",
];

const mayNotFit = [
  "People who need the money long term with no clear plan to repay it.",
  "Investors with concentrated or highly volatile portfolios.",
  "Anyone with a low tolerance for risk or for market declines.",
  "Assets held mainly in retirement accounts, such as IRAs or 401(k)s, which generally are not eligible to be pledged as collateral.",
  "Anyone who could not meet a margin call by adding funds on short notice.",
];

const risks = [
  {
    title: "A market decline can trigger a margin call.",
    body: "If the value of the securities in your account falls, the lender may require you to deposit additional funds or securities, or may sell some or all of your securities to cover the loan.",
  },
  {
    title: "Securities may be sold without notice and at a loss.",
    body: "The lender may be able to sell your securities without contacting you first, and you may not be able to choose which securities are sold. A forced sale can realize the capital gains taxes that borrowing was meant to defer, and it may create taxable gains or losses.",
  },
  {
    title: "Interest rates are variable.",
    body: "The rate on the loan can change over time, which may increase your cost of borrowing.",
  },
  {
    title: "You can lose more than you deposit.",
    body: "If the value of your collateral falls far enough, you may owe the lender more than the value of the securities in your account.",
  },
    {
    title: "Currency risk on a dollar loan for a shekel purchase.",
    body: "If you borrow in U.S. dollars to fund a purchase priced in Israeli shekels, a move in the dollar-shekel rate can change what the loan costs you in shekels, or what a shekel asset is worth against the dollar debt. Currency moves can reverse.",
  },
  {
    title: "Israeli lenders may treat the loan as debt.",
    body: "If you use borrowed funds toward a purchase in Israel, an Israeli lender may ask about the source of your down payment and may count the U.S. portfolio loan as existing debt when it underwrites a mortgage. Aliya Financial does not arrange Israeli mortgages and is not a mortgage broker.",
  },
  {
    title: "Not suitable for all investors.",
    body: "Whether borrowing against securities is appropriate depends on your full financial situation, goals, and risk tolerance.",
  },
];

const BorrowAgainstPortfolio = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Keep this page out of search indexes during client-side navigation too
  // (the prerendered HTML already carries the robots meta tag).
  useEffect(() => {
    let tag = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !tag;
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "robots";
      document.head.appendChild(tag);
    }
    const previous = tag.content;
    tag.content = "noindex";
    return () => {
      if (created) tag?.remove();
      else if (tag) tag.content = previous;
    };
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Same Formspree endpoint as the Contact page.
      const response = await fetch("https://formspree.io/f/mjgkwkaz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          formSource: FORM_SOURCE,
          content_name: FORM_SOURCE,
          topic: FORM_SOURCE,
          _replyto: form.email,
          _subject: `New Consultation Request - ${FORM_SOURCE}`,
          ...getUtm(),
        }),
      });
      if (!response.ok) throw new Error("Form submission failed");
      setIsSubmitted(true);
      // Meta Pixel: successful submission only. No PII.
      trackEvent("Lead", { content_name: FORM_SOURCE });
      setForm({ name: "", email: "", phone: "" });
    } catch {
      toast({
        title: "Error",
        description: "There was a problem sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Smooth in-page jumps (hero links). Updates the URL hash without a router
  // navigation so ScrollToTop does not interfere.
  const jumpTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (scrollToId(id)) {
      e.preventDefault();
      window.history.replaceState(window.history.state, "", `#${id}`);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent";

  return (
    <Layout>
      {/* 1. Hero */}
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              Buying in Israel: borrowing against a portfolio instead of selling it.
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              If you are making Aliya and need a large sum, such as a down payment on a home in Israel, a securities-based loan from the brokerage that holds your account can let you stay invested and defer capital gains, though a market drop can force sales. Aliya Financial does not make the loan.
            </p>
            <p className="fs-body mt-4">
              <a
                href="#risks"
                onClick={jumpTo("risks")}
                className="text-gold-500 underline underline-offset-4 hover:text-gold-100 font-semibold"
              >
                Before you decide, read the risks.
              </a>
            </p>
            <a
              id="hero-cta"
              href="#consultation"
              onClick={jumpTo("consultation")}
              className="btn-gold inline-flex items-center space-x-2 px-6 py-3 rounded-md font-semibold mt-4"
            >
              <Calendar size={18} />
              <span>Request a free consultation</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. How it works */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-primary text-center mb-6">How It Works</h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="border border-border rounded-lg p-5">
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">
                    {i + 1}. {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-snug">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* 3. Fit (navy band: light text) */}
      <div className="py-10 bg-primary">
        <div className="container mx-auto px-4">
                    <p className="max-w-4xl mx-auto text-[#e2e6ec] italic mb-6">
            These are general illustrations, not a recommendation about your situation.
          </p>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who It May Fit</h2>
              <ul className="diamond-bullets space-y-3 text-[#e2e6ec] leading-snug">
                {mayFit.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-white mb-4">Who It May Not Fit</h2>
              <ul className="diamond-bullets space-y-3 text-[#e2e6ec] leading-snug">
                {mayNotFit.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Lender, conflict, and tax statements */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-3">Who Makes the Loan</h2>
              <p className="text-muted-foreground leading-snug mb-3">
                Loans are made and serviced by the brokerage firm or custodian that holds your account, not by Aliya Financial, LLC. Aliya Financial does not lend money, does not arrange loans or mortgages, and is not a mortgage broker. Aliya Financial receives no compensation from the custodian for these loans. Loan approval, terms, interest rates, and collateral requirements are determined solely by the lender.
              </p>
              <p className="text-muted-foreground leading-snug">
                Aliya Financial's advisory fee is up to 1% a year, charged on the full value of the holdings in your account, not reduced by any loan balance. That means if you borrow against your portfolio, you pay the advisory fee on assets that are supporting a loan. For example, on a $500,000 portfolio with a $100,000 loan, the fee is figured on $500,000, not $400,000, which is about $1,000 a year more than if it were figured net of the loan. Borrowing instead of selling also keeps assets in the account, so the firm continues to earn that fee: keeping about $200,000 invested at 1% means about $2,000 a year in advisory fees. These are conflicts of interest, and we will discuss them with you before you decide. You don't need an adviser to borrow against a portfolio; brokerages offer these loans directly. Aliya Financial is fee-based, not fee-only: insurance and annuities are offered separately and pay commissions.
              </p>
              <p className="text-muted-foreground leading-snug mt-3">
                Aliya Financial is based in the United States and is not licensed in Israel. It does not give Israeli tax, legal, or mortgage advice.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-3">Not Tax or Legal Advice</h2>
              <p className="text-muted-foreground leading-snug">
                This page is for educational purposes only and is not tax or legal advice. U.S. citizens owe U.S. tax on worldwide income wherever they live. The tax treatment of borrowing, loan interest, and any future sale of securities depends on your individual circumstances and may differ between the United States and Israel. Please consult a qualified U.S. and, if needed, Israeli tax professional before making a decision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Risks (calm navy panel, kept in main body before the form) */}
      <div id="risks" className="py-10 bg-white scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-primary border border-gold-500/50 rounded-lg p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="text-gold-500" size={24} aria-hidden="true" />
              Understand the Risks
            </h2>
            <p className="text-white font-semibold mb-4">
              Borrowing against securities carries risk and is not suitable for all investors.
              Before deciding, please consider the following:
            </p>
            <ul className="space-y-3 text-[#e2e6ec] leading-snug">
              {risks.map((r) => (
                <li key={r.title}>
                  <strong className="text-white">{r.title}</strong> {r.body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 6. CTA form */}
      <div id="consultation" className="py-10 bg-primary scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto cta-panel shadow-lg p-8">
            {isSubmitted ? (
              <div className="text-center">
                <CheckCircle size={48} className="text-gold-500 mx-auto mb-4" />
                <h2 className="font-serif text-2xl font-bold text-primary mb-2">Thank You</h2>
                <p className="text-primary/80">
                  Your request has been received. We will be in touch to schedule your consultation.
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-serif text-2xl font-bold text-primary mb-2 text-center">
                  Book a Free Consultation
                </h2>
                <hr className="hairline-gold" />
                <p className="text-primary/70 text-sm text-center mt-2 mb-6">
                  A free conversation about whether borrowing against your portfolio may make sense for
                  your situation.
                </p>
                <form onSubmit={onSubmit} className="space-y-4">
                  <UtmHiddenFields />
                  <div>
                    <label htmlFor="pl-name" className="block text-sm font-medium text-black mb-2">Full Name *</label>
                    <input id="pl-name" name="name" type="text" required autoComplete="name" value={form.name} onChange={onChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="pl-email" className="block text-sm font-medium text-black mb-2">Email Address *</label>
                    <input id="pl-email" name="email" type="email" required autoComplete="email" value={form.email} onChange={onChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="pl-phone" className="block text-sm font-medium text-black mb-2">Phone Number</label>
                    <input id="pl-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={onChange} className={inputClass} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">
                    By submitting this form, you agree that Aliya Financial may contact you by email, phone, or text about your inquiry. Message and data rates may apply. Reply STOP to opt out of texts. See our{" "}
                    <Link to="/privacy#website" className="underline hover:text-accent">Privacy Policy</Link>. Submitting this form does not establish an advisory relationship and is not an application for, offer of, or commitment to lend.
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Request a free consultation</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 7. Page footer statement */}
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            Educational only, not individual tax, legal, or investment advice. Aliya Financial, LLC is an investment adviser registered in New Jersey; registration does not imply a certain level of skill or training. Insurance is offered separately through a licensed agent and pays commissions. Aliya Financial is based in the United States and is not licensed in Israel.
          </p>
        </div>
      </div>
      {/* Compliance: the bar must not skip the risks. The risks block sits directly
          before the form, so "show only after the risks" would leave no window at all;
          the bar points to the risks instead and hides once they reach the screen. */}
      <MobileCtaBar targetId="risks" heroCtaId="hero-cta" label="Read the risks first" />
    </Layout>
  );
};

export default BorrowAgainstPortfolio;
