import Layout from "@/components/Layout";
import { Calendar, CheckSquare, FileText, Users } from "lucide-react";

const AliyaProjectPlanning = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Aliyah Project Management
            </h1>
            <p className="text-xl md:text-2xl text-gold-300">
              Planning and Hands-on logistics support
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Making Aliyah isn't just a move — it's a complete life transition. Between paperwork, housing, schools, healthcare, banking, and budgets, it's easy to feel lost. Many expect Nefesh B'Nefesh or an absorption center to handle the details, only to discover that much of the process falls on their shoulders.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                <strong className="text-primary">That's where Aliya Financial steps in.</strong>
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                We start with an in-depth conversation about the life you want in Israel — where you see yourself living, what lifestyle you hope to maintain, and how your finances can support it. Then we project-manage your Aliyah:
              </p>
            </div>

            {/* Key Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-card rounded-lg card-shadow p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Personalized Timelines</h3>
                    <p className="text-muted-foreground">Creating personalized timelines and to-do lists</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg card-shadow p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Document Organization</h3>
                    <p className="text-muted-foreground">Organizing documents and deadlines</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg card-shadow p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Research & Guidance</h3>
                    <p className="text-muted-foreground">Researching neighborhoods and schools</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg card-shadow p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary mb-2">Financial Planning</h3>
                    <p className="text-muted-foreground">Guiding you through budgets, banking, and housing options</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-navy-50 rounded-lg p-8 mb-12">
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Keeping You On Track</h3>
              <p className="text-lg text-muted-foreground mb-6">
                We keep you on track with updates and reminders throughout your journey.
              </p>
              <p className="text-lg text-muted-foreground">
                Meanwhile, as financial advisors licensed in both the U.S. and Israel, we align every decision with your long-term financial goals — investments, taxes, insurance, pensions, and retirement planning.
              </p>
            </div>

            {/* Gantt Chart Placeholder */}
            <div className="bg-card rounded-lg card-shadow p-8 mb-12">
              <h3 className="font-serif text-2xl font-bold text-primary mb-6 text-center">
                Your Aliyah Timeline
              </h3>
              <div className="bg-navy-50 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                <img 
                  src="/aliya-gantt-chart.png" 
                  alt="Aliyah Project Timeline Gantt Chart" 
                  className="w-full h-auto object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Sample Aliyah project timeline showing key milestones and tasks
              </p>
            </div>

            {/* Closing Statement */}
            <div className="text-center bg-gradient-to-br from-gold-500 to-gold-600 text-white rounded-lg p-8">
              <h3 className="font-serif text-2xl font-bold mb-4">
                Putting the Puzzle Together
              </h3>
              <p className="text-lg leading-relaxed">
                Together, we help you put the puzzle together — so your move to Israel is not just possible, but purposeful, calm, and financially sound.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AliyaProjectPlanning;

