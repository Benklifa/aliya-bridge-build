import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import "./AliyaBuddy.css";

const AliyaBuddy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content: "Hi! I'm Aliya Buddy, your guide to making Aliyah. How can I help you today?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("https://aliyah-chat-backend.vercel.app/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "I'm sorry, I encountered an error. Please try again." 
        }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "I'm having trouble connecting right now. Please try again in a moment." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Convert markdown links to HTML
  const renderMessage = (content: string) => {
    // Simple markdown link parser: [text](url)
    const parts = content.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        return (
          <a
            key={index}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline font-medium"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Floating Chat Button - Left Side, Middle */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="aliya-buddy-button fixed left-6 top-1/2 z-50 bg-white hover:bg-gray-50 rounded-full shadow-2xl transition-all hover:scale-105 border-4 border-primary animate-bounce"
          aria-label="Open Aliya Buddy Chat"
          style={{ 
            width: '120px', 
            height: '120px'
          }}
        >
          <img 
            src="/aliya-buddy-icon.png" 
            alt="Aliya Buddy" 
            className="w-full h-full object-contain p-2"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-[90vw] sm:w-96 h-[600px] max-h-[80vh] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-primary text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/aliya-buddy-icon.png" 
                alt="Aliya Buddy" 
                className="w-10 h-10 rounded-full bg-white p-1"
              />
              <div>
                <h3 className="font-semibold">Aliya Buddy</h3>
                <p className="text-xs text-white/80">Your Aliyah Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded-full p-1 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-white"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <p className={`text-sm whitespace-pre-wrap ${
                    message.role === "user" ? "text-white" : "text-black"
                  }`}>
                    {message.role === "assistant" 
                      ? renderMessage(message.content)
                      : message.content
                    }
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-black border border-gray-200 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Aliyah..."
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="text-xs text-gray-600 mt-2 px-1">
              <p className="font-semibold mb-1">Important Disclaimer:</p>
              <p className="leading-relaxed">
                Aliya Buddy provides general educational information only and does not constitute financial, tax, legal, or investment advice. 
                For personalized guidance regarding your specific financial situation, please schedule a consultation with a qualified professional.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AliyaBuddy;
