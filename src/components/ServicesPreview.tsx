import { Link } from "react-router-dom";
import { PieChart, TrendingUp, Briefcase, Calendar, FileText, ArrowRight } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      icon: PieChart,
      title: "Financial Planning",
      description: "Comprehensive cross-border financial planning and strategies tailored to your Aliyah transition.",
    },
    {
      icon: TrendingUp,
      title: "Investment Management", 
      description: "Professional portfolio management with tax-aware investment strategies, considering dual-country implications. Investing involves risk.",
    },
    {
      icon: Briefcase,
      title: "Alternative Investments",
      description: "Alternative investment strategies and risk management. Services available for accredited investors.",
    },
    {
      icon: Calendar,
      title: "Retirement Income Strategies",
      description: "Comprehensive retirement income planning and strategies.",
    },
    {
      icon: FileText,
      title: "Complete Aliyah Planning",
      description: "Comprehensive planning services for Aliyah and dual-country retirement scenarios.",
    },
    {
      icon: Calendar,
      title: "Aliya Project Management",
      description: "Comprehensive project management and organizational support throughout your Aliya process.",
    }
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Comprehensive financial planning and advisory services for your Aliyah journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-card rounded-lg card-shadow p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <IconComponent size={20} className="text-accent" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-card-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;