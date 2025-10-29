import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Send, Plus, Menu, X } from 'lucide-react';
import { mockConversations, mockMessages } from '../utils/mockData';

const ChatDashboard = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState(mockConversations[0].id);
  const [messages, setMessages] = useState(mockMessages[mockConversations[0].id] || []);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const handleNewChat = () => {
    const newConv = {
      id: Date.now(),
      title: 'New Conversation',
      lastMessage: 'Start a new conversation',
      timestamp: 'Just now'
    };
    setConversations([newConv, ...conversations]);
    setActiveConversation(newConv.id);
    setMessages([]);
  };

  const handleConversationClick = (convId) => {
    setActiveConversation(convId);
    setMessages(mockMessages[convId] || []);
  };

  return (
    <div className="flex h-screen bg-[#0f0f10] text-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-72' : 'w-0'
        } bg-[#1a1a1e] border-r border-gray-800 transition-all duration-300 ease-in-out overflow-hidden flex flex-col`}
      >
        <div className="p-4 border-b border-gray-800">
          <Button
            onClick={handleNewChat}
            className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border border-gray-600 transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => handleConversationClick(conv.id)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  activeConversation === conv.id
                    ? 'bg-gray-800 border border-gray-700'
                    : 'hover:bg-gray-800/50 border border-transparent'
                }`}
              >
                <div className="font-medium text-sm text-gray-200 truncate">{conv.title}</div>
                <div className="text-xs text-gray-500 mt-1 truncate">{conv.lastMessage}</div>
                <div className="text-xs text-gray-600 mt-1">{conv.timestamp}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-16 border-b border-gray-800 flex items-center px-6 bg-[#1a1a1e]">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="mr-4 hover:bg-gray-800 transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h1 className="text-lg font-semibold text-gray-200">AI Chat Assistant</h1>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="text-6xl mb-4">💬</div>
                  <h2 className="text-2xl font-semibold text-gray-300">Start a conversation</h2>
                  <p className="text-gray-500">Ask me anything to get started</p>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                >
                  <div
                    className={`max-w-2xl rounded-2xl px-6 py-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white border border-gray-600'
                        : 'bg-[#1a1a1e] text-gray-200 border border-gray-800'
                    } shadow-lg`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</div>
                    <div className="text-xs text-gray-500 mt-2">{message.timestamp}</div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-gray-800 p-6 bg-[#1a1a1e]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 bg-[#0f0f10] border border-gray-800 rounded-2xl px-4 py-3 focus-within:border-gray-600 transition-all duration-200">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none text-gray-200 placeholder:text-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!inputValue.trim()}
                className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDashboard;