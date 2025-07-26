import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help you with Voitto Concrete Construction. How can I assist you today?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Drainage products
    if (message.includes('drain') || message.includes('culvert') || message.includes('ibd')) {
      return 'We offer comprehensive drainage solutions: I.B.D (KES 600), IBD 9\' (KES 400), IBD 6\' (KES 350), Shallow Drains (KES 450-500), and Culverts from 300mm (KES 1,800) to 900mm (KES 5,500). What size drainage system do you need?';
    }
    
    // Paving products
    if (message.includes('paving') || message.includes('slab') || message.includes('kerb') || message.includes('cabro')) {
      return 'Our paving range includes: Road Kerbs (KES 350), Paving Slabs from 12"x24" (KES 180) to 2"x2" (KES 250), Paving Slabs Cabro (KES 280), and decorative Hexagon pavers (KES 280). What area are you looking to pave?';
    }
    
    // Wall and pillar coping
    if (message.includes('coping') || message.includes('wall') || message.includes('pillar')) {
      return 'We have Wall Coping in 6" (KES 150), 9" (KES 180), and 9"x4" (KES 250) sizes. For pillars: 12"x12" (KES 200), 16"x16" (KES 250), 18"x18" (KES 350), plus decorative Ball Heads (KES 300). What size do you need?';
    }
    
    // Window and ventilation
    if (message.includes('window') || message.includes('louver') || message.includes('ventilation')) {
      return 'Window products available: Window Seals in 6" (KES 250) and 9" (KES 280), Louvers in 6" (KES 130) and 9" (KES 180), plus custom ventilation blocks. Contact us for custom sizing!';
    }
    
    // Balustrades
    if (message.includes('balustrade') || message.includes('railing')) {
      return 'Balustrade options: 1.5 ft (KES 250), 2 ft (KES 300), 2.5 ft (KES 350), and Balustrade Coping (KES 400). Perfect for stairs, balconies, and decorative railings. What height do you need?';
    }
    
    // Garden and fencing
    if (message.includes('flower') || message.includes('pot') || message.includes('garden')) {
      return 'Garden decor available: Rectangular Flower Pots (KES 3,500) and Hexagonal Flower Pots (KES 2,500). Perfect for landscaping and decorative planting!';
    }
    
    if (message.includes('fencing') || message.includes('post')) {
      return 'Fencing posts available: Curved (KES 1,600), Straight (KES 1,500), and Support posts (KES 1,400). Strong concrete posts for boundary fencing. How many meters of fencing?';
    }
    
    // Aggregates and stones
    if (message.includes('sand') || message.includes('ballast') || message.includes('stone') || message.includes('aggregate')) {
      return 'We supply various aggregates: River Sand, Ballast, Chippings, Rock Dust, Foundation Stones (6" & 9"), Yellow Stones, and Darugo Stones. Prices vary by quantity - contact us for current rates and delivery options!';
    }
    
    // Pricing and quotes
    if (message.includes('price') || message.includes('cost') || message.includes('quote')) {
      return 'I can help you get pricing! Many items have fixed prices, while aggregates and bulk materials require quotes based on quantity. What specific products do you need? Add items to cart and order via WhatsApp for detailed pricing.';
    }
    
    // Delivery information
    if (message.includes('deliver') || message.includes('shipping') || message.includes('location')) {
      return 'We deliver throughout Kiambu County and surrounding areas! Delivery costs depend on location and quantity. Same-day delivery available for most items. What\'s your delivery location?';
    }
    
    // 2-storey house specific question
    if (message.includes('2-storey') || message.includes('two storey') || message.includes('multi')) {
      return 'For 2-storey construction, I recommend: Wall Coping 9"x4" for strong wall tops, Pillar Coping 16"x16" or 18"x18" for pillars, quality Foundation Stones 9", and proper drainage with our Culvert systems. What specific elements do you need?';
    }
    
    // Payment methods
    if (message.includes('payment') || message.includes('pay') || message.includes('order')) {
      return 'All orders are placed via WhatsApp for personalized service! Add items to cart, complete your details, and click "Order via WhatsApp" to send your order directly to us at +254 727 530944. We\'ll confirm pricing and arrange payment.';
    }
    
    // Contact information
    if (message.includes('contact') || message.includes('phone') || message.includes('whatsapp') || message.includes('location')) {
      return 'Contact Voitto Company Limited: Phone/WhatsApp: +254 727 530944, Email: info@voittoconcrete.co.ke. Location: Mashambani, Banana, Kiambu. We\'re here to help with all your precast concrete needs!';
    }
    
    // General greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to Voitto Company Limited. I can help you with our precast concrete products including drainage systems, paving materials, wall coping, and more. What can I help you find today?';
    }
    
    if (message.includes('thank')) {
      return 'You\'re welcome! Feel free to ask if you need any more help with your construction project. We\'re here to make your building dreams come true!';
    }
    
    // Default response
    return 'I can help you with: • Drainage & Culverts • Paving Materials • Wall & Pillar Coping • Window & Ventilation products • Balustrades • Garden Decor • Fencing • Aggregates & Stones. What specific products do you need?';
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 h-96 bg-white rounded-lg shadow-2xl transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-blue-900 text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-600 p-2 rounded-full">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold">Voitto Assistant</h3>
              <p className="text-xs text-blue-200">Online now</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-64 overflow-y-auto p-4 space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  message.isBot
                    ? 'bg-slate-100 text-gray-800'
                    : 'bg-orange-600 text-white'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.isBot && (
                    <Bot className="h-4 w-4 mt-0.5 text-orange-600 flex-shrink-0" />
                  )}
                  <p className="leading-relaxed">{message.text}</p>
                  {!message.isBot && (
                    <User className="h-4 w-4 mt-0.5 text-orange-200 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
                <Bot className="h-4 w-4 text-orange-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about products, prices, delivery..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;