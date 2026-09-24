import React from 'react';
import Layout from '../components/Layout';

const Disclosures: React.FC = () => {
  return (
    <Layout>
      <div className="bg-primary pt-6 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              Important Disclosures
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white mt-4">
              Please read these important disclosures carefully before using our website or services.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Registration Status */}
          <div className="border-l-4 border-gold-500 bg-card/50 p-6 mb-10 rounded-r-lg">
            <h2 className="font-serif text-xl font-bold text-primary mb-3">
              Registration Status
            </h2>
            <p className="text-muted-foreground mb-3">
              <strong className="text-primary">Aliya Financial LLC is registered as an Investment Adviser in the State of New Jersey.</strong> Registration does not imply a certain level of skill or training.
            </p>
            <p className="text-muted-foreground">
              Aliya Financial offers investment advisory services pursuant to written advisory agreements with clients.
            </p>
          </div>

          <div className="space-y-10">
            {/* Regulatory Filings */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Regulatory Filings
              </h2>
              <p className="text-muted-foreground mb-3">
                Our Form ADV Part 2A (Disclosure Brochure) contains detailed information regarding our services, fees, and business practices. A copy is available upon request and will be provided to all prospective clients before any advisory relationship begins. Fees are negotiable and will be clearly outlined in a written Investment Advisory Agreement and described in the Form ADV Part 2A.
              </p>
              <p className="text-muted-foreground">
                Additional information about Aliya Financial LLC is available on the Investment Adviser Public Disclosure website at{' '}
                <a
                  href="https://adviserinfo.sec.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-600 hover:text-gold-500 underline"
                >
                  adviserinfo.sec.gov
                </a>.
              </p>
              <p className="text-muted-foreground mt-3">
                A copy of our Form CRS (Client Relationship Summary) is available below:
              </p>
              <div className="mt-4">
                <a
                  href="/form-crs.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm"
                >
                  Download Form CRS
                </a>
              </div>
            </section>

            {/* Investment Risks */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Investment Risks
              </h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">Investing involves risk, including possible loss of principal.</strong> Past performance does not guarantee future results. Different types of investments involve varying degrees of risk, and there can be no assurance that any specific investment or strategy will be suitable or profitable for a client's portfolio.
              </p>
              <p className="text-muted-foreground">
                All investment strategies have the potential for profit or loss. Changes in investment strategies, contributions, or withdrawals may materially alter the performance and results of your portfolio.
              </p>
            </section>

            {/* Cross-Border Risks */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Cross-Border Investment Risks
              </h2>
              <p className="text-muted-foreground mb-3">
                Cross-border investing between the United States and Israel involves additional risks including:
              </p>
              <ul className="diamond-bullets space-y-2 text-muted-foreground">
                <li><strong className="text-primary">Currency Exchange Rate Fluctuations:</strong> Changes in USD/ILS exchange rates can significantly impact investment returns and purchasing power.</li>
                <li><strong className="text-primary">Political and Economic Instability:</strong> International investments may be affected by political events, economic conditions, and government policies in multiple countries.</li>
                <li><strong className="text-primary">Regulatory Differences:</strong> Different securities regulations, accounting standards, and investor protections apply in different countries.</li>
                <li><strong className="text-primary">Tax Implications:</strong> Cross-border investments may have complex tax consequences in multiple jurisdictions. Consult with a qualified tax professional.</li>
                <li><strong className="text-primary">Liquidity Risks:</strong> International securities may be less liquid than U.S. securities and may be more difficult to sell.</li>
                <li><strong className="text-primary">Information Access:</strong> Less information may be publicly available about foreign companies and markets.</li>
              </ul>
            </section>

            {/* Alternative Investments */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Educational Information Regarding Alternative Investments
              </h2>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">Alternative investments involve substantial risk including limited liquidity, valuation uncertainty, lack of transparency, and potential conflicts of interest. These investments are not suitable for all investors.</strong>
              </p>
              <p className="text-muted-foreground mb-3">
                This website may contain educational information regarding alternative investments, including derivatives, options, hedge funds, private equity, real estate partnerships, and other complex strategies. These investments involve substantial risk and may not be suitable for all investors. Alternative investments may:
              </p>
              <ul className="diamond-bullets space-y-2 text-muted-foreground">
                <li><strong className="text-primary">Limited Liquidity:</strong> Be highly illiquid with limited or no ability to sell or redeem investments</li>
                <li><strong className="text-primary">Leverage Risk:</strong> Involve leverage, which can magnify both gains and losses</li>
                <li><strong className="text-primary">Valuation Uncertainty:</strong> Lack transparent pricing and may be difficult to value accurately</li>
                <li><strong className="text-primary">Limited Oversight:</strong> Have limited regulatory oversight compared to traditional investments</li>
                <li><strong className="text-primary">Conflicts of Interest:</strong> May involve potential conflicts between the sponsor, manager, and investors</li>
                <li><strong className="text-primary">Accredited Investor Requirements:</strong> Require meeting specific accredited investor qualifications</li>
                <li><strong className="text-primary">Complex Tax Treatment:</strong> Have complex tax consequences that may vary by jurisdiction</li>
                <li><strong className="text-primary">Lack of Transparency:</strong> Provide limited disclosure about holdings, performance, and fees</li>
                <li><strong className="text-primary">High Fees:</strong> Often involve higher fees than traditional investments</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Educational content regarding alternative investments is provided for general awareness only. Alternative investments are generally only suitable for sophisticated investors who fully understand the risks and can afford to lose their entire investment. <strong className="text-primary">Any future discussions in this category, if offered, would be limited to eligible investors under applicable law.</strong> Aliya Financial does not offer, sell, or recommend specific alternative investment products at this time.
              </p>
            </section>

            {/* No Guarantees */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                No Guarantees
              </h2>
              <p className="text-muted-foreground">
                Aliya Financial does not guarantee any specific level of performance, investment returns, or outcomes. All investments carry risk of loss. Any projections, forecasts, or hypothetical scenarios presented are for illustrative purposes only and should not be considered guarantees of future performance.
              </p>
            </section>

            {/* Educational Information Only */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Educational Information Only
              </h2>
              <p className="text-muted-foreground mb-3">
                Information on this website is for educational purposes only and does not constitute:
              </p>
              <ul className="diamond-bullets space-y-2 text-muted-foreground">
                <li>Investment advice or recommendations</li>
                <li>Legal advice</li>
                <li>Tax advice</li>
                <li>An offer to sell or solicitation to buy securities</li>
                <li>A comprehensive analysis of any investment or strategy</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Personalized investment advice is provided after a client enters into a written advisory agreement with Aliya Financial.
              </p>
            </section>

            {/* No Advisory Relationship */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                No Advisory Relationship Created
              </h2>
              <p className="text-muted-foreground">
                Use of this website, submission of contact forms, or participation in educational tools (such as readiness quizzes) does not create an advisory relationship with Aliya Financial. An advisory relationship is only created through execution of a written advisory agreement.
              </p>
            </section>

            {/* Privacy */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Privacy
              </h2>
              <p className="text-muted-foreground mb-3">
                Please review our{' '}
                <a href="/privacy" className="text-gold-600 hover:text-gold-500 underline">
                  Privacy Policy
                </a>{' '}
                for information about how we collect, use, and protect your personal information.
              </p>
              <p className="text-muted-foreground mb-3">
                <strong className="text-primary">We protect non-public personal information in accordance with the Gramm-Leach-Bliley Act and applicable state regulations.</strong> We are committed to maintaining the confidentiality and security of client information and will provide our Privacy Notice to all clients upon establishment of an advisory relationship.
              </p>
              <p className="text-muted-foreground">
                <strong className="text-primary">Cybersecurity Notice:</strong> Aliya Financial maintains written cybersecurity policies and procedures designed to protect non-public personal information. In the event of a data incident involving non-public personal information, the firm will provide notifications as required by applicable law and regulation.
              </p>
            </section>

            {/* Questions or Complaints */}
            <section>
              <h2 className="font-serif text-xl font-bold text-primary mb-3">
                Questions or Complaints
              </h2>
              <p className="text-muted-foreground mb-3">
                For questions about our services or to file a complaint, please contact:
              </p>
              <div className="bg-card/50 p-4 rounded-lg mb-4">
                <p className="text-primary"><strong>Aliya Financial</strong></p>
                <p className="text-muted-foreground">Email: info@aliyafinancial.com</p>
                <p className="text-muted-foreground">Phone: 516-639-7000</p>
                <p className="text-muted-foreground">Location: Highland Park, NJ (USA)</p>
              </div>
              <p className="text-muted-foreground mb-2">
                You may also contact the New Jersey Bureau of Securities:
              </p>
              <div className="bg-card/50 p-4 rounded-lg">
                <p className="text-primary"><strong>New Jersey Bureau of Securities</strong></p>
                <p className="text-muted-foreground">Phone: (973) 504-3600</p>
                <p className="text-muted-foreground">
                  Website:{' '}
                  <a
                    href="https://www.njconsumeraffairs.gov/bos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold-600 hover:text-gold-500 underline"
                  >
                    www.njconsumeraffairs.gov/bos
                  </a>
                </p>
              </div>
            </section>
          </div>

          {/* Last Updated */}
          <div className="text-center text-muted-foreground text-sm mt-10 pt-6 border-t border-border">
            <p>Last Updated: February 6, 2026</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Disclosures;
