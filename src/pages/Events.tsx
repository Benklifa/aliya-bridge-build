import Layout from "@/components/Layout";
import { Calendar, MapPin, Clock, Users } from "lucide-react";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Cross-Border Financial Planning Seminar",
      description: "Join us for an in-depth discussion on managing finances across U.S. and Israeli markets, including tax optimization strategies.",
      date: "December 15, 2024",
      time: "7:00 PM - 9:00 PM EST",
      location: "Highland Park Community Center",
      category: "Financial Planning",
      capacity: 50
    },
    {
      id: 2,
      title: "Medicare & Israeli Healthcare Workshop", 
      description: "Understanding the intersection of Medicare benefits and Israeli healthcare systems for dual residents.",
      date: "January 20, 2025",
      time: "2:00 PM - 4:00 PM EST",
      location: "Online Webinar",
      category: "Healthcare Planning",
      capacity: 100
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Cross-Border Estate Planning Workshop",
      description: "Comprehensive workshop covering wills, trusts, and beneficiary strategies for U.S.-Israel estate planning.",
      date: "September 15, 2024",
      location: "Highland Park Community Center",
      category: "Estate Planning"
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-5xl font-bold text-foreground mb-6">
              Events & Workshops
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us for educational seminars and workshops designed specifically 
              for those planning Aliyah or considering dual-country retirement.
            </p>
          </div>

          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
              Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="bg-card rounded-lg card-shadow p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
                <button className="w-full btn-primary">
                  Register Now
                </button>
              </div>
            ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <div key={event.id} className="bg-card rounded-lg card-shadow p-6">
                <h3 className="text-xl font-bold text-card-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {event.description}
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;