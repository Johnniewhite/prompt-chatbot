'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BotAvatar from '@/components/BotAvatar';
import { getChatResponse } from '@/services/chatTunnel';
import MarkdownMessage from '@/components/MarkdownMessage';
import { useChatSessions } from '@/hooks/useChatSessions';
import Sidebar from '@/components/Sidebar';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const { sessions, createNewSession, deleteSession, addMessageToSession } = useChatSessions();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = currentSessionId 
    ? sessions.find(s => s.id === currentSessionId)
    : null;

  useEffect(() => {
    if (!currentSessionId && sessions.length > 0) {
      setCurrentSessionId(sessions[0].id);
    }
  }, [sessions, currentSessionId]);

  // Separate effect for creating new session
  useEffect(() => {
    if (sessions.length === 0) {
      const newSession = createNewSession();
      setCurrentSessionId(newSession.id);
    }
  }, [sessions.length, createNewSession]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentSession) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    addMessageToSession(currentSession.id, userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };
      
      addMessageToSession(currentSession.id, assistantMessage);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: error instanceof Error ? error.message : "An error occurred while getting the response.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      addMessageToSession(currentSession.id, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSessionSelect={setCurrentSessionId}
        onNewSession={() => {
          const newSession = createNewSession();
          setCurrentSessionId(newSession.id);
        }}
        onDeleteSession={(sessionId) => {
          deleteSession(sessionId);
          if (currentSessionId === sessionId) {
            setCurrentSessionId(sessions[0]?.id ?? null);
          }
        }}
      />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#075E54] p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-2">
            <BotAvatar />
          </div>
          <div>
            <h1 className="text-white font-semibold">AI Assistant</h1>
            <p className="text-green-100 text-sm">Built with Love by <a href="https://github.com/johnniewhite" className="underline">Inioluwa Adeyinka</a></p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#E5DDD5]">
          <AnimatePresence>
            {currentSession?.messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 text-black ${
                    message.role === 'user'
                      ? 'bg-[#DCF8C6] ml-4'
                      : 'bg-white mr-4'
                  }`}
                >
                  <MarkdownMessage content={message.content} />
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-white rounded-lg p-4">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-.3s]" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-.5s]" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t text-black">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:border-[#075E54]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[#075E54] text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-[#054c44] transition-colors disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
