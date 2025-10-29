import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send } from 'lucide-react';

const ChatDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: "I'm a demo AI assistant. This is a mock response to show the chat interface design.",
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f0f10] text-gray-100">
      {/* Messages Area */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-6 py-8">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[60vh]">
              <div className="text-center space-y-3">
                <h2 className="text-3xl font-light text-gray-300">How can I help you today?</h2>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <div className={`flex gap-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold">AI</span>
                    </div>
                  )}
                  <div className={`max-w-2xl ${message.sender === 'user' ? 'text-right' : ''}`}>
                    <div
                      className={`inline-block px-5 py-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-[#2a2a2e] text-gray-100'
                          : 'bg-transparent text-gray-200'
                      }`}
                    >
                      <div className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.text}</div>
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs font-semibold">U</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-gray-800/50 p-6 bg-[#0f0f10]">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3 bg-[#1a1a1e] border border-gray-800 rounded-3xl px-4 py-2 focus-within:border-gray-700 transition-all duration-200 shadow-lg">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              placeholder="Message..."
              className="flex-1 bg-transparent border-none text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] py-3"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              disabled={!inputValue.trim()}
              className="bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed rounded-full h-9 w-9 transition-all duration-200 mb-1"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;