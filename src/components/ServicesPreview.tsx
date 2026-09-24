import { Link } from "react-router-dom";
import { PieChart, TrendingUp, Briefcase, Calendar, FileText } from "lucide-react";

const ServicesPreview = () => {
  const services = [
    {
      icon: PieChart,
      title: "Financial Planning",
      description: "Comprehensive financial planning for retirement, estate, wealth transfer, and major life transitions. Specialized expertise in U.S.-Israel cross-border scenarios.",
    },
    {
      icon: TrendingUp,
      title: "Investment Management", 
      description: "Professional portfolio management with tax-aware investment strategies, considering dual-country implications. Investing involves risk.",
    },
    {
      icon: Briefcase,
      title: "Alternative Investments",
      description: "Access to alternative investment strategies and risk management solutions for eligible accredited investors seeking portfolio diversification.",
    },
    {
      icon: Calendar,
      title: "Retirement Income Strategies",
      description: "Personalized retirement income strategies designed to provide lasting financial security — including Social Security optimization, IRA distributions, and pension planning.",
    },
    {
      icon: FileText,
      title: "Complete Aliyah Planning",
      description: "Specialized planning for individuals and families relocating to Israel — covering dual-country tax implications, asset transfer, currency, and benefits coordination.",
    }
  ];

  return (
    <section className="pt-6 pb-10 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="fs-h1 font-serif font-bold text-white mb-2">
              Our Services
            </h1>
            <hr className="hairline-gold" />
            <p className="fs-body-lg font-serif-italic text-white max-w-2xl mx-auto mt-4">
              Comprehensive financial planning for retirement, wealth management, and life's major transitions — including cross-border and Aliyah planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-lg card-shadow p-5 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                      <IconComponent size={20} className="text-accent" />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-card-foreground leading-snug">
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
