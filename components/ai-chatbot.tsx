"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Minimize2, 
  Maximize2, 
  Send, 
  Bot, 
  User,
  Loader2
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your AI packaging assistant. Ask me about how to package different foods for long-lasting preservation!",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fallback responses for common food packaging questions
  const getFallbackResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('rice') || lowerQuestion.includes('dal')) {
      return "For rice and dal, use airtight containers with oxygen absorbers. Store in cool, dry places. Vacuum-sealed bags work best for long-term storage. Shelf life: 1-2 years.";
    }
    
    if (lowerQuestion.includes('vegetable') || lowerQuestion.includes('sabzi')) {
      return "For vegetables, use breathable containers or perforated bags. Blanch before freezing. Store in refrigerator crisper drawers. Use within 3-7 days for best quality.";
    }
    
    if (lowerQuestion.includes('dairy') || lowerQuestion.includes('milk')) {
      return "For dairy products, use airtight containers and store in refrigerator. Freeze milk in ice cube trays. Cheese should be wrapped in wax paper. Consume within expiration dates.";
    }
    
    if (lowerQuestion.includes('bread') || lowerQuestion.includes('roti') || lowerQuestion.includes('chapati')) {
      return "For bread and roti, wrap in clean cloth or paper bags. Store in cool, dry place. Freeze for longer storage. Reheat before serving. Best consumed within 2-3 days.";
    }
    
    return "For optimal food preservation, use appropriate containers, maintain proper temperature, and follow food safety guidelines. Consider vacuum sealing for long-term storage.";
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Use a more reliable approach with proper error handling
      const response = await fetch('/api/gemini', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          apiKey: "AIzaSyCA6Imffx11F_BugnO6tK4JArnr8ZOCrIA"
        }),
      });

      console.log("API Response Status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);
      
      if (data.error) {
        console.error("API Error:", data.error);
        if (data.quotaExceeded) {
          setQuotaExceeded(true);
          throw new Error("API quota exceeded. Please try again later or upgrade your plan.");
        }
        throw new Error(data.error.message || "API error occurred");
      }
      
      const aiResponse = data.response || data.text;
      
      if (!aiResponse) {
        console.error("No response text found in:", data);
        throw new Error("No response generated");
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      
      // Use fallback response
      const fallbackResponse = getFallbackResponse(inputValue);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm having trouble connecting to my AI service, but here's some general advice:\n\n${fallbackResponse}\n\nPlease try again later for more detailed responses.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
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

  const toggleChatbot = () => {
    if (isOpen) {
      setIsMinimized(!isMinimized);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const closeChatbot = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChatbot}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 z-50"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-80 shadow-2xl transition-all duration-300 z-50 ${
      isMinimized ? "h-16" : "h-96"
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Bot className="w-4 h-4 text-primary" />
            AI Packaging Assistant
            {quotaExceeded && (
              <Badge variant="destructive" className="text-xs">
                Quota Exceeded
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-6 w-6 p-0"
            >
              {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeChatbot}
              className="h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0">
          <ScrollArea className="h-64 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      message.isUser 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {message.isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <div className={`rounded-lg px-3 py-2 text-sm ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-muted text-foreground rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={quotaExceeded ? "API quota exceeded - using fallback responses" : "Ask about food packaging..."}
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-muted-foreground">
                Ask about packaging specific foods for preservation
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setInputValue("How to package rice for long storage?");
                  sendMessage();
                }}
                className="text-xs h-6 px-2"
                disabled={isLoading}
              >
                Test
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
