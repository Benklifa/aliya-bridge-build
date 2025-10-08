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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/public-events.json');
      const data = await response.json();
      if (data.success && data.events) {
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };



  const handleOpenModal = (event: Event) => {
    setSelectedEvent(event);
    setShowSuccessMessage(false);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setRegistrationData({ name: '', email: '', phone: '' });
    setShowSuccessMessage(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value
    });
  };

 


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
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
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'btn-primary hover:opacity-90'
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
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
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

              {showSuccessMessage ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-green-600 text-4xl sm:text-5xl mb-3 sm:mb-4">✓</div>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2">
                    Registration Successful!
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                    Check your email for confirmation with the full event address.
                  </p>
                  <button
                    onClick={handleCloseModal}
                    className="btn-primary text-sm sm:text-base py-2 sm:py-3 px-6"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm sm:text-base text-black mb-4 sm:mb-6">
                    {selectedEvent.title}
                  </p>

                  <form onSubmit={handleSubmitRegistration} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={registrationData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={registrationData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-primary mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={registrationData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-blue-900">
                        Upon registration, you'll receive a confirmation email with the full event address and additional details.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="w-full sm:w-1/2 px-4 py-2 sm:py-3 text-sm sm:text-base font-medium text-primary border border-input rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-1/2 btn-primary text-sm sm:text-base py-2 sm:py-3 disabled:opacity-50"
                      >
                        {isSubmitting ? "Registering..." : "Complete Registration"}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Events;
