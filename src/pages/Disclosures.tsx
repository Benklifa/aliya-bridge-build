import React from 'react';
import Layout from '../components/Layout';

const Disclosures: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-4xl font-bold text-navy-900 mb-4">
              Important Disclosures
            </h1>
            <p className="text-lg text-gray-700">
              Please read these important disclosures carefully before using our website or services.
            </p>
          </div>

          {/* Registration Status */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Registration Status
            </h2>
            <p className="text-gray-800 mb-4">
              <strong>Aliya Financial is currently applying for registration as an Investment Adviser with the State of New Jersey.</strong> Investment advisory services will only be offered after registration is approved by the New Jersey Bureau of Securities.
            </p>
            <p className="text-gray-800">
              Until registration is approved, Aliya Financial is not authorized to provide investment advisory services. Information on this website is for educational purposes only.
            </p>
          </div>

          {/* Form ADV */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Form ADV
            </h2>
            <p className="text-gray-700 mb-4">
              Upon registration approval, our Form ADV Part 2A (firm brochure) will be available here and through the SEC's Investment Adviser Public Disclosure (IAPD) database at{' '}
              <a 
                href="https://adviserinfo.sec.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                adviserinfo.sec.gov
              </a>.
            </p>
            <p className="text-gray-700">
              Form ADV Part 2A contains important information about our firm, including our services, fees, conflicts of interest, and disciplinary history (if any).
            </p>
          </div>

          {/* Investment Risks */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Investment Risks
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Investing involves risk, including possible loss of principal.</strong> Past performance does not guarantee future results. Different types of investments involve varying degrees of risk, and there can be no assurance that any specific investment or strategy will be suitable or profitable for a client's portfolio.
            </p>
            <p className="text-gray-700">
              All investment strategies have the potential for profit or loss. Changes in investment strategies, contributions, or withdrawals may materially alter the performance and results of your portfolio.
            </p>
          </div>

          {/* Cross-Border Risks */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Cross-Border Investment Risks
            </h2>
            <p className="text-gray-700 mb-4">
              Cross-border investing between the United States and Israel involves additional risks including:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><strong>Currency Exchange Rate Fluctuations:</strong> Changes in USD/ILS exchange rates can significantly impact investment returns and purchasing power.</li>
              <li><strong>Political and Economic Instability:</strong> International investments may be affected by political events, economic conditions, and government policies in multiple countries.</li>
              <li><strong>Regulatory Differences:</strong> Different securities regulations, accounting standards, and investor protections apply in different countries.</li>
              <li><strong>Tax Implications:</strong> Cross-border investments may have complex tax consequences in multiple jurisdictions. Consult with a qualified tax professional.</li>
              <li><strong>Liquidity Risks:</strong> International securities may be less liquid than U.S. securities and may be more difficult to sell.</li>
              <li><strong>Information Access:</strong> Less information may be publicly available about foreign companies and markets.</li>
            </ul>
          </div>

          {/* Alternative Investments */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Alternative Investments
            </h2>
            <p className="text-gray-700 mb-4">
              Alternative investments, including derivatives, options, and other complex strategies, involve substantial risk and may not be suitable for all investors. These investments may:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Be highly illiquid with limited or no ability to sell</li>
              <li>Involve leverage, which can magnify both gains and losses</li>
              <li>Have limited regulatory oversight</li>
              <li>Require meeting specific accredited investor qualifications</li>
              <li>Have complex tax treatment</li>
              <li>Lack transparency in valuation and performance</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Alternative investments are generally only suitable for sophisticated investors who can afford to lose their entire investment.
            </p>
          </div>

          {/* No Guarantees */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              No Guarantees
            </h2>
            <p className="text-gray-700">
              Aliya Financial does not guarantee any specific level of performance, investment returns, or outcomes. All investments carry risk of loss. Any projections, forecasts, or hypothetical scenarios presented are for illustrative purposes only and should not be considered guarantees of future performance.
            </p>
          </div>

          {/* Educational Information Only */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Educational Information Only
            </h2>
            <p className="text-gray-700 mb-4">
              Information on this website is for educational purposes only and does not constitute:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Investment advice or recommendations</li>
              <li>Legal advice</li>
              <li>Tax advice</li>
              <li>An offer to sell or solicitation to buy securities</li>
              <li>A comprehensive analysis of any investment or strategy</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Personalized investment advice will only be provided after Aliya Financial receives registration approval from the State of New Jersey and a client enters into a written advisory agreement.
            </p>
          </div>

          {/* No Advisory Relationship */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              No Advisory Relationship Created
            </h2>
            <p className="text-gray-700">
              Use of this website, submission of contact forms, or participation in educational tools (such as readiness quizzes) does not create an advisory relationship with Aliya Financial. An advisory relationship is only created through execution of a written advisory agreement after registration approval.
            </p>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Privacy
            </h2>
            <p className="text-gray-700">
              Please review our{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-800 underline">
                Privacy Policy
              </a>{' '}
              for information about how we collect, use, and protect your personal information. We are committed to maintaining the confidentiality and security of client information in accordance with applicable regulations.
            </p>
          </div>

          {/* Questions or Complaints */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">
              Questions or Complaints
            </h2>
            <p className="text-gray-700 mb-4">
              For questions about our services or to file a complaint, please contact:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-gray-800"><strong>Aliya Financial</strong></p>
              <p className="text-gray-700">Email: info@aliyafinancial.com</p>
              <p className="text-gray-700">Phone: 516-639-7000</p>
              <p className="text-gray-700">Location: Highland Park, NJ (USA)</p>
            </div>
            <p className="text-gray-700 mb-2">
              You may also contact the New Jersey Bureau of Securities:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800"><strong>New Jersey Bureau of Securities</strong></p>
              <p className="text-gray-700">Phone: (973) 504-3600</p>
              <p className="text-gray-700">
                Website:{' '}
                <a 
                  href="https://www.njconsumeraffairs.gov/bos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  www.njconsumeraffairs.gov/bos
                </a>
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-center text-gray-600 text-sm mt-8">
            <p>Last Updated: February 6, 2026</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Disclosures;
