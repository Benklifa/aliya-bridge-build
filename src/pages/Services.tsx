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

      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* CTA Section */}
          <div className="max-w-4xl mx-auto bg-primary rounded-lg p-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white mb-8">
              Schedule a complimentary consultation to discuss which services
              are right for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-gold inline-flex items-center space-x-2 px-8 py-4 rounded-md font-semibold text-lg hover:scale-105 transition-transform"
              >
                <Phone size={20} />
                <span>Schedule a Free Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
