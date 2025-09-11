import Layout from "@/components/Layout";
import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Filter } from "lucide-react";

const Events = () => {
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");

  const upcomingEvents = [
    {
      id: 1,
      title: "Aliyah Financial Planning Workshop",
      date: "2024-12-15",
      time: "2:00 PM - 4:00 PM EST",
      location: "Highland Park, NJ",
      type: "In-Person Workshop",
      description: "Comprehensive overview of the A.L.I.Y.A Framework with interactive planning exercises and Q&A session.",
      capacity: "25 attendees",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Cross-Border Tax Strategies Webinar",
      date: "2024-12-22",
      time: "8:00 PM - 9:30 PM EST",
      location: "Online",
      type: "Webinar",
      description: "Deep dive into U.S.-Israel tax optimization strategies, including the 10-year exemption and investment timing.",
      capacity: "100 attendees",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Retirement Income Planning Seminar",
      date: "2025-01-10",
      time: "7:00 PM - 8:30 PM EST",
      location: "Jerusalem, Israel",
      type: "In-Person Seminar",
      description: "Strategies for creating sustainable income in retirement across both U.S. and Israeli markets.",
      capacity: "30 attendees",
      status: "upcoming"
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Medicare and Israeli Healthcare Integration",
      date: "2024-11-20",
      time: "7:00 PM - 8:30 PM EST",
      location: "Online",
      type: "Webinar",
      description: "Understanding how to coordinate Medicare benefits with Israeli healthcare systems.",
      capacity: "150 attendees",
      status: "past",
      recording: "Available"
    },
    {
      id: 5,
      title: "Currency Risk Management Workshop", 
      date: "2024-10-25",
      time: "3:00 PM - 5:00 PM EST",
      location: "New York, NY",
      type: "Workshop",
      description: "Practical strategies for managing USD/ILS currency exposure in your investment portfolio.",
      capacity: "20 attendees",
      status: "past",
      recording: "Available"
    },
    {
      id: 6,
      title: "Estate Planning Across Borders",
      date: "2024-09-18",
      time: "8:00 PM - 9:30 PM EST", 
      location: "Online",
      type: "Webinar",
      description: "Wills, trusts, and beneficiary planning for U.S.-Israel dual residents.",
      capacity: "200 attendees",
      status: "past",
      recording: "Available"
    }
  ];

  const allEvents = [...upcomingEvents, ...pastEvents];
  
  const filteredEvents = filter === "all" 
    ? allEvents 
    : allEvents.filter(event => event.status === filter);

  const handleRSVP = (eventId: number) => {
    // This would typically integrate with a calendar/booking system
    alert(`RSVP functionality would be integrated here for event ${eventId}`);
  };

  return (
    <Layout>
      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="font-serif text-5xl font-bold text-primary mb-6">
              Events & Education
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join us for workshops, webinars, and seminars designed to help you 
              navigate your cross-border financial planning journey.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  filter === "all" 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All Events
              </button>
              <button
                onClick={() => setFilter("upcoming")}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  filter === "upcoming" 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setFilter("past")}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  filter === "past" 
                    ? "bg-primary text-white" 
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Past Events
              </button>
            </div>
          </div>

          {/* Events List */}
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground">
                  Check back soon for upcoming educational events.
                </p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg card-shadow p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex-1 mb-4 lg:mb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-primary mb-2">
                            {event.title}
                          </h3>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            event.status === "upcoming" 
                              ? "bg-green-100 text-green-800" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {event.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-accent" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-accent" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-accent" />
                          <span>{event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 mt-2 text-sm">
                        <Users size={16} className="text-accent" />
                        <span>{event.capacity}</span>
                        {"recording" in event && event.recording && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-accent">Recording {(event as any).recording}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="lg:ml-6">
                      {event.status === "upcoming" ? (
                        <button
                          onClick={() => handleRSVP(event.id)}
                          className="btn-primary px-6 py-2 text-sm"
                        >
                          RSVP Now
                        </button>
                      ) : (
                        <button
                          onClick={() => alert("Recording access would be provided here")}
                          className="px-6 py-2 text-sm border border-accent text-accent hover:bg-accent hover:text-white transition-colors rounded-md"
                        >
                          View Recording
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Call to Action */}
          <div className="max-w-2xl mx-auto mt-16 text-center bg-navy-50 rounded-lg p-8">
            <h2 className="font-serif text-2xl font-bold text-primary mb-4">
              Stay Informed
            </h2>
            <p className="text-muted-foreground mb-6">
              Want to be notified about upcoming events and educational opportunities? 
              Contact us to join our mailing list.
            </p>
            <a 
              href="/contact"
              className="btn-primary"
            >
              Get Event Updates
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;