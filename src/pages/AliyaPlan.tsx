import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CheckCircle, Send } from "lucide-react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/metaPixel";
import { scrollToId } from "@/lib/scrollToAnchor";
import { getUtm } from "@/lib/utm";
import UtmHiddenFields from "@/components/UtmHiddenFields";
import MobileCtaBar from "@/components/MobileCtaBar";
import { BOOKING_LABEL, BOOKING_NOTE, BOOKING_RELATIONSHIP_NOTE, BOOKING_URL } from "@/lib/booking";

// Landing page for the Meta ad: headline "Planning for Aliya, not just planning to plan",
// hook "The garage sale can wait until spring. The investment plan can't."
// Not linked from the nav; noindex; not in sitemap.
// Structure, form, consent, and compliance footer mirror BorrowAgainstPortfolio.tsx.
// All copy requires compliance review before any change.

const FORM_SOURCE = "Aliya Plan";

const INSURANCE_NOTE =
  "Michael Benklifa is also a licensed insurance agent; insurance is offered separately and may pay him a commission.";

const checklist: { title: string; body: string; note?: string }[] = [
  {
    title: "401(k) and IRA decisions",
    body: "What happens to your 401(k)s and IRAs when you move? Leaving accounts in place, rolling them over, or consolidating them may each carry different tax, cost, and access considerations, and the answer may depend on your age and plans.",
  },
  {
    title: "Taxable accounts and brokerage access",
    body: "Will your U.S. brokerage keep serving you once you live abroad? Some U.S. firms restrict or close accounts for non-U.S. residents, so it may help to find out early how your current providers treat clients who live in Israel.",
  },
  {
    title: "U.S. and Israeli tax residency and filing",
    body: "U.S. citizens generally file U.S. returns on worldwide income wherever they live, and Israel has its own rules for new residents. How the two systems interact can be complex, so consider speaking with qualified U.S. and Israeli tax professionals before you move.",
  },
  {
    title: "Currency once expenses are in shekels",
    body: "When your expenses are in shekels but your savings are in dollars, changes in the dollar-shekel exchange rate may affect your budget. It may be worth considering how much currency exposure you are comfortable with and when you might convert funds.",
  },
  {
    title: "Insurance coverage abroad",
    body: "Will your health, life, and disability coverage still apply in Israel? Some policies may change, limit coverage, or end when you live abroad, so it may help to review each policy before you go.",
    note: INSURANCE_NOTE,
  },
  {
    title: "Estate documents in two countries",
    body: "Wills, beneficiary designations, and powers of attorney may need review in both countries. Documents that work in the U.S. may not be treated the same way in Israel, so consider asking qualified attorneys in each country.",
  },
  {
    title: "Emergency fund and cash timing",
    body: "How much cash might you want on hand during the move, and in which currency? Moving costs, deposits, and gaps in income may make it useful to think about cash needs before you go.",
  },
];

const AliyaPlan = () => {
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

  // Smooth in-page jump to the form (same as the lending page). Updates the
  // hash with a relative URL, so the path and query string (UTM) are kept.
  const jumpTo = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (scrollToId(id)) {
      e.preventDefault();
      window.history.replaceState(window.history.state, "", `#${id}`);
    }
  };

  // Meta Pixel: Schedule on a click to the booking page (opens in a new tab).
  // This records the click, not a completed booking. No PII.
  const onBookClick = () => trackEvent("Schedule", { content_name: FORM_SOURCE });

  const inputClass =
    "w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent";

  return (
    <Layout>
      {/* Hero */}
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              Planning for Aliya: what to sort out before the garage sale.
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              The garage sale can wait until spring. For Americans planning a move to Israel, some U.S.
              money questions may be easier to work through well before the moving boxes come out. Here
              are a few to consider early.
            </p>
            <div id="hero-cta" className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onBookClick}
                className="btn-gold inline-flex items-center space-x-2 px-6 py-3 rounded-md font-semibold"
              >
                <Calendar size={18} />
                <span>{BOOKING_LABEL}</span>
              </a>
              <a
                href="#consultation"
                onClick={jumpTo("consultation")}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-md font-semibold border border-gold-500 text-white hover:bg-white/10"
              >
                <Send size={18} />
                <span>Request a free consultation</span>
              </a>
            </div>
            <p className="text-white/80 text-sm mt-3">{BOOKING_NOTE}</p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-primary text-center mb-2">
              A Starting Checklist
            </h2>
            <p className="text-center text-muted-foreground italic mb-6">
              This is general information, not a recommendation about your situation.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {checklist.map((item) => (
                <li key={item.title} className="border border-border rounded-lg p-5">
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-snug">{item.body}</p>
                  {item.note && <p className="text-muted-foreground text-sm leading-snug mt-2">{item.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA form */}
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
                  A free conversation about your Aliya plan and the U.S. money questions that come
                  with it.
                </p>
                <div className="text-center mb-6">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onBookClick}
                    className="btn-gold inline-flex items-center justify-center space-x-2 w-full px-6 py-3 rounded-md font-semibold"
                  >
                    <Calendar size={18} />
                    <span>{BOOKING_LABEL}</span>
                  </a>
                  <p className="text-primary/70 text-xs mt-2">{BOOKING_NOTE}</p>
                </div>
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
                    <Link to="/privacy#website" className="underline hover:text-accent">Privacy Policy</Link>. Submitting this form does not establish an advisory relationship.
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

      {/* Important information: page disclosures, kept separate from the page footer statement below */}
      <div className="py-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-lg font-bold text-primary mb-2">Important Information</h2>
            <p className="text-sm text-muted-foreground leading-snug mb-2">{BOOKING_RELATIONSHIP_NOTE}</p>
            <p className="text-sm text-muted-foreground leading-snug mb-2">
              This page is for educational purposes only and is not tax or legal advice. U.S. citizens
              owe U.S. tax on worldwide income wherever they live. The tax treatment of retirement
              accounts, investments, and any future sale of securities depends on your individual
              circumstances and may differ between the United States and Israel. Please consult a
              qualified U.S. and, if needed, Israeli tax professional before making a decision.
            </p>
            <p className="text-sm text-muted-foreground leading-snug">
              Aliya Financial is based in the United States and is not licensed in Israel. It does not
              give Israeli tax, legal, or mortgage advice.
            </p>
          </div>
        </div>
      </div>

      {/* Page footer statement */}
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <p className="max-w-4xl mx-auto text-center text-sm text-muted-foreground">
            Aliya Financial LLC is registered as an investment adviser with the New Jersey Bureau of Securities. Registration does not imply a certain level of skill or training. Investing involves risk, including loss of principal. This content is educational and general in nature. It is not tax, legal, or individualized investment advice. Aliya Financial LLC is not licensed in Israel and does not give Israeli tax advice. US citizens owe US tax on worldwide income wherever they live. Michael Benklifa is also a licensed insurance agent; any insurance is offered separately, may pay him a commission, and carries no advisory fee.
          </p>
        </div>
      </div>
      <MobileCtaBar
        targetId="consultation"
        heroCtaId="hero-cta"
        secondary={{ href: BOOKING_URL, label: BOOKING_LABEL, onClick: onBookClick }}
      />
    </Layout>
  );
};

export default AliyaPlan;
