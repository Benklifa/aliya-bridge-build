import { Link } from "react-router-dom";
import { PieChart, TrendingUp, Briefcase, Calendar, FileText, ArrowRight } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      icon: PieChart,
      title: "Financial Planning",
      description: "Upon registration approval: Comprehensive cross-border financial strategies tailored for Aliyah transitions.",
    },
    {
      icon: TrendingUp,
      title: "Investment Management", 
      description: "Upon registration approval: Professional portfolio management with dual-country tax optimization. Investing involves risk.",
    },
    {
      icon: Briefcase,
      title: "Alternative Investments",
      description: "Upon registration approval: For accredited investors only. Alternative investments involve substantial risk and may not be suitable for all investors.",
    },
    {
      icon: Calendar,
      title: "Retirement Income Strategies",
      description: "Upon registration approval: Sustainable income planning for U.S.-Israel retirement scenarios.",
    },
    {
      icon: FileText,
      title: "Complete Aliyah Planning",
      description: "Upon registration approval: Full budgeting and retirement plan for Aliyah or dual-country retirement.",
    },
    {
      icon: Calendar,
      title: "Aliya Project Management",
      description: "Educational planning tools and resources. Full project management services available upon registration approval.",
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
              Comprehensive solutions for every stage of your Aliyah journey
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