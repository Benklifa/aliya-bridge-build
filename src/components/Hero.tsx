import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

const Hero = () => {
  return (
    <section 
      className="relative min-h-[700px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/lovable-uploads/80ed530d-61bc-49e2-a97f-d091d6bde7fb.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center h-full flex flex-col justify-between py-16">
        {/* Text content positioned higher above the road sign */}
        <div className="max-w-4xl mx-auto pt-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 fade-in drop-shadow-lg">
            Putting the puzzle together<br />for a successful Aliya
          </h1>
          
          <p className="text-xl md:text-2xl text-white fade-in max-w-3xl mx-auto drop-shadow-lg">
            Personalized Financial and Logistical support - before, during and happily-ever-after
          </p>
        </div>
        
        {/* Large spacer to push buttons below the road sign */}
        <div className="flex-grow min-h-[250px]"></div>
        
        {/* Buttons in 2×2 grid positioned lower below the road sign */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto fade-in pb-12">
          <Link 
            to="/framework" 
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary hover:bg-gold-500 hover:text-white transition-colors border-2 border-gold-500 px-6 py-4 rounded-md font-medium text-lg"
          >
            <span>Financial Planning</span>
            <ArrowRight size={20} />
          </Link>
          
          <Link 
            to="/aliya-project-planning" 
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary hover:bg-gold-500 hover:text-white transition-colors border-2 border-gold-500 px-6 py-4 rounded-md font-medium text-lg"
          >
            <span>Aliya Project Planning</span>
            <ArrowRight size={20} />
          </Link>
          
          <Link 
            to="/contact" 
            className="btn-gold inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-md font-semibold text-lg hover:scale-105 transition-transform"
          >
            <Calendar size={20} />
            <span>Request Information</span>
          </Link>
          
          <Link 
            to="/readiness" 
            className="inline-flex items-center justify-center space-x-2 bg-white text-primary hover:bg-gold-500 hover:text-white transition-colors border-2 border-gold-500 px-6 py-4 rounded-md font-medium text-lg"
          >
            <span>Aliya Financial Readiness Quiz</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;