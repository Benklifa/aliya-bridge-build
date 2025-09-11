import Layout from "@/components/Layout";
import { BookOpen, Newspaper, Radio, ExternalLink, Download } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      type: "book",
      icon: BookOpen,
      title: "The Complete Guide to Cross-Border Financial Planning",
      description: "A comprehensive resource for Americans planning Aliyah, covering everything from tax optimization to investment strategies across U.S. and Israeli markets.",
      author: "Michael Hanania Benklifa",
      publication: "Self-Published",
      date: "2024",
      link: "#",
      image: "https://via.placeholder.com/200x300/1C2D41/C8A95E?text=Book+Cover",
      category: "Publication"
    },
    {
      type: "book",
      icon: BookOpen,
      title: "Alternative Investment Strategies for Cross-Border Wealth Management",
      description: "Advanced strategies for qualified investors navigating complex international regulations while maximizing returns through derivatives and alternative investments.",
      author: "Michael Hanania Benklifa",
      publication: "Financial Planning Press",
      date: "2023",
      link: "#",
      image: "https://via.placeholder.com/200x300/3A8D92/F8F9FA?text=Alt+Investments",
      category: "Publication"
    },
    {
      type: "article",
      icon: Newspaper,
      title: "Maximizing the Israeli 10-Year Tax Exemption",
      description: "Expert analysis on strategic approaches to the new resident tax exemption, including timing considerations and investment restructuring.",
      author: "Michael Hanania Benklifa",
      publication: "Financial Planning Magazine",
      date: "November 2024",
      link: "#",
      image: "https://via.placeholder.com/200x300/C8A95E/1C2D41?text=FP+Magazine",
      category: "Article"
    },
    {
      type: "interview",
      icon: Radio,
      title: "Cross-Border Retirement Planning: A New Paradigm",
      description: "In-depth discussion on the evolving landscape of U.S.-Israel retirement planning and the unique challenges facing dual-country retirees.",
      author: "Michael Hanania Benklifa & Lisa Geller",
      publication: "Investment News Podcast",
      date: "October 2024",
      link: "#",
      image: "https://via.placeholder.com/200x300/1C2D41/F8F9FA?text=Podcast",
      category: "Media"
    },
    {
      type: "article",
      icon: Newspaper,
      title: "Currency Hedging for Aliyah: Beyond the Basics",
      description: "Advanced strategies for managing currency risk in cross-border financial planning, with practical case studies and implementation guidelines.",
      author: "Lisa Geller",
      publication: "Wealth Management Today",
      date: "September 2024",
      link: "#",
      image: "https://via.placeholder.com/200x300/3A8D92/C8A95E?text=WM+Today",
      category: "Article"
    },
    {
      type: "interview",
      icon: Radio,
      title: "The Future of Cross-Border Financial Services",
      description: "Panel discussion on regulatory changes, technology innovations, and emerging trends in international financial planning.",
      author: "Michael Hanania Benklifa",
      publication: "Financial Services Summit",
      date: "August 2024",
      link: "#",
      image: "https://via.placeholder.com/200x300/C8A95E/3A8D92?text=Summit",
      category: "Media"
    }
  ];

  const categories = ["All", "Publication", "Article", "Media"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All" 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-serif text-5xl font-bold text-primary mb-6">
              Aliya Financial in the News
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Recognized expertise in cross-border financial planning through 
              publications, media appearances, and thought leadership.
            </p>
          </div>

          {/* Category Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    selectedCategory === category 
                      ? "bg-primary text-white" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* News Items Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <article key={index} className="bg-white rounded-lg card-shadow overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <IconComponent size={16} className="text-accent" />
                      <span className="text-xs font-medium text-accent uppercase tracking-wide">
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Author:</span> {item.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">Published in:</span> {item.publication}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium text-sm"
                      >
                        <span>
                          {item.type === "book" ? "Purchase" : "Read More"}
                        </span>
                        <ExternalLink size={14} />
                      </a>
                      
                      {item.type === "book" && (
                        <button className="inline-flex items-center space-x-1 text-muted-foreground hover:text-foreground text-xs">
                          <Download size={12} />
                          <span>Sample</span>
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="max-w-2xl mx-auto mt-16 text-center bg-primary rounded-lg p-8">
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Media Inquiries
            </h2>
            <p className="text-white/90 mb-6">
              Interested in interviewing our experts or featuring our insights? 
              We're available for podcasts, articles, and speaking engagements.
            </p>
            <a 
              href="/contact"
              className="btn-gold"
            >
              Contact Our Media Team
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Add missing import
import { useState } from "react";

export default News;