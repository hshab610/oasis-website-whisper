
import { useState, useEffect } from 'react';
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
  
  const toggleWidget = () => {
    setIsOpen(!isOpen);
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
    
    // Simple response logic
    setTimeout(() => {
      let botResponse = "";
      const lowercaseInput = input.toLowerCase();
      
      if (lowercaseInput.includes('discount') || lowercaseInput.includes('promo') || lowercaseInput.includes('offer') || lowercaseInput.includes('10%')) {
        botResponse = `Yes! We're currently offering a ${discountPercentage}% discount for new customers who book within the next hour. You have ${Math.floor(timeRemaining / 60)} minutes remaining to claim this offer.`;
      } 
      else if (lowercaseInput.includes('price') || lowercaseInput.includes('cost') || lowercaseInput.includes('how much')) {
        botResponse = "Our pricing depends on your specific moving needs. I'd be happy to help you get a personalized quote. Would you like to fill out our quick booking form to get started?";
      }
      else if (lowercaseInput.includes('book') || lowercaseInput.includes('schedule') || lowercaseInput.includes('appointment')) {
        botResponse = "Great! You can book your move by clicking the 'Book Now' button below. Don't forget to take advantage of our limited-time discount!";
      }
      else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi') || lowercaseInput.includes('hey')) {
        botResponse = "Hello! How can I help with your moving needs today?";
      }
      else {
        botResponse = "I'd be happy to help with that. For more detailed information, would you like to book a consultation with our moving experts?";
      }
      
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
              <p className="text-sm">{message.text}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          ))}
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
