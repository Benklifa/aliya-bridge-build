import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

// Website Privacy Policy (covers aliyafinancial.com only).
// DRAFT FOR COMPLIANCE REVIEW: not yet approved by the CCO. The client GLBA
// privacy notice lives separately at /privacy (src/pages/Privacy.tsx).
// Trackers described here reflect what the site actually loads as of
// Oct 19, 2026: Meta Pixel, Google Fonts, Formspree forms, an embedded Google
// Form on /events, the AI education tool on /tools, and browser localStorage
// for questionnaires. No Google Analytics or Vercel Analytics is installed.
// Update this page if any tracker is added or removed.

const linkClass = "text-gold-600 hover:text-gold-500 underline";

const WebsitePrivacy = () => (
  <Layout>
    <div className="bg-primary pt-6 pb-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="fs-h1 font-serif font-bold text-white mb-2">Website Privacy Policy</h1>
          <hr className="hairline-gold" />
          <p className="fs-body-lg font-serif-italic text-white mt-4">
            How aliyafinancial.com collects and uses information.
          </p>
        </div>
      </div>
    </div>

    <div className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-l-4 border-gold-500 bg-card/50 p-6 mb-10 rounded-r-lg">
          <p className="text-muted-foreground">
            This policy explains what information Aliya Financial, LLC collects when you visit
            aliyafinancial.com or use its forms, and how we use it. It covers this website only. If you
            are a client, our <Link to="/privacy" className={linkClass}>Client Privacy Notice</Link> also
            applies.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="font-serif text-xl font-bold text-primary mb-3">What We Collect</h2>
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
                account numbers or other sensitive details.
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
            <h2 className="font-serif text-xl font-bold text-primary mb-3">Cookies and Tracking</h2>
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
            <h2 className="font-serif text-xl font-bold text-primary mb-3">How We Use Your Information</h2>
            <p className="text-muted-foreground">
              We use the information you submit only to respond to your inquiry and to provide the
              services you ask about.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-primary mb-3">We Do Not Sell Your Information</h2>
            <p className="text-muted-foreground">We do not sell or rent your personal information.</p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-primary mb-3">Your Choices</h2>
            <ul className="diamond-bullets space-y-3 text-muted-foreground">
              <li>
                <strong className="text-primary">Texts.</strong> Reply STOP to any text message from us
                to stop receiving texts.
              </li>
              <li>
                <strong className="text-primary">Email.</strong> Email{" "}
                <a href="mailto:michael@aliyafinancial.com" className={linkClass}>michael@aliyafinancial.com</a>{" "}
                and ask to unsubscribe.
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
            <h2 className="font-serif text-xl font-bold text-primary mb-3">Client Privacy Notice</h2>
            <p className="text-muted-foreground">
              If you become a client, our{" "}
              <Link to="/privacy" className={linkClass}>Client Privacy Notice</Link> explains how we
              collect, share, and protect client financial information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-primary mb-3">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this policy from time to time. The date below shows when it last changed.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-bold text-primary mb-3">Contact Us</h2>
            <p className="text-muted-foreground">
              Aliya Financial, LLC
              <br />
              Phone: <a href="tel:+17325087320" className={linkClass}>732-508-7320</a>
              <br />
              Email:{" "}
              <a href="mailto:michael@aliyafinancial.com" className={linkClass}>michael@aliyafinancial.com</a>
            </p>
          </section>
        </div>

        <div className="text-center text-muted-foreground text-sm mt-10 pt-6 border-t border-border">
          <p>Last updated: October 19, 2026</p>
        </div>
      </div>
    </div>
  </Layout>
);

export default WebsitePrivacy;
