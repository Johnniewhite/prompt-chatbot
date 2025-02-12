import { useState, useEffect } from 'react';
import { ChatSession, Message } from '@/types/chat';

const STORAGE_KEY = 'chatSessions';

// Helper function to safely parse dates from JSON
const parseStoredSessions = (data: string): ChatSession[] => {
  try {
    return JSON.parse(data, (key, value) => {
      if (key === 'timestamp' || key === 'createdAt' || key === 'updatedAt') {
        return new Date(value);
      }
      return value;
    });
  } catch (error) {
    console.error('Error parsing stored sessions:', error);
    return [];
  }
};

// Helper function to safely stringify sessions for storage
const stringifySessions = (sessions: ChatSession[]): string => {
  return JSON.stringify(sessions, (key, value) => {
    if (value instanceof Date) {
      return value.toISOString();
    }
    return value;
  });
};

export function useChatSessions() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    // Initialize from localStorage on component mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? parseStoredSessions(stored) : [];
    }
    return [];
  });

  // Save to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, stringifySessions(sessions));
    }
  }, [sessions]);

  const saveSession = (session: ChatSession) => {
    setSessions(prevSessions => {
      const updated = prevSessions.map(s => 
        s.id === session.id ? { ...session, updatedAt: new Date() } : s
      );
      return updated;
    });
  };

  const createNewSession = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      name: `Chat ${sessions.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setSessions(prevSessions => [...prevSessions, newSession]);
    return newSession;
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prevSessions => {
      const updated = prevSessions.filter(s => s.id !== sessionId);
      if (updated.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
      }
      return updated;
    });
  };

  const updateSessionName = (sessionId: string, newName: string) => {
    setSessions(prevSessions => 
      prevSessions.map(s => 
        s.id === sessionId 
          ? { ...s, name: newName, updatedAt: new Date() }
          : s
      )
    );
  };

  const addMessageToSession = (sessionId: string, message: Message) => {
    setSessions(prevSessions => 
      prevSessions.map(s => 
        s.id === sessionId 
          ? {
              ...s,
              messages: [...s.messages, message],
              updatedAt: new Date()
            }
          : s
      )
    );
  };

  return {
    sessions,
    saveSession,
    createNewSession,
    deleteSession,
    updateSessionName,
    addMessageToSession,
  };
} 