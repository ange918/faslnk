"use client";

import { useState } from "react";
import { 
  ArrowLeftIcon,
  PhoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  PaperAirplaneIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "Marie Dupont", text: "Bonjour Ange, avez-vous pu avancer sur les mesures ?", time: "10:30", isMe: false },
    { id: 2, sender: "Moi", text: "Oui Marie, tout est prêt. Je vous envoie le récapitulatif dans l'après-midi.", time: "10:32", isMe: true },
    { id: 3, sender: "Marie Dupont", text: "Super ! J'ai hâte de voir les premiers croquis.", time: "10:35", isMe: false },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      sender: "Moi", 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      isMe: true 
    }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Chat Header */}
      <header className="p-4 border-b border-black/5 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden" />
            <div>
              <p className="font-bold text-sm">Marie Dupont</p>
              <p className="text-[10px] text-green-500 font-bold uppercase">En ligne</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-black transition-colors"><PhoneIcon className="w-5 h-5" /></button>
          <button className="p-2 text-gray-400 hover:text-black transition-colors"><VideoCameraIcon className="w-6 h-6" /></button>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((msg) => (
          <div 
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[75%]",
              msg.isMe ? "ml-auto items-end" : "items-start"
            )}
          >
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm leading-relaxed",
              msg.isMe ? "bg-black text-white rounded-tr-none" : "bg-gray-100 rounded-tl-none"
            )}>
              {msg.text}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1 font-medium">{msg.time}</span>
          </div>
        ))}
      </main>

      {/* Input Area */}
      <div className="p-4 border-t border-black/5 bg-white">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrire un message..."
            className="flex-1 bg-gray-100 rounded-2xl px-5 py-3 text-sm outline-none focus:ring-1 focus:ring-gold/30 transition-all"
          />
          <button 
            type="submit"
            className="w-11 h-11 bg-black text-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
          >
            <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
          </button>
        </form>
      </div>
    </div>
  );
}
