import Layout from "../components/Layout";
import { Mail } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Michael Hanania Benklifa",
      title: "Licensed Financial Advisor",
      credentials: "Series 7, 63, 65 | Life & Health Insurance | MBA",
      image: "https://via.placeholder.com/300x300/1C2D41/C8A95E?text=Michael+Benklifa",
      bio: "Michael Hanania Benklifa is a licensed financial advisor holding Series 7, 63, and 65 registrations, as well as Life & Health Insurance licenses in the U.S. He holds dual MBAs from Texas A&M University and ESC, and is fluent in English, Hebrew, and French.\n\nHis practice focuses on cross-border financial planning, including multi-currency portfolio management and tax-aware investment strategies. Securities licensing in Israel is pending regulatory approval.\n\nNote: Certain investment strategies, including derivatives and alternatives, involve significant risk and may not be suitable for all investors.",
      email: "Michael@AliyaFinancial.com",
      specialties: [
        "Cross-border tax-aware planning",
        "Multi-currency portfolio management",
        "Retirement and estate planning for U.S.–Israel transitions"
      ]
    },
    {
      name: "Lisa Geller",
      title: "Principal, Operations & Compliance",
      credentials: "CISM | MBA (NYU Stern) | 25+ Years Banking Experience",
      image: "https://via.placeholder.com/300x300/3A8D92/F8F9FA?text=Lisa+Geller",
      bio: "Lisa Geller has over 25 years of experience in banking, finance, program management, and risk governance. She holds the Certified Information Security Manager (CISM) designation and an MBA from NYU Stern School of Business.\n\nHer work centers on operational processes and supporting compliance with applicable U.S. and Israeli financial regulations.",
      email: "Lisa@AliyaFinancial.com",
      specialties: [
        "Regulatory compliance support",
        "Cross-border operational logistics",
        "Risk governance frameworks",
        "Financial program management"
      ]
    }
  ];

  const whyReasons = [
    {
      title: "Licensed Expertise",
      description: "Proper licensing and credentials in U.S. markets; Israeli licensing pending approval"
    },
    {
      title: "Cross-Border Focus",
      description: "Knowledge of dual-country financial regulations and planning needs"
    },
    {
      title: "Client-Centered Approach",
      description: "Experience guiding families through the financial aspects of U.S.–Israel transitions"
    }
  ];

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              About Aliya Financial
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Expert guidance for your cross-border financial journey, 
              combining decades of experience with deep understanding 
              of U.S.-Israel financial transitions.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">

          {/* Team Members */}
          <div className="max-w-6xl mx-auto space-y-16 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg card-shadow p-8">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                  <div className="flex-shrink-0 text-center lg:text-left mb-8 lg:mb-0">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto lg:mx-0 mb-4 object-cover"
                    />
                    <a 
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center space-x-2 text-primary hover:text-gold-500 transition-colors"
                    >
                      <Mail size={18} />
                      <span>{member.email}</span>
                    </a>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="font-serif text-3xl font-bold text-primary mb-2">
                      {member.name}
                    </h2>
                    <h3 className="text-xl text-gold-500 font-semibold mb-2">
                      {member.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {member.credentials}
                    </p>
                    
                    <div className="prose prose-lg max-w-none mb-6">
                      {member.bio.split('\n\n').map((paragraph, i) => (
                        <p key={i} className="text-black mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-3">Areas of Focus:</h4>
                      <ul className="space-y-2">
                        {member.specialties.map((specialty, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-gold-500 mr-2">•</span>
                            <span className="text-black">{specialty}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Aliya Financial */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-bold text-white text-center mb-12">
              Why Aliya Financial
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyReasons.map((reason, index) => (
                <div key={index} className="bg-white rounded-lg card-shadow p-6 text-center">
                  <h3 className="font-semibold text-xl text-primary mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-black leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default About;
