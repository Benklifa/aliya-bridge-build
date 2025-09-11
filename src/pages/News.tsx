import Layout from "@/components/Layout";
import { ExternalLink, Calendar, User } from "lucide-react";

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: "The Complete Guide to Cross-Border Financial Planning",
      description: "Michael Benklifa's comprehensive guide to managing finances across U.S. and Israeli markets.",
      author: "Michael Hanania Benklifa",
      date: "2024",
      type: "book",
      link: "https://example.com/book1"
    },
    {
      id: 2,
      title: "Alternative Investment Strategies for Qualified Investors",
      description: "Advanced investment approaches for high-net-worth individuals navigating cross-border regulations.",
      author: "Michael Hanania Benklifa", 
      date: "2023",
      type: "book",
      link: "https://example.com/book2"
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold text-foreground mb-6">
              Aliya Financial in the News
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Books, articles, and media appearances featuring our expertise 
              in cross-border financial planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((item) => (
              <div key={item.id} className="bg-card rounded-lg card-shadow overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-card-foreground mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <User size={16} />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium"
                  >
                    <span>Read More</span>
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default News;