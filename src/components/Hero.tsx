import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/lovable-uploads/9910b6d4-7800-4fca-b397-1e1d4f4302ad.png')`,
        }}
      />
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-8 fade-in">
            Financial clarity for a successful Aliyah.
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 fade-in max-w-3xl mx-auto">
            Cross-border planning to help you afford the lifestyle you want—now and later.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in">
            <Link 
              to="/contact" 
              className="btn-gold inline-flex items-center space-x-2 px-8 py-4 rounded-md font-semibold text-lg hover:scale-105 transition-transform"
            >
              <Calendar size={20} />
              <span>Schedule a Free Consultation</span>
            </Link>
            
            <Link 
              to="/framework" 
              className="inline-flex items-center space-x-2 text-white hover:text-gold-500 transition-colors border border-white/30 px-8 py-4 rounded-md font-medium text-lg hover:border-gold-500"
            >
              <span>Explore the A.L.I.Y.A Framework</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;