'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MessageCircle, X, Send, MinusCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

const faqData: FAQItem[] = [
  {
    question: "What conditions do you treat?",
    answer: "We specialize in back pain, neck pain, joint pain, sciatica, herniated discs, arthritis, sports injuries, and chronic pain conditions. Our non-invasive approach has a 90% success rate.",
    keywords: ["conditions", "treat", "pain", "back", "neck", "joint", "sciatica", "arthritis", "sports", "injury"]
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes! We accept most major insurance providers including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealth, Kaiser, Medicare, and more. We handle all insurance verification and billing.",
    keywords: ["insurance", "accept", "coverage", "cost", "payment", "billing", "medicare", "kaiser"]
  },
  {
    question: "How quickly can I get an appointment?",
    answer: "Most patients can be seen within 24-48 hours. We offer same-day appointments for urgent cases and have 10 convenient locations across San Diego and Orange County.",
    keywords: ["appointment", "schedule", "booking", "availability", "urgent", "same day", "quick"]
  },
  {
    question: "What makes SpineZone different from other clinics?",
    answer: "We use data-driven, spine-specific treatment protocols with a 90% success rate. No referrals required, trusted by 800+ physicians, and we focus on root causes rather than just symptoms.",
    keywords: ["different", "unique", "better", "data-driven", "referrals", "success rate", "physicians"]
  },
  {
    question: "Do I need a referral?",
    answer: "No referral required! You can contact us directly and start treatment immediately. This saves you 2+ weeks compared to traditional referral processes.",
    keywords: ["referral", "doctor", "direct", "access", "immediately", "wait"]
  },
  {
    question: "What are your hours?",
    answer: "Our hours vary by location. Most clinics are open Monday-Friday 7AM-8PM, Saturday 8AM-5PM. Some locations offer Sunday hours. Check our Locations page for specific clinic hours.",
    keywords: ["hours", "open", "schedule", "time", "monday", "friday", "weekend", "sunday"]
  },
  {
    question: "Is treatment painful?",
    answer: "Our non-invasive treatments are designed to reduce pain, not cause it. Most patients experience immediate relief. We use gentle manual therapy, exercise, and holistic approaches.",
    keywords: ["painful", "hurt", "comfortable", "gentle", "relief", "non-invasive"]
  },
  {
    question: "How long does treatment take?",
    answer: "Most patients see significant improvement in 6-8 weeks with our accelerated protocols. This is 50% faster than traditional PT clinics. Treatment length varies based on individual conditions.",
    keywords: ["long", "duration", "weeks", "months", "recovery", "time", "how many sessions"]
  },
  {
    question: "Do you offer online therapy?",
    answer: "Yes! We offer comprehensive online physical therapy programs with virtual sessions, progress tracking, and 24/7 specialist support. Perfect for busy schedules or remote patients.",
    keywords: ["online", "virtual", "telehealth", "remote", "home", "digital"]
  },
  {
    question: "Can you help avoid surgery?",
    answer: "Absolutely! Our non-invasive approach has helped 85% of patients avoid surgery. We focus on natural healing methods that address root causes and restore function without surgical intervention.",
    keywords: ["surgery", "avoid", "non-invasive", "alternative", "natural", "without surgery"]
  },
  {
    question: "What should I bring to my first appointment?",
    answer: "Bring a photo ID, insurance card, list of current medications, and any relevant medical records or imaging. Wear comfortable clothing you can move in.",
    keywords: ["bring", "first appointment", "insurance card", "id", "medications", "records", "wear", "clothing"]
  },
  {
    question: "Do you treat car accident injuries?",
    answer: "Yes, we specialize in auto accident injuries including whiplash, back injuries, and soft tissue trauma. We work directly with insurance companies and legal teams for seamless care.",
    keywords: ["car accident", "auto accident", "whiplash", "vehicle", "crash", "collision", "legal"]
  }
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi! I'm here to help answer your questions about SpineZone. How can I assist you today?",
      isUser: false,
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

  const findBestMatch = useCallback((userInput: string): FAQItem | null => {
    const input = userInput.toLowerCase();
    
    // Handle empty or very short input
    if (input.length < 2) return null;
    
    let bestMatch: FAQItem | null = null;
    let bestScore = 0;

    faqData.forEach(faq => {
      let score = 0;
      faq.keywords.forEach(keyword => {
        if (input.includes(keyword.toLowerCase())) {
          score += 1;
          // Boost score for exact matches
          if (input === keyword.toLowerCase()) {
            score += 2;
          }
        }
      });

      if (score > 0 && score > bestScore) {
        bestMatch = faq;
        bestScore = score;
      }
    });

    return bestMatch;
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find best matching FAQ
    if (inputText.trim().length < 2) {
      setIsTyping(false);
      return;
    }
    
    const matchedFAQ = findBestMatch(inputText);
    
    let botResponse: string;
    if (matchedFAQ) {
      botResponse = matchedFAQ.answer;
    } else {
      botResponse = "I'd be happy to help you with that! For specific questions not covered in our FAQ, please call us at (858) 555-0123 or schedule a free consultation. Our team can provide personalized answers to your healthcare needs.";
    }

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  }, [inputText, findBestMatch]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = useMemo(() => [
    "Do you accept insurance?",
    "What conditions do you treat?",
    "How quickly can I get an appointment?",
    "Do I need a referral?"
  ], []);

  const handleQuickQuestion = useCallback((question: string) => {
    setInputText(question);
    handleSendMessage();
  }, [handleSendMessage]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open chat support"
      >
        <MessageCircle className="w-6 h-6" aria-hidden="true" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border transition-all duration-300 ${
      isMinimized ? 'w-80 h-14' : 'w-80 sm:w-96 h-96 sm:h-[500px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-t-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
            <MessageCircle className="w-4 h-4 text-blue-600" aria-hidden="true" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">SpineZone Support</h4>
            <p className="text-xs text-blue-100">Usually responds instantly</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            <MinusCircle className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-64 sm:h-80">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}