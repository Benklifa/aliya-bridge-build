import Layout from "@/components/Layout";
import { Shuffle } from "lucide-react";
import { Link } from "react-router-dom";

const FrameworkAdapt = () => {
  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <Shuffle size={32} className="text-orange-600" />
                </div>
              </div>
              <div className="mb-4">
                <span className="font-serif text-5xl font-bold text-accent mr-3">A</span>
                <span className="text-4xl font-bold text-foreground">Adapt</span>
              </div>
              <p className="text-xl text-muted-foreground">
                Maintain liquidity and flexibility with cash reserves, currency access, and practical lending solutions.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8">
              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Emergency Fund & Cash Reserves
                </h2>
                <p className="text-muted-foreground mb-4">
                  Maintaining appropriate cash reserves in both currencies provides security and flexibility for 
                  unexpected expenses, currency fluctuations, and opportunities that may arise.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Multi-currency emergency fund allocation</li>
                  <li>Optimal cash reserve sizing for cross-border living</li>
                  <li>High-yield savings and money market optimization</li>
                  <li>Access and liquidity considerations across borders</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Currency Diversification Strategies
                </h2>
                <p className="text-muted-foreground mb-4">
                  Maintaining assets and income streams in both USD and ILS provides natural hedging against 
                  currency fluctuations and ensures access to funds in your currency of need.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Strategic currency allocation across asset classes</li>
                  <li>Natural hedging through income and expense matching</li>
                  <li>Currency-hedged vs. unhedged investment strategies</li>
                  <li>Forward contracts and currency derivatives when appropriate</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Home Equity Line of Credit (HELOC)
                </h2>
                <p className="text-muted-foreground mb-4">
                  Establishing a HELOC before international relocation is often easier as a U.S. resident. 
                  This provides a valuable source of low-cost capital that can be accessed as needed.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>HELOC establishment timing and qualification</li>
                  <li>Rate structures and repayment strategies</li>
                  <li>Tax deductibility considerations</li>
                  <li>Alternative uses and strategic deployment</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Asset-Based Lending Solutions
                </h2>
                <p className="text-muted-foreground mb-4">
                  Borrowing against investment portfolios provides access to capital without triggering taxable events 
                  or disrupting long-term investment strategies.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Securities-based lines of credit</li>
                  <li>Portfolio loan structures and terms</li>
                  <li>Margin lending considerations and risks</li>
                  <li>Non-purpose vs. purpose loan strategies</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Life Insurance Policy Loans
                </h2>
                <p className="text-muted-foreground mb-4">
                  Permanent life insurance policies with cash value provide another source of liquidity through 
                  policy loans, which are generally not taxable and don't require credit approval.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Policy loan mechanics and repayment options</li>
                  <li>Tax advantages and considerations</li>
                  <li>Impact on death benefits and policy performance</li>
                  <li>Strategic timing for policy loan utilization</li>
                </ul>
              </div>

              <div className="bg-card rounded-lg card-shadow p-8">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Banking & Financial Infrastructure
                </h2>
                <p className="text-muted-foreground mb-4">
                  Maintaining proper banking relationships and financial infrastructure in both countries ensures 
                  smooth operations and access to services when needed.
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Dual-country banking relationship management</li>
                  <li>International wire transfer optimization</li>
                  <li>Credit card and payment system access</li>
                  <li>Online banking and digital wallet strategies</li>
                </ul>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-12">
              <Link 
                to="/framework/y"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>← Previous: Y'rusha (Legacy)</span>
              </Link>
              
              <Link 
                to="/framework"
                className="inline-flex items-center space-x-2 text-accent hover:text-accent/80"
              >
                <span>Back to Framework Overview →</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FrameworkAdapt;