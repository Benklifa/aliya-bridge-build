import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const CTAStrip = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-4">
            Learn about cross-border financial planning.
          </h2>
          
          <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
            Request an introductory educational meeting to discuss general cross-border financial planning considerations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="btn-gold inline-flex items-center space-x-2 px-8 py-4 rounded-md font-semibold text-lg hover:scale-105 transition-transform"
            >
              <Calendar size={20} />
              <span>Request Information</span>
            </Link>
            
            <Link 
              to="/framework"
              className="inline-flex items-center space-x-2 bg-white text-primary hover:bg-primary hover:text-white transition-colors border-2 border-primary px-8 py-4 rounded-md font-medium text-lg"
            >
              <span>Learn About Our Approach</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAStrip;