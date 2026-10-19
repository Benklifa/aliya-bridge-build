import Layout from '../components/Layout';

const SHARING_ROWS = [
  {
    reason:
      "For our everyday business purposes, such as to process your transactions, maintain your account(s), respond to court orders and legal investigations, or report to credit bureaus",
    share: "Yes",
    limit: "No",
  },
  {
    reason: "For our marketing purposes: to offer our products and services to you",
    share: "Yes",
    limit: "No",
  },
  {
    reason: "For joint marketing with other financial companies",
    share: "No",
    limit: "We don't share",
  },
  {
    reason: "For our affiliates' everyday business purposes: information about your transactions and experiences",
    share: "No",
    limit: "We don't share",
  },
  {
    reason: "For our affiliates' everyday business purposes: information about your creditworthiness",
    share: "No",
    limit: "We don't share",
  },
  {
    reason: "For nonaffiliates to market to you",
    share: "No",
    limit: "We don't share",
  },
];

const Privacy = () => {
  return (
    <Layout>
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              Privacy Policy
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              What Aliya Financial LLC does with your personal information.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="border-l-4 border-gold-500 bg-card/50 p-6 mb-10 rounded-r-lg">
            <p className="text-muted-foreground mb-3">
              Financial companies choose how they share your personal information. Federal and state law give consumers the right to limit some but not all sharing. Federal and state law also require us to tell you how we collect, share, and protect your personal information. Please read this notice carefully to understand what we do.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                What Personal Information We Collect
              </h2>
              <p className="text-muted-foreground mb-3">
                The types of personal information we collect and share depend on the product or service you have with us. This information can include:
              </p>
              <ul className="diamond-bullets space-y-2 text-muted-foreground">
                <li>Social Security number and income</li>
                <li>Assets, account balances, and account transactions</li>
                <li>Investment experience and risk tolerance</li>
                <li>Wire transfer instructions and account transaction history</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                When you are no longer our client, we continue to share your information only as described in this notice.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                How We Share Your Information
              </h2>
              <p className="text-muted-foreground mb-4">
                All financial companies need to share customers' personal information to run their everyday business. Below, we list the reasons financial companies can share their customers' personal information, the reasons Aliya Financial LLC chooses to share, and whether you can limit this sharing.
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-card/50">
                    <tr>
                      <th className="p-3 font-semibold text-primary">Reasons we can share your personal information</th>
                      <th className="p-3 font-semibold text-primary">Does Aliya Financial LLC share?</th>
                      <th className="p-3 font-semibold text-primary">Can you limit this sharing?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SHARING_ROWS.map((row, i) => (
                      <tr key={i} className="border-t border-border">
                        <td className="p-3 text-muted-foreground">{row.reason}</td>
                        <td className="p-3 text-muted-foreground">{row.share}</td>
                        <td className="p-3 text-muted-foreground">{row.limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-4">
                <strong className="text-primary">Questions?</strong> Call 732-508-7320 or email{' '}
                <a href="mailto:michael@aliyafinancial.com" className="text-gold-600 hover:text-gold-500 underline">
                  michael@aliyafinancial.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Who We Are
              </h2>
              <p className="text-muted-foreground">
                <strong className="text-primary">Who is providing this notice?</strong> Aliya Financial LLC, a registered investment adviser (CRD #340264).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                What We Do
              </h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">How does Aliya Financial LLC protect my personal information?</strong> To protect your personal information from unauthorized access and use, we use security measures that comply with federal and state law. These measures include administrative, technical, and physical safeguards, such as secure data storage, restricted system access, and secure handling of client records and files.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">How does Aliya Financial LLC collect my personal information?</strong> We collect your personal information, for example, when you:
              </p>
              <ul className="diamond-bullets space-y-2 text-muted-foreground mb-3">
                <li>Open an account or provide account or contact information</li>
                <li>Enter into an investment advisory contract with us</li>
                <li>Direct us to buy or sell securities, or give us your income or asset information</li>
                <li>Tell us about your investment or retirement portfolio</li>
              </ul>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">Why can't I limit all sharing?</strong> Federal and state law give you the right to limit only:
              </p>
              <ul className="diamond-bullets space-y-2 text-muted-foreground">
                <li>Sharing for affiliates' everyday business purposes: information about your creditworthiness</li>
                <li>Affiliates from using your information to market to you</li>
                <li>Sharing for nonaffiliates to market to you</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                State laws and individual companies may give you additional rights to limit sharing.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Definitions
              </h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">Affiliates:</strong> Companies related by common ownership or control. They can be financial and nonfinancial companies. Aliya Financial LLC has no affiliates.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">Nonaffiliates:</strong> Companies not related by common ownership or control. They can be financial and nonfinancial companies. Aliya Financial LLC does not share with nonaffiliates so they can market to you. Information may be shared with your account custodian or broker-dealer as necessary to open and service your account; this sharing falls under our everyday business purposes described above, not marketing.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-primary">Joint Marketing:</strong> A formal agreement between nonaffiliated financial companies that together market financial products or services to you. Aliya Financial LLC doesn't jointly market.
              </p>
            </section>
          </div>

          {/* Last Updated */}
          <div className="text-center text-muted-foreground text-sm mt-10 pt-6 border-t border-border">
            <p>Last Updated: August 25, 2026</p>
          </div>

          {/* Website Privacy (merged from the former /website-privacy page; DRAFT FOR COMPLIANCE REVIEW).
              Trackers described reflect what the site loads as of Oct 19, 2026: Meta Pixel, Google Fonts,
              Formspree forms, an embedded Google Form on /events, the AI education tool on /tools, and
              browser localStorage for questionnaires. No Google Analytics or Vercel Analytics. */}
          <section id="website" className="mt-12 pt-10 border-t-2 border-gold-500 scroll-mt-24">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">Website Privacy</h2>
            <div className="border-l-4 border-gold-500 bg-card/50 p-6 mb-8 rounded-r-lg">
              <p className="text-muted-foreground">
                This section explains what information Aliya Financial, LLC collects when you visit
                aliyafinancial.com or use its forms, and how we use it.
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">What We Collect</h3>
                <ul className="diamond-bullets space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-primary">Information you enter in our forms.</strong> When you
                    submit a form on this site, such as the contact form or a consultation request, we
                    collect what you enter. This may include your name, email address, phone number, and
                    message. The contact form also asks for your location, topic of interest, and how you
                    heard about us. Form submissions are delivered to us through our form provider,
                    Formspree. Event registrations use an embedded Google Form, which collects the details
                    shown on that form.
                  </li>
                  <li>
                    <strong className="text-primary">Questions you type into our education tool.</strong> If
                    you use the education tool on our Tools page, what you type is sent through our server
                    to a third-party AI service provider to generate a response. Please do not enter
                    account numbers or other sensitive details. The tool provides general education, not
                    advice.
                  </li>
                  <li>
                    <strong className="text-primary">Answers saved on your device.</strong> Some of our
                    questionnaires save your answers in your browser so you can come back to them. These
                    answers stay on your device and are not sent to us.
                  </li>
                  <li>
                    <strong className="text-primary">Basic technical information.</strong> Like most
                    websites, our hosting provider (Vercel) and the services described below automatically
                    receive basic technical information, such as your IP address, browser type, and the
                    pages you visit.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">Cookies and Tracking</h3>
                <ul className="diamond-bullets space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-primary">Meta Pixel.</strong> We use the Meta Pixel, a tool from
                    Meta Platforms, the company behind Facebook and Instagram. It uses cookies and similar
                    technology to record visits to our pages and certain actions, such as clicking a phone
                    or email link or successfully submitting a form, so we can measure and improve our
                    advertising on Meta. We do not send your name, email address, phone number, or form
                    answers to Meta through the Pixel. Meta may combine this information with other
                    information it has about you, under its own privacy policy.
                  </li>
                  <li>
                    <strong className="text-primary">Google Fonts.</strong> Our pages load fonts from Google
                    Fonts, which receives your IP address and browser information when the fonts load.
                  </li>
                  <li>
                    We do not currently use Google Analytics or any other website analytics service.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">How We Use Your Information</h3>
                <p className="text-muted-foreground">
                  We use the information you submit to respond to your inquiry and to provide the services
                  you ask about. We use website and Pixel information to run the site and measure our
                  advertising. We share information with service providers that help us run this site
                  (Vercel, Formspree, Google, Meta, and our AI provider) so they can provide those services,
                  and when required by law. We keep records as required by securities regulations.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">We Do Not Sell Your Information</h3>
                <p className="text-muted-foreground">We do not sell or rent your personal information.</p>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">Your Choices</h3>
                <ul className="diamond-bullets space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-primary">Texts.</strong> Reply STOP to any text message from us
                    to stop receiving texts.
                  </li>
                  <li>
                    <strong className="text-primary">Email.</strong> Email{" "}
                    <a href="mailto:michael@aliyafinancial.com" className="text-gold-600 hover:text-gold-500 underline">michael@aliyafinancial.com</a>{" "}
                    and ask to unsubscribe.
                  </li>
                  <li>
                    <strong className="text-primary">Calls.</strong> Ask us to stop calling by phone or
                    email, and we will.
                  </li>
                  <li>
                    <strong className="text-primary">Cookies.</strong> You can block or delete cookies in
                    your browser settings. Blocking cookies may limit the Meta Pixel.
                  </li>
                  <li>
                    <strong className="text-primary">Meta ads.</strong> You can control how Meta uses your
                    activity to show you ads in the ad preferences of your Facebook or Instagram account
                    settings.
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">Security</h3>
                <p className="text-muted-foreground">
                  We use reasonable safeguards to protect information we receive, but no website or internet
                  transmission is completely secure.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">Children</h3>
                <p className="text-muted-foreground">
                  This website is not directed to children under 13, and we do not knowingly collect their
                  information.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">Changes</h3>
                <p className="text-muted-foreground">
                  We may update this policy from time to time. The date below shows when it last changed.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-lg font-bold text-primary mb-3">Contact</h3>
                <p className="text-muted-foreground">
                  Aliya Financial, LLC
                  <br />
                  Phone: <a href="tel:+17325087320" className="text-gold-600 hover:text-gold-500 underline">732-508-7320</a>
                  <br />
                  Email:{" "}
                  <a href="mailto:michael@aliyafinancial.com" className="text-gold-600 hover:text-gold-500 underline">michael@aliyafinancial.com</a>
                </p>
              </section>
        
            </div>

            <div className="text-center text-muted-foreground text-sm mt-10 pt-6 border-t border-border">
              <p>Last updated: October 19, 2026</p>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
