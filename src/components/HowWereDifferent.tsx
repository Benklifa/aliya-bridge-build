import { Award, Target, Globe, Shield } from "lucide-react";

const HowWereDifferent = () => {
  const differentiators = [
    {
      icon: Award,
      title: "Licensed & Experienced",
      description: "Cross-border planning, investment, and compliance expertise with U.S. and Israeli market knowledge.",
      color: "text-blue-600"
    },
    {
      icon: Target,
      title: "Defined Success",
      description: "Your lifestyle—now and later—drives the plan and the metrics we use to measure progress.",
      color: "text-green-600"
    },
    {
      icon: Globe,
      title: "Cross-Border Mastery",
      description: "U.S.–Israel taxes, regulations, and logistics integrated seamlessly into your comprehensive plan.",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Fiduciary Mindset",
      description: "Transparent recommendations aligned with your goals, not commission-driven product sales.",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-navy-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              How We're Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Banking-grade expertise meets personalized cross-border financial planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-lg card-shadow p-6 text-center hover:shadow-lg transition-shadow group"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <IconComponent size={24} className={`${item.color} group-hover:scale-110 transition-transform`} />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWereDifferent;