import Layout from "@/components/Layout";
import { Calendar, MapPin, Clock, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  registrationOpen: boolean;
}

const Events = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/public-events.json");
      const data = await response.json();
      if (data.success && data.events) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-black">Loading events...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-navy-50 to-white py-8 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 sm:mb-16">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
              Upcoming Events
            </h1>
            <p className="text-base sm:text-lg text-black">
              Join us for exclusive seminars and workshops on financial planning for Aliyah.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
            {events.map((event) => {
              return (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 sm:p-6"
                >
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-3 sm:mb-4">
                    {event.title}
                  </h3>
                  <p className="text-sm sm:text-base text-black mb-4 sm:mb-6">
                    {event.description}
                  </p>
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="flex items-center text-sm sm:text-base text-black">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-accent flex-shrink-0" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center text-sm sm:text-base text-black">
                      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-accent flex-shrink-0" />
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-start text-sm sm:text-base text-black">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-accent flex-shrink-0 mt-0.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleOpenModal(event)}
                    disabled={!event.registrationOpen}
                    className={`w-full py-2 sm:py-3 px-4 sm:px-6 rounded-md font-medium text-sm sm:text-base transition-colors ${
                      !event.registrationOpen
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "btn-primary hover:opacity-90"
                    }`}
                  >
                    Register Now
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary">
                  Register for Event
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="w-full">
                <p className="text-sm sm:text-base text-black mb-4">
                  {selectedEvent.title}
                </p>
                <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSexmArL4CcKymyBbBpOu-D6qtwRIx8WIosIVMay6K5gndmP5w/viewform?embedded=true"
                  width="100%"
                  height="600"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="rounded-md"
                >
                  Loading…
                </iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Events;
