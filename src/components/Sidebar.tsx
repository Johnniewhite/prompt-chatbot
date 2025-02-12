import { ChatSession } from '@/types/chat';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSessionSelect: (sessionId: string) => void;
  onNewSession: () => void;
  onDeleteSession: (sessionId: string) => void;
}

export default function Sidebar({
  sessions,
  currentSessionId,
  onSessionSelect,
  onNewSession,
  onDeleteSession,
}: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <button
          onClick={onNewSession}
          className="w-full bg-[#075E54] text-white rounded-lg py-2 px-4 hover:bg-[#054c44] transition-colors"
        >
          New Chat
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`p-3 cursor-pointer hover:bg-gray-100 text-black ${
              currentSessionId === session.id ? 'bg-gray-200' : ''
            }`}
            onClick={() => onSessionSelect(session.id)}
          >
            <div className="flex justify-between items-center">
              <span className="truncate">{session.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSession(session.id);
                }}
                className="text-gray-500 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
            <div className="text-xs text-gray-500">
              {new Date(session.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 