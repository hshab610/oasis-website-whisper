
import { useState, useEffect, useRef } from 'react';
import { usePromotion } from '@/contexts/PromotionContext';
import { Button } from '@/components/ui/button';
import { X, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../promotion/CountdownTimer';

type Message = {
  text: string;
  isUser: boolean;
  timestamp: Date;
};

// Website knowledge base - extracted content from pages
const knowledgeBase = {
  services: [
    "Local Moving Services in Ohio",
    "Long-Distance Moving across state lines",
    "Office & Commercial Relocation",
    "Furniture Assembly & Disassembly",
    "Packing & Unpacking Services",
    "Loading & Unloading",
    "Storage Solutions (climate-controlled)",
    "Special Item Handling (pianos, antiques, artwork)"
  ],
  pricing: [
    "Local Moves: Starting at $90/hour for a 2-person crew",
    "Long-Distance Moves: Custom quotes based on distance and volume",
    "Packing Services: Starting at $40/hour",
    "Storage: Starting at $95/month for standard unit",
    "Special Items: Additional fees vary by item",
    "Discount: New customers get 10% OFF when booking within the limited-time offer"
  ],
  faqs: [
    "How far in advance should I book? We recommend 2-4 weeks, but can accommodate last-minute moves when possible.",
    "Is my deposit refundable? Yes, with 72-hour notice of cancellation.",
    "Do you provide packing materials? Yes, we offer boxes, tape, bubble wrap, and other supplies.",
    "Are you insured? Yes, we are fully licensed and insured for your protection.",
    "Do you move pianos? Yes, we have specialized equipment and training for piano moving.",
    "What areas do you service? We primarily serve Westerville and the greater Ohio area, with long-distance options available."
  ],
  company: [
    "Founded in 2015 in Westerville, Ohio",
    "Fully licensed and insured moving company",
    "Over 500 satisfied customers with 5-star ratings",
    "Professionally trained moving crews",
    "Locally owned and operated"
  ]
};

const initialBotMessages = [
  "Hi there! I'm the Oasis Moving Assistant. How can I help you today?",
  "As a new customer, you qualify for 10% OFF if you book within 1 hour. Want me to help you get started?"
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const { isPromotionActive, timeRemaining, discountPercentage } = usePromotion();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat with bot introduction
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        text: initialBotMessages[0],
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
      
      // Add promotion message after a delay
      if (isPromotionActive) {
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              text: initialBotMessages[1],
              isUser: false,
              timestamp: new Date()
            }
          ]);
        }, 2000);
      }
    }
  }, [isPromotionActive]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  // Enhanced response generation using the knowledge base
  const generateResponse = (userQuery: string): string => {
    const lowercaseQuery = userQuery.toLowerCase();
    
    // Service-related queries
    if (lowercaseQuery.includes('service') || 
        lowercaseQuery.includes('offer') || 
        lowercaseQuery.includes('what do you do') ||
        lowercaseQuery.includes('moving service')) {
      return `We offer the following services at Oasis Moving & Storage:\n\n• ${knowledgeBase.services.join('\n• ')}\n\nWould you like more information about a specific service?`;
    }
    
    // Pricing-related queries
    if (lowercaseQuery.includes('price') || 
        lowercaseQuery.includes('cost') || 
        lowercaseQuery.includes('how much') || 
        lowercaseQuery.includes('rate') ||
        lowercaseQuery.includes('fee')) {
      return `Here's our pricing information:\n\n• ${knowledgeBase.pricing.join('\n• ')}\n\nFor a personalized quote, I can help you book a consultation or get started with our online quote form.`;
    }
    
    // Discount or promotion queries
    if (lowercaseQuery.includes('discount') || 
        lowercaseQuery.includes('promo') || 
        lowercaseQuery.includes('offer') || 
        lowercaseQuery.includes('coupon') ||
        lowercaseQuery.includes('off') ||
        lowercaseQuery.includes('save')) {
      if (isPromotionActive) {
        return `Yes! We're currently offering a ${discountPercentage}% discount for new customers who book within the next hour. You have ${Math.floor(timeRemaining / 60)} minutes and ${timeRemaining % 60} seconds remaining to claim this offer. Would you like to book now to secure this discount?`;
      } else {
        return "We occasionally run special promotions. While we don't have an active discount at the moment, I'd be happy to help you get a personalized quote for your move.";
      }
    }
    
    // Booking-related queries
    if (lowercaseQuery.includes('book') || 
        lowercaseQuery.includes('schedule') || 
        lowercaseQuery.includes('reservation') || 
        lowercaseQuery.includes('appointment')) {
      return "You can book your move online through our simple form. We'll need details about your current and new locations, preferred moving date, and the size of your move. Would you like me to guide you through the booking process?";
    }
    
    // FAQ queries
    if (lowercaseQuery.includes('question') || 
        lowercaseQuery.includes('faq') || 
        lowercaseQuery.includes('ask') || 
        lowercaseQuery.includes('how do')) {
      return `Here are some frequently asked questions:\n\n• ${knowledgeBase.faqs.join('\n• ')}\n\nDo you have a specific question I can answer?`;
    }
    
    // Company info queries
    if (lowercaseQuery.includes('company') || 
        lowercaseQuery.includes('about') || 
        lowercaseQuery.includes('who are you') || 
        lowercaseQuery.includes('business')) {
      return `About Oasis Moving & Storage:\n\n• ${knowledgeBase.company.join('\n• ')}\n\nWe pride ourselves on providing exceptional service with attention to detail.`;
    }
    
    // Storage-specific queries
    if (lowercaseQuery.includes('storage') || 
        lowercaseQuery.includes('store') || 
        lowercaseQuery.includes('keep')) {
      return "We offer secure, climate-controlled storage solutions for both short and long-term needs. Our storage facilities are monitored 24/7 and start at $95/month for a standard unit. Would you like more information about our storage services?";
    }
    
    // Location/area queries
    if (lowercaseQuery.includes('where') || 
        lowercaseQuery.includes('location') || 
        lowercaseQuery.includes('area') ||
        lowercaseQuery.includes('serve')) {
      return "We're based in Westerville, Ohio and primarily serve the greater Ohio area. We also offer long-distance moving services across state lines. Is there a specific location you're moving to or from?";
    }
    
    // Packing queries
    if (lowercaseQuery.includes('pack') || 
        lowercaseQuery.includes('box') || 
        lowercaseQuery.includes('material')) {
      return "We offer comprehensive packing and unpacking services, starting at $40/hour. Our professional packers are trained to handle items with care, using quality materials. We can also provide packing supplies if you prefer to pack yourself. Would you like to add packing services to your move?";
    }
    
    // Greeting responses
    if (lowercaseQuery.includes('hello') || 
        lowercaseQuery.includes('hi') || 
        lowercaseQuery.includes('hey') ||
        lowercaseQuery.includes('greetings')) {
      return "Hello! I'm the Oasis Moving Assistant. How can I help with your moving needs today?";
    }
    
    // Thank you responses
    if (lowercaseQuery.includes('thank') || 
        lowercaseQuery.includes('thanks') || 
        lowercaseQuery.includes('appreciate')) {
      return "You're welcome! I'm happy to help. Is there anything else you'd like to know about our moving services?";
    }
    
    // Default response for other queries
    return "I'd be happy to help with that. For more detailed information about our moving services, pricing, or to get a personalized quote, would you like me to connect you with our booking form?";
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setHasInteracted(true);
    
    // Generate response based on knowledge base
    setTimeout(() => {
      const botResponse = generateResponse(input);
      
      const botMessage: Message = {
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget Toggle Button */}
      <Button
        onClick={toggleWidget}
        className={`rounded-full h-14 w-14 shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'} transition-all duration-300`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>
      
      {/* Chat Panel */}
      <div
        className={`absolute bottom-16 right-0 w-80 sm:w-96 bg-card rounded-lg shadow-xl border border-border overflow-hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        {/* Chat Header */}
        <div className="bg-primary p-3 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <h3 className="font-semibold">Moving Assistant</h3>
            </div>
            {isPromotionActive && (
              <div className="bg-yellow-400 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                <span>{discountPercentage}% OFF</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3" id="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-primary/10 text-foreground ml-auto'
                  : 'bg-muted text-foreground mr-auto'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
        </div>
        
        {/* Promotion Timer (if active) */}
        {isPromotionActive && (
          <div className="bg-yellow-50 border-t border-yellow-100 p-2 text-center">
            <div className="text-xs font-medium text-yellow-800 flex items-center justify-center gap-1">
              <span>Limited time offer:</span>
              <CountdownTimer timeRemaining={timeRemaining} compact={true} className="text-red-500" />
              <span>remaining</span>
            </div>
          </div>
        )}
        
        {/* Chat Input */}
        <div className="p-3 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm border border-input rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <Button 
              size="icon" 
              onClick={handleSendMessage}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {hasInteracted && (
            <div className="mt-3">
              <Link to="/contact">
                <Button
                  variant="secondary"
                  className="w-full text-sm bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  Book Now {isPromotionActive && `& Save ${discountPercentage}%`}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
