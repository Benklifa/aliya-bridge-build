import Layout from "@/components/Layout";
import { Mail, Linkedin, Award, Globe, BookOpen } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Michael Hanania Benklifa",
      title: "Licensed Financial Advisor",
      credentials: "Series 7, 63, 65 | Life & Health Insurance | MBA",
      image: "https://via.placeholder.com/300x300/1C2D41/C8A95E?text=Michael+Benklifa",
      bio: "Michael brings over 20 years of financial advisory experience with specialized expertise in derivatives-based alternative strategies for qualified investors. As a bestselling author, he has written extensively on cross-border financial planning. Licensed in the U.S. with Series 7, 63, and 65 securities licenses plus Life & Health insurance, with Israeli licensing currently pending. He holds dual MBAs from Texas A&M University and ESC, and is fluent in English, Hebrew, and French.",
      email: "Michael@AliyaFinancial.com",
      specialties: [
        "Cross-border tax optimization",
        "Alternative investment strategies", 
        "Derivatives-based planning",
        "Multi-currency portfolio management"
      ]
    },
    {
      name: "Lisa Geller",
      title: "Principal, Operations & Compliance",
      credentials: "CISM | MBA (NYU Stern) | 25+ Years Banking Experience",
      image: "https://via.placeholder.com/300x300/3A8D92/F8F9FA?text=Lisa+Geller",
      bio: "Lisa brings 25 years of experience in banking, finance, program management, risk governance, and regulatory compliance. She holds the prestigious Certified Information Security Manager (CISM) certification and an MBA from NYU Stern School of Business. Her expertise focuses on the operational and compliance aspects of cross-border financial planning, ensuring all regulatory requirements are met across jurisdictions.",
      email: "Lisa@AliyaFinancial.com", 
      specialties: [
        "Regulatory compliance management",
        "Cross-border operational logistics",
        "Risk governance frameworks",
        "Financial program management"
      ]
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-serif text-5xl font-bold text-primary mb-6">
              About Aliya Financial
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Expert guidance for your cross-border financial journey, 
              combining decades of experience with deep understanding 
              of U.S.-Israel financial transitions.
            </p>
          </div>

          {/* Team Members */}
          <div className="max-w-6xl mx-auto space-y-16 mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg card-shadow p-8">
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                  <div className="flex-shrink-0 text-center lg:text-left mb-8 lg:mb-0">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-lg object-cover mx-auto lg:mx-0 mb-4"
                    />
                    <div className="space-y-2">
                      <a 
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 transition-colors"
                      >
                        <Mail size={16} />
                        <span className="text-sm">{member.email}</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="font-serif text-3xl font-bold text-primary mb-2">
                      {member.name}
                    </h2>
                    <h3 className="text-xl text-accent font-medium mb-2">
                      {member.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 text-sm">
                      {member.credentials}
                    </p>
                    
                    <p className="text-foreground leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold text-primary mb-3">Areas of Expertise:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {member.specialties.map((specialty, specIndex) => (
                          <li key={specIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-accent rounded-full" />
                            <span className="text-sm text-muted-foreground">{specialty}</span>
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
          <div className="max-w-4xl mx-auto bg-navy-50 rounded-lg p-8">
            <h2 className="font-serif text-3xl font-bold text-primary text-center mb-8">
              Why Aliya Financial?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <Award size={32} className="text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-primary mb-2">Licensed Expertise</h3>
                <p className="text-sm text-muted-foreground">
                  Proper licensing and credentials in both U.S. and Israeli markets
                </p>
              </div>
              
              <div className="text-center">
                <Globe size={32} className="text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-primary mb-2">Cross-Border Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Specialized knowledge of dual-country financial regulations
                </p>
              </div>
              
              <div className="text-center">
                <BookOpen size={32} className="text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-primary mb-2">Proven Track Record</h3>
                <p className="text-sm text-muted-foreground">
                  Published expertise and real-world success stories
                </p>
              </div>
            </div>
            
            <p className="text-center text-muted-foreground leading-relaxed">
              Our team combines advanced credentials with practical experience in cross-border 
              financial planning. We understand the unique challenges of U.S.-Israel transitions 
              because we've helped hundreds of families navigate them successfully.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;