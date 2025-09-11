import { BookOpen, Newspaper, Radio, ExternalLink } from "lucide-react";

const SocialProof = () => {
  const newsItems = [
    {
      type: "book",
      icon: BookOpen,
      title: "Cross-Border Financial Planning Guide",
      description: "Comprehensive guide to navigating U.S.-Israel financial transitions",
      author: "Michael Hanania Benklifa",
      link: "#",
      image: "https://via.placeholder.com/120x180/1C2D41/C8A95E?text=Book+Cover"
    },
    {
      type: "article",
      icon: Newspaper,
      title: "Aliyah Financial Strategies",
      description: "Featured article on cross-border retirement planning",
      publication: "Financial Planning Magazine",
      link: "#",
      image: "https://via.placeholder.com/120x180/3A8D92/F8F9FA?text=Article"
    },
    {
      type: "interview",
      icon: Radio,
      title: "Cross-Border Tax Planning",
      description: "Expert interview on U.S.-Israel tax optimization",
      publication: "Investment News Podcast",
      link: "#",
      image: "https://via.placeholder.com/120x180/C8A95E/1C2D41?text=Podcast"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">
              Aliya Financial in the News
            </h2>
            <p className="text-lg text-muted-foreground">
              Recognized expertise in cross-border financial planning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-card rounded-lg card-shadow p-6 hover:shadow-lg transition-shadow group block"
                >
                  <div className="flex items-start space-x-4">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-md flex-shrink-0"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <IconComponent size={16} className="text-accent" />
                        <span className="text-xs font-medium text-accent uppercase tracking-wide">
                          {item.type}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      
                      <p className="text-sm text-card-foreground mb-2 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {item.author || item.publication}
                        </span>
                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <a 
              href="/news"
              className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium"
            >
              <span>View All Media Coverage</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;