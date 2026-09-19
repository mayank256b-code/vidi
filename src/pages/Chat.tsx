import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Circle } from 'lucide-react';
import { chatThreads } from '../data/mockData';
import type { Message } from '../data/mockData';

export default function Chat() {
  const { t } = useApp();
  const navigate = useNavigate();
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState<Message[]>(
    selectedThread ? chatThreads.find(c => c.id === selectedThread)?.messages || [] : []
  );

  const thread = chatThreads.find(c => c.id === selectedThread);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    const newMsg: Message = {
      id: `m${Date.now()}`,
      senderId: 'student',
      text: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true,
    };
    setMessages(prev => [...prev, newMsg]);
    setMessageInput('');
  };

  if (selectedThread && thread) {
    return (
      <div className="min-h-screen bg-cream flex flex-col pb-24">
        {/* Chat Header */}
        <div className="bg-white px-4 py-3 flex items-center gap-3 shadow-sm sticky top-0 z-30">
          <button onClick={() => setSelectedThread(null)} className="p-1">
            <ArrowLeft className="w-5 h-5 text-text-primary" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson/20 to-nepal-blue/20 flex items-center justify-center">
            <span className="text-sm font-bold text-crimson">{thread.tutorName[0]}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary text-sm">{thread.tutorName}</h3>
            <div className="flex items-center gap-1">
              <Circle className={`w-2 h-2 ${thread.online ? 'text-success fill-success' : 'text-gray-400 fill-gray-400'}`} />
              <span className="text-xs text-text-secondary">
                {thread.online ? t('online') : t('offline')}
              </span>
            </div>
          </div>
          <button className="p-2">
            <i className="fa-solid fa-video text-nepal-blue" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className={`flex ${msg.senderId === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%] px-4 py-2.5 ${
                msg.senderId === 'student' ? 'chat-bubble-sent' : 'chat-bubble-received'
              }`}>
                <p className="text-sm">{msg.text}</p>
                <p className={`text-[10px] mt-1 ${
                  msg.senderId === 'student' ? 'text-white/60' : 'text-text-secondary'
                }`}>
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white px-4 py-3 flex items-center gap-3 border-t border-gray-100">
          <button className="p-2 text-text-secondary">
            <i className="fa-solid fa-paperclip" />
          </button>
          <input
            type="text"
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={t('typeMessage')}
            className="flex-1 py-3 px-4 bg-warm-gray rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-crimson/20"
          />
          <button
            onClick={handleSend}
            disabled={!messageInput.trim()}
            className="w-10 h-10 rounded-full bg-crimson flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm page-header">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-text-primary">{t('messages')}</h1>
          <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center">
            <span className="text-xs font-bold text-crimson">
              {chatThreads.reduce((acc, t) => acc + t.unread, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="px-4 py-3 space-y-2 page-content">
        {chatThreads.map((thread, idx) => (
          <motion.button
            key={thread.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => {
              setSelectedThread(thread.id);
              setMessages(thread.messages);
            }}
            className="w-full card p-4 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-crimson/20 to-nepal-blue/20 flex items-center justify-center">
                <span className="text-lg font-bold text-crimson">{thread.tutorName[0]}</span>
              </div>
              {thread.online && (
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-success border-2 border-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-text-primary text-sm">{thread.tutorName}</h3>
                <span className="text-[10px] text-text-secondary">{thread.lastTimestamp}</span>
              </div>
              <p className="text-xs text-text-secondary truncate mt-0.5">{thread.lastMessage}</p>
            </div>
            {thread.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-crimson flex items-center justify-center">
                <span className="text-[10px] text-white font-bold">{thread.unread}</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
