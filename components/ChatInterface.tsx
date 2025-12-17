import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Volume2, Mic } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini, generateSpeech } from '../services/geminiService';

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Sawubona! I'm Moya. How can I help you with your SASSA grant today? You can ask about payment dates, status checks, or application issues.",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null); // ID of message currently playing
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue;
    setInputValue('');
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      // Format history for Gemini
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(history, userText);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = async (messageId: string, text: string) => {
    if (isPlaying) {
      // If something is playing, stop it (conceptually, though simple impl just blocks new plays)
      // Real implementation would need a reference to the source to stop it.
      return; 
    }

    setIsPlaying(messageId);

    try {
      const audioBuffer = await generateSpeech(text);
      if (audioBuffer) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        const ctx = audioContextRef.current;
        const decodedBuffer = await ctx.decodeAudioData(audioBuffer);
        const source = ctx.createBufferSource();
        source.buffer = decodedBuffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(null);
        source.start(0);
      } else {
        setIsPlaying(null);
      }
    } catch (e) {
      console.error(e);
      setIsPlaying(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-sm z-10">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="bg-white text-green-600 rounded-full w-8 h-8 flex items-center justify-center font-black text-sm">M</span>
          Moya Sassa AI
        </h1>
        <p className="text-green-100 text-sm">Always online, always helpful.</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-green-600 text-white rounded-tr-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
              <div className={`flex items-center gap-2 mt-2 text-xs ${msg.role === 'user' ? 'text-green-200' : 'text-gray-400'}`}>
                <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {msg.role === 'model' && (
                  <button 
                    onClick={() => handlePlayAudio(msg.id, msg.text)}
                    disabled={isPlaying !== null}
                    className={`ml-auto p-1 rounded-full hover:bg-gray-100 transition-colors ${isPlaying === msg.id ? 'text-green-600 animate-pulse' : ''}`}
                  >
                    <Volume2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100">
              <Loader2 className="animate-spin text-green-600" size={20} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2 items-end">
          <div className="relative flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your grant..."
              className="w-full bg-gray-100 border-0 rounded-2xl px-4 py-3 pr-10 focus:ring-2 focus:ring-green-500 focus:bg-white transition-all resize-none min-h-[50px] max-h-[120px]"
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className={`p-3 rounded-full flex-shrink-0 transition-colors ${
              inputValue.trim() && !isLoading
                ? 'bg-green-600 text-white shadow-md hover:bg-green-700'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};