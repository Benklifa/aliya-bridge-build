import { useEffect, useState } from "react";
import { AlertTriangle, Calendar, CheckCircle, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/metaPixel";

// Landing page for the Meta ad "Buying in Israel? Borrow against your portfolio
// instead of selling it." Not linked from the nav; noindex (see prerender + effect below).
// All copy requires compliance review before any change.

const FORM_SOURCE = "Portfolio Lending";

const steps = [
  {
    title: "Review your situation",
    body: "We start with a free consultation to understand your goals, your timeline, and the investments you hold in eligible U.S. brokerage accounts.",
  },
  {
    title: "Check eligibility with the custodian",
    body: "The brokerage firm that holds your account decides which securities may be borrowed against and how much credit may be available, based on its own lending criteria.",
  },
  {
    title: "Access funds if approved",
    body: "If the custodian approves a line of credit, you may draw funds as needed, for example toward a purchase in Israel, while your portfolio generally stays invested.",
  },
  {
    title: "Plan for repayment",
    body: "Interest accrues on the amount you borrow at a variable rate set by the lender. We help you think through a repayment plan and how the loan fits your overall financial picture.",
  },
];

const mayFit = [
  "Olim and families planning Aliya who need a significant sum for a defined, shorter-term purpose, such as a down payment on a home in Israel.",
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
    body: "The lender may be able to sell your securities without contacting you first, and you may not be able to choose which securities are sold. A forced sale may also create taxable gains or losses.",
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

  const inputClass =
    "w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent";

  return (
    <Layout>
      {/* 1. Hero */}
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              Buying in Israel? Borrow against your portfolio instead of selling it.
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              If you are making Aliya and need a large sum, such as a down payment on a home in Israel,
              an asset-based loan offered through our custodian may let you access cash while your U.S.
              investments stay invested. Borrowing instead of selling may also potentially defer the
              capital gains taxes that a sale could trigger.
            </p>
            <a
              href="#consultation"
              className="btn-gold inline-flex items-center space-x-2 px-6 py-3 rounded-md font-semibold mt-6"
            >
              <Calendar size={18} />
              <span>Book a Free Consultation</span>
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

      {/* 3. Fit */}
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">Who It May Fit</h2>
              <ul className="diamond-bullets space-y-3 text-muted-foreground leading-snug">
                {mayFit.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-4">Who It May Not Fit</h2>
              <ul className="diamond-bullets space-y-3 text-muted-foreground leading-snug">
                {mayNotFit.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Risks */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto border-2 border-gold-500 rounded-lg p-6 md:p-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-3 flex items-center gap-2">
              <AlertTriangle className="text-gold-600" size={24} aria-hidden="true" />
              Understand the Risks
            </h2>
            <p className="text-primary font-semibold mb-4">
              Borrowing against securities carries risk and is not suitable for all investors.
              Before deciding, please consider the following:
            </p>
            <ul className="space-y-3 text-muted-foreground leading-snug">
              {risks.map((r) => (
                <li key={r.title}>
                  <strong className="text-primary">{r.title}</strong> {r.body}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 5 + 6. Lender and tax statements */}
      <div className="py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-3">Who Makes the Loan</h2>
              <p className="text-muted-foreground leading-snug mb-3">
                Loans are made and serviced by the brokerage firm or custodian that holds your account,
                not by Aliya Financial LLC. Aliya Financial does not lend money. Loan approval, terms,
                interest rates, and collateral requirements are determined solely by the lender.
              </p>
              <p className="text-muted-foreground leading-snug">
                If your advisory fee is based on the value of the assets we manage, borrowing instead of
                selling keeps those assets in your account, which also benefits Aliya Financial. This is
                a conflict of interest, and we will discuss it with you.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary mb-3">Not Tax or Legal Advice</h2>
              <p className="text-muted-foreground leading-snug">
                This page is for educational purposes only and is not tax or legal advice. The tax
                treatment of borrowing, loan interest, and any future sale of securities depends on your
                individual circumstances and may differ between the United States and Israel. Please
                consult a qualified tax professional before making a decision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 7. CTA form */}
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
                    By submitting this form, you agree that Aliya Financial may contact you by email or
                    phone about your inquiry. Information you provide will be used only to respond to your
                    inquiry. Submitting this form does not establish an advisory relationship and is not an
                    application for, offer of, or commitment to lend.
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
                        <span>Book a Free Consultation</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 8. Page footer statement */}
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            Aliya Financial LLC is a NJ-registered investment adviser. Insurance offered separately as a
            licensed agent.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default BorrowAgainstPortfolio;
