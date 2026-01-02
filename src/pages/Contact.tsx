import Layout from "@/components/Layout";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryState: "",
    topic: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const topics = [
    "Event Registration",
    "Financial Planning",
    "Investment Management", 
    "Alternative Investments",
    "Retirement Income Strategies",
    "Complete Aliyah Planning",
    "General Inquiry",
    "Other"
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Send form data to Formspree (delivers to Michael@aliyafinancial.com and Lisa@aliyafinancial.com)
    try {
      const response = await fetch("https://formspree.io/f/mjgkwkaz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          countryState: formData.countryState,
          topic: formData.topic,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Contact Form Submission - ${formData.topic || 'General Inquiry'}`
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Message Sent Successfully",
          description: "We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          countryState: "",
          topic: "",
          message: ""
        });
      } else {
        throw new Error("Form submission failed");
      }
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <CheckCircle size={64} className="text-green-600 mx-auto mb-6" />
              <h1 className="font-serif text-4xl font-bold text-primary mb-4">
                Thank You!
              </h1>
              <p className="text-xl text-black mb-8">
                Your message has been sent successfully. We'll review your inquiry 
                and get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-primary"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-serif text-5xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-white leading-relaxed">
              Tell us where you are in your Aliyah journey and how we can help 
              you achieve your cross-border financial goals.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg card-shadow p-8">
              <h2 className="font-serif text-2xl font-bold text-primary mb-6">
                Get in Touch
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-black mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="countryState" className="block text-sm font-medium text-black mb-2">
                      Country/State
                    </label>
                    <input
                      type="text"
                      id="countryState"
                      name="countryState"
                      value={formData.countryState}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                      placeholder="e.g., New York, USA"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-black mb-2">
                    Topic of Interest
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                  >
                    <option value="">Select a topic...</option>
                    {topics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-input rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
                    placeholder="Tell us about your Aliyah timeline, current financial situation, and specific questions..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-navy-50 rounded-lg p-8">
                <h3 className="font-serif text-2xl font-bold text-primary mb-6">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail size={24} className="text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Email</h4>
                      <p className="text-black">Lisa@AliyaFinancial.com</p>
                      <p className="text-black">Michael@AliyaFinancial.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <MapPin size={24} className="text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold text-primary mb-2">Locations</h4>
                      <p className="text-black mb-1">Highland Park, NJ (USA)</p>
                      <p className="text-black">Jerusalem, Israel</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg card-shadow p-8">
                <h3 className="font-serif text-xl font-bold text-primary mb-4">
                  What to Expect
                </h3>
                <ul className="space-y-3 text-sm text-black">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>We'll respond within 24 hours</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>Initial consultation is complimentary</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>All communications are confidential</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <span>No obligation to proceed after consultation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;