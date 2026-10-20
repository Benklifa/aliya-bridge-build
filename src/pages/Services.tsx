import Layout from "@/components/Layout";
import ServicesPreview from "@/components/ServicesPreview";
import TwoCountryScenario from "@/components/TwoCountryScenario";
import { Link } from "react-router-dom";
import { Phone } from "lucide-react";

const Services = () => {
  return (
    <Layout>
      <ServicesPreview />

      {/* The Two-Country Scenario — signature planning model */}
      <TwoCountryScenario />

      <div className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="cta-panel text-center px-6 py-5 shadow-lg">
              <h2 className="font-serif text-xl font-bold text-primary mb-2">
                Ready to Get Started?
              </h2>
              <hr className="hairline-gold" />
              <p className="text-primary/70 text-sm mt-2 mb-4">
                Schedule a complimentary consultation to discuss which services
                are right for you.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-md font-semibold text-gold-600 hover:text-gold-500 transition-colors"
              >
                <Phone size={18} />
                <span>Request a free consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
